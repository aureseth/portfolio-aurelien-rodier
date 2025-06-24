/**
 * Générateur de PDF pour le CV
 * Utilise html2pdf.js pour créer des PDFs optimisés
 */

/**
 * Récupère les données du CV depuis le fichier JSON approprié
 * @param {string} language - La langue (fr/en)
 * @returns {Promise<Object>} Les données du CV
 */
async function getResumeData(language) {
    console.log(`Chargement des données pour la langue: ${language}`);
    try {
        const response = await fetch(`data/resume.${language}.json`);
        console.log('Réponse fetch:', response.status, response.ok);
        
        if (!response.ok) {
            throw new Error(`Cannot fetch resume data for ${language}: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Données chargées avec succès:', {
            basics: !!data.basics,
            work: !!data.work,
            skills: !!data.skills,
            education: !!data.education,
            languages: !!data.languages
        });
        
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        throw error;
    }
}

class PDFGenerator {
    constructor() {
        this.pdfOptions = {
            margin: [10, 10, 10, 10],
            filename: 'CV_Aurelien_Rodier.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait' 
            }
        };
    }

    /**
     * Génère un PDF à partir des données du CV
     * @param {Object} cvData - Les données du CV
     * @param {string} language - La langue (fr/en)
     */
    async generatePDF(cvData, language = 'fr') {
        try {
            // Créer le contenu HTML pour le PDF
            const pdfContent = this.createPDFContent(cvData, language);
            
            // Créer un élément temporaire pour le PDF
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = pdfContent;
            tempContainer.className = 'cv-pdf-container';
            tempContainer.style.position = 'absolute';
            tempContainer.style.left = '-9999px';
            tempContainer.style.top = '0';
            document.body.appendChild(tempContainer);

            // Attendre que les images soient chargées
            await this.waitForImages(tempContainer);

            // Générer le PDF
            const pdf = await html2pdf()
                .from(tempContainer)
                .set(this.pdfOptions)
                .save();

            // Nettoyer
            document.body.removeChild(tempContainer);

            return pdf;
        } catch (error) {
            console.error('Erreur lors de la génération du PDF:', error);
            throw error;
        }
    }

    /**
     * Crée le contenu HTML pour le PDF
     * @param {Object} cvData - Les données du CV
     * @param {string} language - La langue
     * @returns {string} Le HTML pour le PDF
     */
    createPDFContent(cvData, language) {
        const data = cvData[language] || cvData;
        
        return `
            <div class="cv-pdf-container">
                <!-- En-tête -->
                <div class="cv-pdf-header avoid-page-break">
                    <h1>${data.personal.name}</h1>
                    <p class="title">${data.personal.title}</p>
                    <p class="contact-info">
                        ${data.personal.location} | ${data.personal.email} | ${data.personal.linkedin}
                    </p>
                </div>

                <!-- Profil -->
                <div class="cv-pdf-section avoid-page-break">
                    <h2><i class="fas fa-user"></i> ${language === 'fr' ? 'Profil Professionnel' : 'Professional Profile'}</h2>
                    <p>${data.personal.summary}</p>
                </div>

                <!-- Expériences -->
                <div class="cv-pdf-section avoid-page-break">
                    <h2><i class="fas fa-briefcase"></i> ${language === 'fr' ? 'Expériences Professionnelles' : 'Professional Experience'}</h2>
                    ${this.renderExperiences(data.experiences)}
                </div>

                <!-- Compétences -->
                <div class="cv-pdf-section avoid-page-break">
                    <h2><i class="fas fa-tools"></i> ${language === 'fr' ? 'Compétences' : 'Skills'}</h2>
                    ${this.renderSkills(data.skills)}
                </div>

                <!-- Formation -->
                <div class="cv-pdf-section avoid-page-break">
                    <h2><i class="fas fa-graduation-cap"></i> ${language === 'fr' ? 'Formation & Certifications' : 'Education & Certifications'}</h2>
                    ${this.renderEducation(data.education)}
                </div>

                <!-- Langues -->
                <div class="cv-pdf-section avoid-page-break">
                    <h2><i class="fas fa-language"></i> ${language === 'fr' ? 'Langues' : 'Languages'}</h2>
                    ${this.renderLanguages(data.languages)}
                </div>
            </div>
        `;
    }

    /**
     * Rend les expériences professionnelles
     */
    renderExperiences(experiences) {
        if (!experiences || !Array.isArray(experiences)) return '';
        
        return experiences.map(exp => `
            <div class="cv-pdf-experience">
                <h3>${exp.role}</h3>
                <p class="company">${exp.company}</p>
                <p class="period">${exp.period}</p>
                <ul>
                    ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    /**
     * Rend les compétences
     */
    renderSkills(skills) {
        if (!skills || !Array.isArray(skills)) return '';
        
        // Préparer le contenu des compétences avec placeholder si nécessaire
        let skillsContent = '';
        if (skills.length > 0) {
            skillsContent = `
                <div class="cv-pdf-skills">
                    ${skills.map(skill => `
                        <div class="cv-pdf-skill-item">
                            <span class="cv-pdf-skill-name">${skill.name}</span>
                            <span class="cv-pdf-skill-level">${skill.level}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            skillsContent = `
                <p class="cv-pdf-no-skills">
                    Aucune compétence spécifique trouvée pour ce rôle. 
                    Toutes les compétences générales sont incluses dans le CV standard.
                </p>
            `;
        }
        
        return skillsContent;
    }

    /**
     * Rend la formation
     */
    renderEducation(education) {
        if (!education || !Array.isArray(education)) return '';
        
        return education.map(edu => `
            <div class="cv-pdf-education">
                <h3>${edu.degree}</h3>
                <p class="institution">${edu.institution}</p>
                <p class="year">${edu.year}</p>
            </div>
        `).join('');
    }

    /**
     * Rend les langues
     */
    renderLanguages(languages) {
        if (!languages || !Array.isArray(languages)) return '';
        
        return languages.map(lang => `
            <div class="cv-pdf-education">
                <h3>${lang.language}</h3>
                <p class="institution">${lang.level}</p>
            </div>
        `).join('');
    }

    /**
     * Attend que toutes les images soient chargées
     */
    async waitForImages(container) {
        const images = container.querySelectorAll('img');
        const imagePromises = Array.from(images).map(img => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = resolve;
                    img.onerror = resolve;
                }
            });
        });
        
        await Promise.all(imagePromises);
    }

    /**
     * Met à jour les options du PDF
     */
    updateOptions(newOptions) {
        this.pdfOptions = { ...this.pdfOptions, ...newOptions };
    }

    /**
     * Génère un PDF en chargeant automatiquement les données depuis le fichier JSON
     * @param {string} language - La langue (fr/en)
     * @returns {Promise} Le PDF généré
     */
    async generatePDFFromFile(language = 'fr') {
        try {
            // Charger les données depuis le fichier JSON
            const cvData = await getResumeData(language);
            
            // Générer le PDF avec les données chargées
            return await this.generatePDF(cvData, language);
        } catch (error) {
            console.error('Erreur lors du chargement des données ou de la génération du PDF:', error);
            throw error;
        }
    }
}

