# 👨‍💻 Portfolio Aurélien Rodier - Product Owner

Portfolio interactif et moderne d'Aurélien Rodier, Product Owner passionné par l'innovation et la transformation numérique.

## ✨ Fonctionnalités

### 🎯 **CV Interactif**
- Design moderne et responsive
- Mode sombre/clair
- Navigation fluide
- Animations et transitions

### 📄 **Génération PDF**
- Export PDF multilingue (FR/EN)
- Rôles personnalisés (Product Owner/Business Analyst)
- Template optimisé et professionnel
- Téléchargement direct

### 🔧 **Interface d'Administration**
- Gestion des compétences
- Gestion des expériences
- Gestion de la formation
- Export des données

### 📱 **Responsive Design**
- Optimisé pour mobile, tablette et desktop
- Interface adaptative
- Performance optimisée

## 🚀 Déploiement Rapide

### **Option 1 : Déploiement direct**
1. Uploadez tous les fichiers sur votre serveur web
2. Le site est immédiatement fonctionnel

### **Option 2 : Build optimisé**
```bash
# Exécuter le script de build
./build-production.sh

# Ou manuellement
npm install
npx tailwindcss -i ./css/input.css -o ./css/style.css --minify
```

## 📁 Structure du projet

```
portfolio-aurelien-rodier/
├── index.html              # Page principale
├── admin-data.html         # Interface d'administration
├── css/
│   ├── style.css          # Styles optimisés (généré)
│   ├── input.css          # Source Tailwind CSS
│   └── pdf-template.css   # Styles pour PDF
├── js/
│   ├── main.js            # Script principal
│   ├── pdf-generator.js   # Générateur PDF
│   └── admin-data.js      # Administration
├── data/
│   ├── resume.fr.json     # Données CV français
│   └── resume.en.json     # Données CV anglais
└── README.md              # Ce fichier
```

## 🛠️ Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec Tailwind CSS
- **JavaScript ES6+** - Interactivité et génération PDF
- **html2pdf.js** - Génération de PDF côté client
- **Google Fonts** - Typographie optimisée

## 🔒 Sécurité

- **CSP (Content Security Policy)** configurée
- **Attributs autocomplete** sur les formulaires
- **Validation des données** côté client
- **Protection contre les injections**

## 📊 Performance

- **CSS minifié** et optimisé
- **Images optimisées**
- **Chargement différé** des scripts
- **Cache navigateur** configuré

## 🌐 Compatibilité

- **Navigateurs modernes** (Chrome, Firefox, Safari, Edge)
- **Mobile responsive** (iOS, Android)
- **Accessibilité** (WCAG 2.1)

## 📞 Contact

- **Email** : rodier.aurelien@orange.fr
- **LinkedIn** : [linkedin.com/in/rodieraurelien](https://linkedin.com/in/rodieraurelien)
- **Site web** : [aurelien-rodier.fr](https://aurelien-rodier.fr)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Portfolio optimisé et prêt pour la production ! 🚀**

## Présentation
Portfolio interactif de Product Owner (Agilité, IA, Transformation Numérique).

## Structure du projet
- `index.html` : page principale du portfolio
- `css/style.css` : design system centralisé (variables CSS, dark mode, responsive)
- `js/main.js` : logique dynamique du site
- `admin-data.html` : dashboard d'administration, tests & diagnostics, checklist de recette manuelle, aperçu live du site
- `debug-test.html` : tests techniques automatisés (serveur, CSS, JS, données)
- `data/` : données JSON (CV FR/EN)
- `portfolio-gemini.html` : version alternative ou inspiration

## Tests & Diagnostics
- **Tests techniques** : via `debug-test.html` ou la section dédiée dans `admin-data.html`
- **Checklist manuelle** : dans `admin-data.html` (points à vérifier visuellement)
- **Aperçu live** : iframe dans `admin-data.html`
- **test-site.html** : supprimé (doublon, fonctionnalités intégrées ailleurs)

## Design System
- Toutes les couleurs, fonds, bordures, accents, transitions sont gérés par variables CSS dans `style.css`
- Mode sombre/clair natif, responsive, accessibilité renforcée

## Déploiement
- Pousser sur GitHub déclenche la mise à jour automatique du site
- Pour tester localement : `python3 -m http.server` puis ouvrir `http://localhost:8000/`

## Contribution
- Fork, branche dédiée, PR bienvenue
- Pour ajouter des tests, suivre la structure de `admin-data.html` ou `debug-test.html`

## Historique
- 2024 : refonte UI/UX, centralisation des tests, suppression de test-site.html 