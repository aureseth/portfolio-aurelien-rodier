# Tests automatisés du portfolio

## Structure

- `e2e/` : tests end-to-end (UI, navigation, interactions, export PDF, responsive, accessibilité)
- `unit/` : tests unitaires JS (si besoin)

## Outil recommandé

- **Playwright** (puissant, moderne, facile à intégrer, supporte Chromium/Firefox/Webkit, screenshots, CI/CD)
- Alternatif : Cypress (similaire, très populaire)

## Installation Playwright

```bash
npm install --save-dev playwright
```

## Lancer les tests e2e

```bash
npx playwright test
```

## Philosophie
- Tester les parcours utilisateurs réels (navigation, thème, export, menu mobile)
- Vérifier l'accessibilité et le responsive
- Automatiser la recette pour gagner du temps et fiabiliser les évolutions

## Exemple de test (à venir)
- Navigation entre sections
- Changement de thème
- Export PDF
- Ouverture/fermeture du menu mobile

---

Pour toute nouvelle fonctionnalité, ajouter un test associé dans `e2e/`. 