// Export pour utilisation globale
window.PDFGenerator = PDFGenerator;
window.getResumeData = getResumeData;

/**
 * Fonction pour filtrer les compétences selon le rôle
 * @param {Array} skills - Liste des compétences
 * @param {string} role - Le rôle cible
 * @returns {Array} Compétences filtrées
 */
function filterSkillsByRole(skills, role) {
    if (!skills || !Array.isArray(skills)) return [];
    
    // Filtrer les compétences pertinentes pour le rôle
    const relevantSkills = skills.filter(skill => 
        skill.relevant_for && skill.relevant_for.includes(role)
    );
    
    // Si aucune compétence spécifique n'est trouvée, retourner toutes les compétences
    if (relevantSkills.length === 0) {
        console.log(`Aucune compétence spécifique trouvée pour le rôle "${role}", utilisation de toutes les compétences`);
        return skills;
    }
    
    console.log(`Compétences filtrées pour ${role}:`, relevantSkills.length);
    return relevantSkills;
}

/**
 * Fonction pour rendre les compétences
 * @param {Array} skills - Liste des compétences
 * @returns {string} HTML des compétences
 */
function renderSkills(skills) {
    if (!skills || !Array.isArray(skills)) return '';
    
    // Préparer le contenu des compétences avec placeholder si nécessaire
    let skillsContent = '';
    if (skills.length > 0) {
        skillsContent = `
            <div class="cv-pdf-skills">
                ${skills.map(skill => `
                    <div class="cv-pdf-skill-item">
                        <span class="cv-pdf-skill-name">${skill.name}</span>
                        <span class="cv-pdf-skill-level">${skill.level}</span>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        skillsContent = `
            <p class="cv-pdf-no-skills">
                Aucune compétence spécifique trouvée pour ce rôle. 
                Toutes les compétences générales sont incluses dans le CV standard.
            </p>
        `;
    }
    
    return skillsContent;
}

