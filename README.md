# Configurateur NeonLab : fichiers compilés pour le thème Shopify LumiNéon

Cette branche ne contient que le code compilé du configurateur (pas les sources).
Les fichiers de `neonlab-shopify/` sont copiés dans le dossier `assets/` du thème Shopify
par l'API d'administration (`themeFilesUpsert`, corps de type URL).

- `nl2-index-*.js` : point d'entrée (chargé par la section `neonlab.liquid` du thème)
- `nl2-*.js` : modules chargés à la demande et worker de géométrie
- `nl2-font-*.woff` : polices néon (SIL Open Font License 1.1, voir `nl2-licences.txt`)

Ne pas modifier à la main : chaque nouvelle version remplace l'ensemble des fichiers.

## Page d'accueil (`accueil/`)

Refonte de l'accueil de la boutique, avec des rendus du configurateur (pas de photos).
Copiée dans le thème par `themeFilesUpsert`, aux mêmes chemins :

- `accueil/snippets/ln-vitrine-home.liquid` : contenu de la page ;
- `accueil/snippets/ln-vitrine-header.liquid`, `ln-vitrine-footer.liquid` : bouton « Créer mon néon » ;
- `accueil/layout/theme.liquid` : l'accueil charge `nlh-home.css` à la place de l'ancienne feuille et de son script ;
- `accueil/assets/` : feuille de style `nlh-home.css` et images `nlh-*.webp`.
