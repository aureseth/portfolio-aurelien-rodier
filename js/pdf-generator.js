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
    const response = await fetch(`data/resume.${language}.json`);
    if (!response.ok) throw new Error(`Cannot fetch resume data for ${language}`);
    return await response.json();
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
                <div class="cv-pdf-header">
                    <h1>${data.personal.name}</h1>
                    <p class="title">${data.personal.title}</p>
                    <p class="contact-info">
                        ${data.personal.location} | ${data.personal.email} | ${data.personal.linkedin}
                    </p>
                </div>

                <!-- Profil -->
                <div class="cv-pdf-section">
                    <h2><i class="fas fa-user"></i> ${language === 'fr' ? 'Profil Professionnel' : 'Professional Profile'}</h2>
                    <p>${data.personal.summary}</p>
                </div>

                <!-- Expériences -->
                <div class="cv-pdf-section">
                    <h2><i class="fas fa-briefcase"></i> ${language === 'fr' ? 'Expériences Professionnelles' : 'Professional Experience'}</h2>
                    ${this.renderExperiences(data.experiences)}
                </div>

                <!-- Compétences -->
                <div class="cv-pdf-section">
                    <h2><i class="fas fa-tools"></i> ${language === 'fr' ? 'Compétences' : 'Skills'}</h2>
                    ${this.renderSkills(data.skills)}
                </div>

                <!-- Formation -->
                <div class="cv-pdf-section">
                    <h2><i class="fas fa-graduation-cap"></i> ${language === 'fr' ? 'Formation & Certifications' : 'Education & Certifications'}</h2>
                    ${this.renderEducation(data.education)}
                </div>

                <!-- Langues -->
                <div class="cv-pdf-section">
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
        
        return `
            <div class="cv-pdf-skills">
                ${skills.map(category => `
                    <div class="cv-pdf-skill-category">
                        <h3>${category.name}</h3>
                        <div class="cv-pdf-skill-tags">
                            ${category.skills.map(skill => `
                                <span class="cv-pdf-skill-tag">${skill}</span>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
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