/**
 * Fonction pour rendre le template du CV avec les données
 * @param {Object} data - Les données du CV
 * @param {string} role - Le rôle cible pour filtrer les compétences
 */
function renderCvTemplate(data, role) {
    console.log('Rendu du template CV avec les données:', data);
    console.log('Rôle cible:', role);
    
    // Récupérer le conteneur
    const container = document.getElementById('cv-pdf-content');
    if (!container) {
        console.error('Conteneur cv-pdf-content non trouvé');
        return;
    }
    
    // Filtrer les compétences selon le rôle
    const relevantSkills = filterSkillsByRole(data.skills, role);
    
    // Générer le HTML du CV
    const cvHtml = `
        <div class="cv-pdf-container">
            <!-- En-tête du CV -->
            <header class="cv-pdf-header">
                <div class="cv-pdf-profile">
                    ${data.basics.picture ? `<img src="${data.basics.picture}" alt="Photo de profil" class="cv-pdf-photo">` : ''}
                    <div class="cv-pdf-info">
                        <h1 class="cv-pdf-name">${data.basics.name}</h1>
                        <p class="cv-pdf-title">${data.basics.label}</p>
                        <div class="cv-pdf-contact">
                            <span>${data.basics.location.city}, ${data.basics.location.countryCode}</span>
                            <span>${data.basics.email}</span>
                            <span>${data.basics.profiles.find(p => p.network === 'LinkedIn')?.url || ''}</span>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Résumé -->
            <section class="cv-pdf-section">
                <h2 class="cv-pdf-section-title">PROFIL PROFESSIONNEL</h2>
                <p class="cv-pdf-summary">${data.basics.summary}</p>
            </section>

            <!-- Expériences professionnelles -->
            <section class="cv-pdf-section">
                <h2 class="cv-pdf-section-title">EXPÉRIENCES PROFESSIONNELLES</h2>
                ${renderExperiences(data.work)}
            </section>

            <!-- Compétences pertinentes pour le rôle -->
            <section class="cv-pdf-section">
                <h2 class="cv-pdf-section-title">COMPÉTENCES PERTINENTES POUR ${role.toUpperCase()}</h2>
                ${renderSkills(relevantSkills)}
            </section>

            <!-- Formation -->
            <section class="cv-pdf-section">
                <h2 class="cv-pdf-section-title">FORMATION</h2>
                ${renderEducation(data.education)}
            </section>

            <!-- Langues -->
            <section class="cv-pdf-section">
                <h2 class="cv-pdf-section-title">LANGUES</h2>
                ${renderLanguages(data.languages)}
            </section>
        </div>
    `;
    
    // Insérer le HTML dans le conteneur
    container.innerHTML = cvHtml;
    
    console.log('Template CV rendu avec succès');
}

