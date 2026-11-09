# Configurateur NeonLab : fichiers compilés pour le thème Shopify LumiNéon

Cette branche ne contient que le code compilé du configurateur (pas les sources).
Les fichiers de `neonlab-shopify/` sont copiés dans le dossier `assets/` du thème Shopify
par l'API d'administration (`themeFilesUpsert`, corps de type URL).

- `nl2-index-*.js` : point d'entrée (chargé par la section `neonlab.liquid` du thème)
- `nl2-*.js` : modules chargés à la demande et worker de géométrie
- `nl2-font-*.woff` : polices néon (SIL Open Font License 1.1, voir `nl2-licences.txt`)

Ne pas modifier à la main : chaque nouvelle version remplace l'ensemble des fichiers.
