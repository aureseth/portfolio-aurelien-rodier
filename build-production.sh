#!/bin/bash

echo "🚀 Build de production en cours..."

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Générer le CSS optimisé
echo "🎨 Génération du CSS optimisé..."
npx tailwindcss -i ./css/input.css -o ./css/style.css --minify

# Vérifier que les fichiers essentiels existent
echo "✅ Vérification des fichiers essentiels..."
required_files=(
    "index.html"
    "admin-data.html"
    "css/style.css"
    "css/pdf-template.css"
    "js/main.js"
    "js/pdf-generator.js"
    "js/admin-data.js"
    "data/resume.fr.json"
    "data/resume.en.json"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file manquant"
        exit 1
    fi
done

# Créer un fichier de version
echo "📝 Création du fichier de version..."
echo "Build: $(date '+%Y-%m-%d %H:%M:%S')" > version.txt
echo "Node.js: $(node --version)" >> version.txt
echo "NPM: $(npm --version)" >> version.txt

echo "🎉 Build de production terminé avec succès !"
echo "📁 Le site est prêt pour le déploiement."
echo ""
echo "📋 Fichiers essentiels :"
echo "   - index.html (page principale)"
echo "   - admin-data.html (administration)"
echo "   - css/style.css (styles optimisés)"
echo "   - js/ (scripts JavaScript)"
echo "   - data/ (données JSON)"
echo ""
echo "🌐 Pour déployer :"
echo "   1. Uploadez tous les fichiers sur votre serveur web"
echo "   2. Assurez-vous que le serveur supporte les fichiers statiques"
echo "   3. Configurez HTTPS pour la sécurité"
echo ""
echo "🔗 URLs d'accès :"
echo "   - Site principal : https://votre-domaine.com/"
echo "   - Administration : https://votre-domaine.com/admin-data.html" 