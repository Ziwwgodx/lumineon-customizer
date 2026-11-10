/* Progressive enhancement only. Native Shopify contact handles the submission.
   Fichier joint (10/11/2026) : le formulaire de contact Shopify ne transmet pas de fichier.
   Le fichier est donc envoyé au panier avec le produit technique caché « piece-jointe-devis-logo » (0 €),
   Shopify le stocke et renvoie son lien, la ligne est retirée du panier aussitôt,
   et le lien part avec la demande (champs « Fichier logo » et « Nom du fichier »). */
// Retire du panier toutes les lignes du produit technique (une seconde tentative si besoin).
async function cleanLogoCart(variant, attempt) {
  const base = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
  try {
    const cart = await (await fetch(base + 'cart.js', {cache: 'no-store', headers: {Accept: 'application/json'}})).json();
    const lines = (cart.items || []).filter(item => String(item.variant_id) === String(variant));
    for (const line of lines) {
      const res = await fetch(base + 'cart/change.js', {method: 'POST', headers: {'Content-Type': 'application/json', Accept: 'application/json'}, body: JSON.stringify({id: line.key, quantity: 0})});
      if (!res.ok) throw new Error('change');
    }
  } catch (error) {
    if (!attempt) { await new Promise(resolve => setTimeout(resolve, 1200)); return cleanLogoCart(variant, 1); }
  }
}

function setupLogoUpload(root, form, link) {
  const variant = root.dataset.uploadVariant;
  const box = root.querySelector('[data-logo-file]');
  if (!variant || !box || !form || !link || !window.FormData || !window.XMLHttpRequest || !window.fetch) return null;
  const input = box.querySelector('[data-logo-file-input]');
  const status = box.querySelector('[data-logo-file-status]');
  const urlField = box.querySelector('[data-logo-file-url]');
  const nameField = box.querySelector('[data-logo-file-name]');
  if (!input || !status || !urlField || !nameField) return null;
  const MAX = 20 * 1024 * 1024;
  const ALLOWED = /\.(svg|ai|eps|pdf|png|jpe?g|webp)$/i;
  const base = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
  const listeners = [];
  let request = null;
  let pendingSubmit = false;

  // Mode fichier : le lien devient une alternative.
  box.hidden = false;
  link.required = false;
  const linkLabel = root.querySelector('label[for="LogoQuote-link"]');
  if (linkLabel) linkLabel.textContent = 'Ou un lien vers votre fichier';
  const linkHelp = root.querySelector('#LogoQuote-link-help');
  if (linkHelp) linkHelp.textContent = 'Lien de partage accessible sans connexion (Google Drive, Dropbox, WeTransfer…).';
  const heading = root.querySelector('[data-logo-heading]');
  if (heading) heading.textContent = 'Envoyez votre logo';
  const intro = root.querySelector('[data-logo-intro]');
  if (intro) intro.innerHTML = 'Joignez votre fichier ou collez un lien, avec les détails de votre projet.<br>Seuls le fichier (ou le lien) et l’email sont obligatoires.';

  const say = (text, state) => { status.textContent = text; status.dataset.state = state || ''; };
  const weight = bytes => bytes < 1048576 ? Math.max(1, Math.round(bytes / 1024)) + ' Ko' : (bytes / 1048576).toFixed(1).replace('.', ',') + ' Mo';
  const notify = () => listeners.forEach(fn => fn());
  function setFile(url, label) {
    urlField.value = url;
    nameField.value = label;
    urlField.disabled = !url;
    nameField.disabled = !url;
    notify();
  }

  function fail() {
    request = null;
    pendingSubmit = false;
    input.value = '';
    say('L’envoi du fichier n’a pas abouti. Réessayez, collez un lien, ou envoyez-le par email.', 'error');
    notify();
    cleanLogoCart(variant);
  }

  if (urlField.value) {
    urlField.disabled = false;
    nameField.disabled = false;
    say('Fichier joint : ' + (nameField.value || 'votre fichier') + '.', 'ok');
  }

  input.addEventListener('change', () => {
    if (request) { request.abort(); request = null; }
    setFile('', '');
    const file = input.files && input.files[0];
    if (!file) { say(''); return; }
    if (!ALLOWED.test(file.name)) { input.value = ''; say('Format non accepté. Choisissez un fichier SVG, AI, EPS, PDF, PNG ou JPG.', 'error'); return; }
    if (file.size > MAX) { input.value = ''; say('Ce fichier dépasse 20 Mo. Envoyez-le par email ou collez un lien.', 'error'); return; }
    const label = file.name + ' (' + weight(file.size) + ')';
    const data = new FormData();
    data.append('id', variant);
    data.append('quantity', '1');
    data.append('properties[_Fichier]', file, file.name);
    const xhr = new XMLHttpRequest();
    request = xhr;
    xhr.open('POST', base + 'cart/add.js');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.upload.onprogress = event => {
      if (xhr === request && event.lengthComputable) say('Envoi du fichier… ' + Math.round(event.loaded / event.total * 100) + ' %', 'busy');
    };
    xhr.onload = () => {
      if (xhr !== request) return;
      let res = null;
      try { res = JSON.parse(xhr.responseText); } catch (error) { res = null; }
      const url = res && res.properties && res.properties._Fichier;
      if (xhr.status >= 200 && xhr.status < 300 && typeof url === 'string' && /^https:\/\//.test(url)) {
        request = null;
        const cleaning = cleanLogoCart(variant);
        setFile(url, label);
        say('Fichier joint : ' + label + '.', 'ok');
        if (pendingSubmit) {
          pendingSubmit = false;
          cleaning.finally(() => { if (form.requestSubmit) form.requestSubmit(); else form.submit(); });
        }
      } else {
        fail();
      }
    };
    xhr.onerror = () => { if (xhr === request) fail(); };
    say('Envoi du fichier… 0 %', 'busy');
    notify();
    xhr.send(data);
  });

  return {
    hasFile: () => Boolean(urlField.value),
    busy: () => Boolean(request),
    onChange: fn => listeners.push(fn),
    submitWhenDone: () => { pendingSubmit = true; say('Envoi du fichier en cours… Votre demande partira juste après.', 'busy'); }
  };
}