/**
 * Fonction pour rendre les expériences professionnelles
 * @param {Array} experiences - Liste des expériences
 * @returns {string} HTML des expériences
 */
function renderExperiences(experiences) {
    if (!experiences || !Array.isArray(experiences)) return '';
    
    return experiences.map(exp => `
        <div class="cv-pdf-experience">
            <h3>${exp.position}</h3>
            <p class="company">${exp.name}</p>
            <p class="period">${exp.startDate} - ${exp.endDate || 'Présent'}</p>
            <p class="summary">${exp.summary}</p>
            <ul>
                ${exp.highlights ? exp.highlights.map(highlight => 
                    `<li>${highlight}</li>`
                ).join('') : ''}
            </ul>
        </div>
    `).join('');
}

/**
 * Fonction pour rendre la formation
 * @param {Array} education - Liste de la formation
 * @returns {string} HTML de la formation
 */
function renderEducation(education) {
    if (!education || !Array.isArray(education)) return '';
    
    return education.map(edu => `
        <div class="cv-pdf-education">
            <h3>${edu.studyType} ${edu.area}</h3>
            <p class="institution">${edu.institution}</p>
            <p class="year">${edu.startDate} - ${edu.endDate || 'Présent'}</p>
            ${edu.score ? `<p class="score">${edu.score}</p>` : ''}
        </div>
    `).join('');
}

/**
 * Fonction pour rendre les langues
 * @param {Array} languages - Liste des langues
 * @returns {string} HTML des langues
 */
function renderLanguages(languages) {
    if (!languages || !Array.isArray(languages)) return '';
    
    return languages.map(lang => `
        <div class="cv-pdf-language">
            <h3>${lang.language}</h3>
            <p class="level">${lang.fluency}</p>
        </div>
    `).join('');
}

/**
 * Fonction principale pour générer le PDF
 * @param {string} language - La langue (fr/en)
 * @param {string} role - Le rôle cible
 */