function initLogoPage(root) {
  if (!root || root.dataset.enhanced) return;
  root.dataset.enhanced = 'true';
  const form = root.querySelector('#LogoQuoteForm');
  const link = root.querySelector('#LogoQuote-link');
  const email = root.dataset.contactEmail;
  if (!email || /[\r\n?&#]/.test(email)) return;
  if (root.dataset.uploadVariant) cleanLogoCart(root.dataset.uploadVariant);
  const upload = setupLogoUpload(root, form, link);
  function validateLink() {
    if (!link) return;
    link.setCustomValidity('');
    if (!link.value.trim()) {
      if (upload && !upload.hasFile() && !upload.busy()) link.setCustomValidity('Joignez votre fichier ou collez un lien vers celui-ci.');
      return;
    }
    try {
      const url = new URL(link.value.trim());
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw Error();
    } catch { link.setCustomValidity('Ajoutez un lien complet commençant par https://, sans identifiants de connexion.'); }
  }
  link?.addEventListener('input', validateLink);
  upload?.onChange(validateLink);
  form?.addEventListener('submit', event => {
    if (upload && upload.busy()) { event.preventDefault(); upload.submitWhenDone(); return; }
    validateLink();
    if (!form.checkValidity()) { event.preventDefault(); form.reportValidity(); }
    // A submitted form is not proof of email delivery. No synthetic success or purchase event.
  });
  function updateEmail() {
    const width = root.querySelector('#LogoQuote-width')?.value.trim();
    const usage = root.querySelector('#LogoQuote-use')?.value;
    const budget = root.querySelector('#LogoQuote-budget')?.value;
    const source = root.querySelector('#LogoQuote-source')?.value;
    const date = root.querySelector('#LogoQuote-date')?.value;
    const detail = root.querySelector('#LogoQuote-details')?.value.trim();
    const body = ['Bonjour,', '', 'Je souhaite un devis pour mon logo en néon LED.', 'Entreprise :', 'Largeur souhaitée : ' + (width || 'à définir'), budget ? 'Budget annoncé : ' + budget : '', source ? 'Source : ' + source : '', 'Emplacement : ' + (usage || 'à définir'), 'Date souhaitée : ' + (date || 'à définir'), detail ? 'Précisions : ' + detail : '', '', 'Je joins mon fichier de logo à cet email.'].filter((v,i,a)=>v||a[i-1]).join('\n');
    root.querySelector('[data-logo-email]')?.setAttribute('href', 'mailto:' + email + '?subject=' + encodeURIComponent('Devis logo néon') + '&body=' + encodeURIComponent(body));
  }
  form?.addEventListener('input', updateEmail);
  form?.addEventListener('change', updateEmail);
  const copy = root.querySelector('[data-copy-email]');
  const status = root.querySelector('[data-copy-status]');
  if (copy && navigator.clipboard?.writeText) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(email); status.textContent = 'Adresse copiée.'; }
      catch { status.textContent = 'Vous pouvez sélectionner et copier l’adresse affichée.'; }
    });
  }
  const result = root.querySelector('[data-logo-success] h3, [data-logo-error]');
  if (result) { result.setAttribute('tabindex','-1'); result.focus({preventScroll:true}); result.scrollIntoView({block:'center',behavior:'instant'}); }
}
initLogoPage(document.querySelector('[data-logo-page]'));
document.addEventListener('shopify:section:load', event => initLogoPage(event.target.querySelector('[data-logo-page]')));