async function generatePdf(language, role) {
    try {
        console.log('=== DÉBUT GÉNÉRATION PDF ===');
        console.log(`Paramètres: language=${language}, role=${role}`);
        
        // Récupérer les données du CV
        console.log('1. Chargement des données...');
        const data = await getResumeData(language);
        console.log('✅ Données chargées:', !!data);
        
        // Rendre le template avec les données
        console.log('2. Rendu du template...');
        renderCvTemplate(data, role);
        console.log('✅ Template rendu');

        // Attendre que le DOM soit mis à jour
        console.log('3. Attente du DOM...');
        await new Promise(resolve => setTimeout(resolve, 100));

        // Récupérer l'élément à convertir en PDF
        console.log('4. Récupération du conteneur...');
        const element = document.getElementById('cv-template-container');
        if (!element) {
            throw new Error('Container cv-template-container non trouvé');
        }
        console.log('✅ Conteneur trouvé:', element);

        // Vérifier que le contenu a été généré
        const content = document.getElementById('cv-pdf-content');
        console.log('5. Vérification du contenu...');
        console.log('Contenu généré:', content ? content.innerHTML.length : 0, 'caractères');

        // Options de génération du PDF
        console.log('6. Configuration des options...');
        const options = {
            margin: 10,
            filename: `CV-Aurelien-Rodier-${role.replace(/\s+/g, '-')}-${language.toUpperCase()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2, 
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
                ignoreElements: (element) => {
                    // Ignorer les éléments avec des images undefined
                    return element.tagName === 'IMG' && (!element.src || element.src.includes('undefined'));
                }
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait' 
            }
        };
        console.log('✅ Options configurées');

        // Générer et télécharger le PDF
        console.log('7. Génération du PDF...');
        console.log('html2pdf disponible:', typeof html2pdf === 'function');
        
        await html2pdf().from(element).set(options).save();
        
        console.log('✅ PDF généré avec succès');
        console.log('=== FIN GÉNÉRATION PDF ===');

    } catch (error) {
        console.error('❌ Erreur lors de la génération du PDF:', error);
        console.error('Stack trace:', error.stack);
        throw error;
    }
}

// Exporter les fonctions pour utilisation globale
window.renderCvTemplate = renderCvTemplate;
window.generatePdf = generatePdf;
window.renderSkills = renderSkills;
window.renderExperiences = renderExperiences;
window.renderEducation = renderEducation;
window.renderLanguages = renderLanguages;
window.filterSkillsByRole = filterSkillsByRole;

// Gestion de la modale de personnalisation PDF
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('bouton-telecharger-cv');
    const downloadBtnMobile = document.getElementById('bouton-telecharger-cv-mobile');
    const modal = document.getElementById('pdf-options-modal');
    const form = document.getElementById('pdf-options-form');
    const cancelBtn = document.getElementById('cancel-modal-btn');

    // Fonction pour ouvrir la modale
    function openPdfOptionsModal() {
        if (modal) {
            modal.showModal();
        }
    }

    // Fonction pour fermer la modale
    function closePdfOptionsModal() {
        if (modal) {
            modal.close();
        }
    }

    // Gestionnaire pour le bouton de téléchargement principal
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openPdfOptionsModal();
        });
    }

    // Gestionnaire pour le bouton de téléchargement mobile
    if (downloadBtnMobile) {
        downloadBtnMobile.addEventListener('click', (e) => {
            e.preventDefault();
            openPdfOptionsModal();
        });
    }

    // Gestionnaire pour le bouton Annuler
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            closePdfOptionsModal();
        });
    }

    // Gestionnaire pour la soumission du formulaire
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const language = formData.get('language');
            const role = formData.get('role');
            
            // Récupérer les éléments de statut
            const statusDiv = document.getElementById('pdf-status');
            const statusText = document.getElementById('pdf-status-text');
            const submitBtn = document.getElementById('generate-pdf-btn');

            // Fonction pour afficher le statut
            function showStatus(message, type = 'info') {
                statusDiv.className = `p-3 rounded-lg mb-4 ${type === 'error' ? 'bg-red-100 text-red-700' : type === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`;
                statusText.textContent = message;
                statusDiv.classList.remove('hidden');
            }

            try {
                // Désactiver le bouton et afficher le statut
                submitBtn.disabled = true;
                submitBtn.textContent = 'Génération en cours...';
                showStatus('Génération du PDF en cours...', 'info');
                
                console.log(`Génération du PDF pour ${language}, ${role}...`);
                
                // Générer le PDF avec les nouvelles fonctions
                await generatePdf(language, role);
                
                // Afficher le succès
                showStatus(`PDF généré avec succès: CV-Aurelien-Rodier-${role.replace(/\s+/g, '-')}-${language.toUpperCase()}.pdf`, 'success');
                
                // Réactiver le bouton
                submitBtn.disabled = false;
                submitBtn.textContent = 'Télécharger';
                
                // Fermer la modale après un délai
                setTimeout(() => {
                    closePdfOptionsModal();
                    statusDiv.classList.add('hidden');
                }, 3000);
                
            } catch (error) {
                console.error('Erreur lors de la génération du PDF:', error);
                
                // Afficher l'erreur
                showStatus(`Erreur: ${error.message}`, 'error');
                
                // Réactiver le bouton
                submitBtn.disabled = false;
                submitBtn.textContent = 'Télécharger';
            }
        });
    }

    // Fermer la modale en cliquant à l'extérieur (si supporté par le navigateur)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closePdfOptionsModal();
            }
        });
    }

    // Fermer la modale avec la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.open) {
            closePdfOptionsModal();
        }
    });
}); 