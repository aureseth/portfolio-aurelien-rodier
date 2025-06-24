// Script d'administration des données CV
// Gestion des compétences, expériences, formation, langues et centres d'intérêt

class AdminDataManager {
    constructor() {
        this.currentData = null;
        this.currentLanguage = 'fr';
        this.availableRoles = [
            'Product Owner', 'Business Analyst', 'Project Manager', 'Scrum Master',
            'Développeur Full Stack', 'Frontend Developer', 'Backend Developer',
            'DevOps Engineer', 'Data Analyst', 'Data Scientist', 'Product Manager',
            'Program Manager', 'Team Lead', 'UX Designer', 'UI Designer',
            'Technical Writer', 'API Developer', 'Cloud Engineer', 'JavaScript Developer',
            'Marketing Manager', 'Release Train Engineer'
        ];
        
        this.init();
    }

    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.renderCurrentTab();
    }

    async loadData() {
        try {
            this.currentData = await getResumeData(this.currentLanguage);
            console.log('✅ Données chargées:', this.currentData);
        } catch (error) {
            console.error('❌ Erreur lors du chargement des données:', error);
            this.showMessage('Erreur lors du chargement des données', 'error');
        }
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Add buttons
        document.getElementById('add-skill-btn').addEventListener('click', () => this.showSkillModal());
        document.getElementById('add-experience-btn').addEventListener('click', () => this.showExperienceModal());
        document.getElementById('add-education-btn').addEventListener('click', () => this.showEducationModal());
        document.getElementById('add-language-btn').addEventListener('click', () => this.showLanguageModal());
        document.getElementById('add-interest-btn').addEventListener('click', () => this.showInterestModal());

        // Modal
        document.getElementById('close-modal').addEventListener('click', () => this.closeModal());
        document.getElementById('modal').addEventListener('click', (e) => {
            if (e.target.id === 'modal') this.closeModal();
        });

        // Export
        document.getElementById('export-data').addEventListener('click', () => this.exportData());
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active', 'text-blue-600', 'border-blue-600');
            btn.classList.add('text-gray-500');
        });
        
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        activeButton.classList.add('active', 'text-blue-600', 'border-blue-600');
        activeButton.classList.remove('text-gray-500');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
            content.classList.remove('active');
        });
        
        const activeContent = document.getElementById(`${tabName}-tab`);
        activeContent.classList.remove('hidden');
        activeContent.classList.add('active');

        this.renderCurrentTab();
    }

    renderCurrentTab() {
        const activeTab = document.querySelector('.tab-button.active').dataset.tab;
        
        switch (activeTab) {
            case 'skills':
                this.renderSkills();
                break;
            case 'experiences':
                this.renderExperiences();
                break;
            case 'education':
                this.renderEducation();
                break;
            case 'languages':
                this.renderLanguages();
                break;
            case 'interests':
                this.renderInterests();
                break;
        }
    }

    // Skills Management
    renderSkills() {
        const container = document.getElementById('skills-list');
        if (!this.currentData?.skills) return;

        container.innerHTML = this.currentData.skills.map((skill, index) => `
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200 fade-in">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h3 class="font-semibold text-gray-900">${skill.name}</h3>
                        <p class="text-sm text-gray-600">Niveau: ${skill.level}</p>
                        <div class="mt-2">
                            <span class="text-xs text-gray-500">Métiers associés:</span>
                            <div class="flex flex-wrap gap-1 mt-1">
                                ${skill.relevant_for.map(role => 
                                    `<span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">${role}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="flex space-x-2 ml-4">
                        <button onclick="adminManager.editSkill(${index})" class="text-blue-600 hover:text-blue-800">
                            ✏️ Modifier
                        </button>
                        <button onclick="adminManager.deleteSkill(${index})" class="text-red-600 hover:text-red-800">
                            🗑️ Supprimer
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showSkillModal(skillIndex = null) {
        const skill = skillIndex !== null ? this.currentData.skills[skillIndex] : null;
        const isEditing = skillIndex !== null;

        document.getElementById('modal-title').textContent = isEditing ? 'Modifier la compétence' : 'Ajouter une compétence';
        
        document.getElementById('modal-content').innerHTML = `
            <form id="skill-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nom de la compétence</label>
                    <input type="text" id="skill-name" value="${skill?.name || ''}" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                    <select id="skill-level" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Débutant" ${skill?.level === 'Débutant' ? 'selected' : ''}>Débutant</option>
                        <option value="Intermédiaire" ${skill?.level === 'Intermédiaire' ? 'selected' : ''}>Intermédiaire</option>
                        <option value="Avancé" ${skill?.level === 'Avancé' ? 'selected' : ''}>Avancé</option>
                        <option value="Expert" ${skill?.level === 'Expert' ? 'selected' : ''}>Expert</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Métiers associés</label>
                    <div class="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                        ${this.availableRoles.map(role => `
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" value="${role}" 
                                       ${skill?.relevant_for?.includes(role) ? 'checked' : ''}
                                       class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                <span class="text-sm">${role}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" onclick="adminManager.closeModal()" 
                            class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                        Annuler
                    </button>
                    <button type="submit" 
                            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        ${isEditing ? 'Modifier' : 'Ajouter'}
                    </button>
                </div>
            </form>
        `;

        // Form submission
        document.getElementById('skill-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSkill(skillIndex);
        });

        this.openModal();
    }

    saveSkill(skillIndex) {
        const name = document.getElementById('skill-name').value.trim();
        const level = document.getElementById('skill-level').value;
        const relevantFor = Array.from(document.querySelectorAll('#skill-form input[type="checkbox"]:checked'))
            .map(cb => cb.value);

        if (!name || relevantFor.length === 0) {
            this.showMessage('Veuillez remplir tous les champs requis', 'error');
            return;
        }

        const skill = { name, level, relevant_for: relevantFor };

        if (skillIndex !== null) {
            this.currentData.skills[skillIndex] = skill;
        } else {
            this.currentData.skills.push(skill);
        }

        this.closeModal();
        this.renderSkills();
        this.showMessage('Compétence sauvegardée avec succès', 'success');
    }

    editSkill(index) {
        this.showSkillModal(index);
    }

    deleteSkill(index) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
            this.currentData.skills.splice(index, 1);
            this.renderSkills();
            this.showMessage('Compétence supprimée', 'success');
        }
    }

    // Experiences Management
    renderExperiences() {
        const container = document.getElementById('experiences-list');
        if (!this.currentData?.work) return;

        container.innerHTML = this.currentData.work.map((exp, index) => `
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200 fade-in">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h3 class="font-semibold text-gray-900">${exp.position}</h3>
                        <p class="text-sm text-gray-600">${exp.name}</p>
                        <p class="text-xs text-gray-500">${exp.startDate} - ${exp.endDate || 'Présent'}</p>
                        <p class="text-sm text-gray-700 mt-2">${exp.summary}</p>
                        <div class="mt-2">
                            <span class="text-xs text-gray-500">Points clés:</span>
                            <ul class="text-sm text-gray-600 mt-1">
                                ${exp.highlights.map(highlight => `<li>• ${highlight}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="flex space-x-2 ml-4">
                        <button onclick="adminManager.editExperience(${index})" class="text-blue-600 hover:text-blue-800">
                            ✏️ Modifier
                        </button>
                        <button onclick="adminManager.deleteExperience(${index})" class="text-red-600 hover:text-red-800">
                            🗑️ Supprimer
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showExperienceModal(expIndex = null) {
        const exp = expIndex !== null ? this.currentData.work[expIndex] : null;
        const isEditing = expIndex !== null;

        document.getElementById('modal-title').textContent = isEditing ? 'Modifier l\'expérience' : 'Ajouter une expérience';
        
        document.getElementById('modal-content').innerHTML = `
            <form id="experience-form" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                        <input type="text" id="exp-company" value="${exp?.name || ''}" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                        <input type="text" id="exp-position" value="${exp?.position || ''}" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                        <input type="date" id="exp-start" value="${exp?.startDate || ''}" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                        <input type="date" id="exp-end" value="${exp?.endDate || ''}" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <label class="flex items-center mt-1">
                            <input type="checkbox" id="exp-current" ${!exp?.endDate ? 'checked' : ''} 
                                   class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                            <span class="text-sm ml-2">Poste actuel</span>
                        </label>
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Résumé</label>
                    <textarea id="exp-summary" rows="3" 
                              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>${exp?.summary || ''}</textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Points clés (un par ligne)</label>
                    <textarea id="exp-highlights" rows="4" 
                              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>${exp?.highlights?.join('\n') || ''}</textarea>
                </div>
                
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" onclick="adminManager.closeModal()" 
                            class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                        Annuler
                    </button>
                    <button type="submit" 
                            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        ${isEditing ? 'Modifier' : 'Ajouter'}
                    </button>
                </div>
            </form>
        `;

        // Handle current job checkbox
        document.getElementById('exp-current').addEventListener('change', (e) => {
            const endDateInput = document.getElementById('exp-end');
            if (e.target.checked) {
                endDateInput.value = '';
                endDateInput.disabled = true;
            } else {
                endDateInput.disabled = false;
            }
        });

        // Form submission
        document.getElementById('experience-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveExperience(expIndex);
        });

        this.openModal();
    }

    saveExperience(expIndex) {
        const company = document.getElementById('exp-company').value.trim();
        const position = document.getElementById('exp-position').value.trim();
        const startDate = document.getElementById('exp-start').value;
        const isCurrent = document.getElementById('exp-current').checked;
        const endDate = isCurrent ? null : document.getElementById('exp-end').value;
        const summary = document.getElementById('exp-summary').value.trim();
        const highlights = document.getElementById('exp-highlights').value.split('\n').filter(h => h.trim());

        if (!company || !position || !startDate || !summary || highlights.length === 0) {
            this.showMessage('Veuillez remplir tous les champs requis', 'error');
            return;
        }

        const experience = {
            name: company,
            position,
            startDate,
            endDate,
            summary,
            highlights
        };

        if (expIndex !== null) {
            this.currentData.work[expIndex] = experience;
        } else {
            this.currentData.work.push(experience);
        }

        this.closeModal();
        this.renderExperiences();
        this.showMessage('Expérience sauvegardée avec succès', 'success');
    }

    editExperience(index) {
        this.showExperienceModal(index);
    }

    deleteExperience(index) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette expérience ?')) {
            this.currentData.work.splice(index, 1);
            this.renderExperiences();
            this.showMessage('Expérience supprimée', 'success');
        }
    }

    // Education Management
    renderEducation() {
        const container = document.getElementById('education-list');
        if (!this.currentData?.education) return;

        container.innerHTML = this.currentData.education.map((edu, index) => `
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200 fade-in">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h3 class="font-semibold text-gray-900">${edu.area}</h3>
                        <p class="text-sm text-gray-600">${edu.institution}</p>
                        <p class="text-xs text-gray-500">${edu.studyType} • ${edu.startDate} - ${edu.endDate || 'Présent'}</p>
                        ${edu.score ? `<p class="text-sm text-gray-700 mt-1">Note: ${edu.score}</p>` : ''}
                    </div>
                    <div class="flex space-x-2 ml-4">
                        <button onclick="adminManager.editEducation(${index})" class="text-blue-600 hover:text-blue-800">
                            ✏️ Modifier
                        </button>
                        <button onclick="adminManager.deleteEducation(${index})" class="text-red-600 hover:text-red-800">
                            🗑️ Supprimer
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showEducationModal(eduIndex = null) {
        const edu = eduIndex !== null ? this.currentData.education[eduIndex] : null;
        const isEditing = eduIndex !== null;

        document.getElementById('modal-title').textContent = isEditing ? 'Modifier la formation' : 'Ajouter une formation';
        
        document.getElementById('modal-content').innerHTML = `
            <form id="education-form" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                        <input type="text" id="edu-institution" value="${edu?.institution || ''}" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Domaine d'étude</label>
                        <input type="text" id="edu-area" value="${edu?.area || ''}" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                </div>
                
                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select id="edu-type" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="Bac" ${edu?.studyType === 'Bac' ? 'selected' : ''}>Bac</option>
                            <option value="Licence" ${edu?.studyType === 'Licence' ? 'selected' : ''}>Licence</option>
                            <option value="Master" ${edu?.studyType === 'Master' ? 'selected' : ''}>Master</option>
                            <option value="Doctorat" ${edu?.studyType === 'Doctorat' ? 'selected' : ''}>Doctorat</option>
                            <option value="Certification" ${edu?.studyType === 'Certification' ? 'selected' : ''}>Certification</option>
                            <option value="Formation" ${edu?.studyType === 'Formation' ? 'selected' : ''}>Formation</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                        <input type="date" id="edu-start" value="${edu?.startDate || ''}" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                        <input type="date" id="edu-end" value="${edu?.endDate || ''}" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Note/Score (optionnel)</label>
                    <input type="text" id="edu-score" value="${edu?.score || ''}" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="Ex: Mention Bien, 18/20, etc.">
                </div>
                
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" onclick="adminManager.closeModal()" 
                            class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                        Annuler
                    </button>
                    <button type="submit" 
                            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        ${isEditing ? 'Modifier' : 'Ajouter'}
                    </button>
                </div>
            </form>
        `;

        // Form submission
        document.getElementById('education-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEducation(eduIndex);
        });

        this.openModal();
    }

    saveEducation(eduIndex) {
        const institution = document.getElementById('edu-institution').value.trim();
        const area = document.getElementById('edu-area').value.trim();
        const studyType = document.getElementById('edu-type').value;
        const startDate = document.getElementById('edu-start').value;
        const endDate = document.getElementById('edu-end').value || null;
        const score = document.getElementById('edu-score').value.trim() || null;

        if (!institution || !area || !startDate) {
            this.showMessage('Veuillez remplir tous les champs requis', 'error');
            return;
        }

        const education = {
            institution,
            area,
            studyType,
            startDate,
            endDate,
            ...(score && { score })
        };

        if (eduIndex !== null) {
            this.currentData.education[eduIndex] = education;
        } else {
            this.currentData.education.push(education);
        }

        this.closeModal();
        this.renderEducation();
        this.showMessage('Formation sauvegardée avec succès', 'success');
    }

    editEducation(index) {
        this.showEducationModal(index);
    }

    deleteEducation(index) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
            this.currentData.education.splice(index, 1);
            this.renderEducation();
            this.showMessage('Formation supprimée', 'success');
        }
    }

    // Languages Management
    renderLanguages() {
        const container = document.getElementById('languages-list');
        if (!this.currentData?.languages) return;

        container.innerHTML = this.currentData.languages.map((lang, index) => `
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200 fade-in">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h3 class="font-semibold text-gray-900">${lang.language}</h3>
                        <p class="text-sm text-gray-600">Niveau: ${lang.fluency}</p>
                        ${lang.level ? `<p class="text-xs text-gray-500">Certification: ${lang.level}</p>` : ''}
                    </div>
                    <div class="flex space-x-2 ml-4">
                        <button onclick="adminManager.editLanguage(${index})" class="text-blue-600 hover:text-blue-800">
                            ✏️ Modifier
                        </button>
                        <button onclick="adminManager.deleteLanguage(${index})" class="text-red-600 hover:text-red-800">
                            🗑️ Supprimer
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showLanguageModal(langIndex = null) {
        const lang = langIndex !== null ? this.currentData.languages[langIndex] : null;
        const isEditing = langIndex !== null;

        document.getElementById('modal-title').textContent = isEditing ? 'Modifier la langue' : 'Ajouter une langue';
        
        document.getElementById('modal-content').innerHTML = `
            <form id="language-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Langue</label>
                    <input type="text" id="lang-name" value="${lang?.language || ''}" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                    <select id="lang-fluency" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Langue maternelle" ${lang?.fluency === 'Langue maternelle' ? 'selected' : ''}>Langue maternelle</option>
                        <option value="Courant" ${lang?.fluency === 'Courant' ? 'selected' : ''}>Courant</option>
                        <option value="Avancé" ${lang?.fluency === 'Avancé' ? 'selected' : ''}>Avancé</option>
                        <option value="Intermédiaire" ${lang?.fluency === 'Intermédiaire' ? 'selected' : ''}>Intermédiaire</option>
                        <option value="Débutant" ${lang?.fluency === 'Débutant' ? 'selected' : ''}>Débutant</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Certification (optionnel)</label>
                    <input type="text" id="lang-level" value="${lang?.level || ''}" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="Ex: TOEIC 950, DELF B2, etc.">
                </div>
                
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" onclick="adminManager.closeModal()" 
                            class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                        Annuler
                    </button>
                    <button type="submit" 
                            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        ${isEditing ? 'Modifier' : 'Ajouter'}
                    </button>
                </div>
            </form>
        `;

        // Form submission
        document.getElementById('language-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveLanguage(langIndex);
        });

        this.openModal();
    }

    saveLanguage(langIndex) {
        const language = document.getElementById('lang-name').value.trim();
        const fluency = document.getElementById('lang-fluency').value;
        const level = document.getElementById('lang-level').value.trim() || null;

        if (!language) {
            this.showMessage('Veuillez remplir tous les champs requis', 'error');
            return;
        }

        const lang = {
            language,
            fluency,
            ...(level && { level })
        };

        if (langIndex !== null) {
            this.currentData.languages[langIndex] = lang;
        } else {
            this.currentData.languages.push(lang);
        }

        this.closeModal();
        this.renderLanguages();
        this.showMessage('Langue sauvegardée avec succès', 'success');
    }

    editLanguage(index) {
        this.showLanguageModal(index);
    }

    deleteLanguage(index) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette langue ?')) {
            this.currentData.languages.splice(index, 1);
            this.renderLanguages();
            this.showMessage('Langue supprimée', 'success');
        }
    }

    // Interests Management
    renderInterests() {
        const container = document.getElementById('interests-list');
        if (!this.currentData?.interests) return;

        container.innerHTML = this.currentData.interests.map((interest, index) => `
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200 fade-in">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h3 class="font-semibold text-gray-900">${interest.name}</h3>
                        <div class="mt-2">
                            <span class="text-xs text-gray-500">Mots-clés:</span>
                            <div class="flex flex-wrap gap-1 mt-1">
                                ${interest.keywords.map(keyword => 
                                    `<span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">${keyword}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="flex space-x-2 ml-4">
                        <button onclick="adminManager.editInterest(${index})" class="text-blue-600 hover:text-blue-800">
                            ✏️ Modifier
                        </button>
                        <button onclick="adminManager.deleteInterest(${index})" class="text-red-600 hover:text-red-800">
                            🗑️ Supprimer
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showInterestModal(interestIndex = null) {
        const interest = interestIndex !== null ? this.currentData.interests[interestIndex] : null;
        const isEditing = interestIndex !== null;

        document.getElementById('modal-title').textContent = isEditing ? 'Modifier le centre d\'intérêt' : 'Ajouter un centre d\'intérêt';
        
        document.getElementById('modal-content').innerHTML = `
            <form id="interest-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nom du centre d'intérêt</label>
                    <input type="text" id="interest-name" value="${interest?.name || ''}" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Mots-clés (séparés par des virgules)</label>
                    <input type="text" id="interest-keywords" value="${interest?.keywords?.join(', ') || ''}" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required
                           placeholder="Ex: Machine Learning, ChatGPT, Innovation">
                </div>
                
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" onclick="adminManager.closeModal()" 
                            class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                        Annuler
                    </button>
                    <button type="submit" 
                            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        ${isEditing ? 'Modifier' : 'Ajouter'}
                    </button>
                </div>
            </form>
        `;

        // Form submission
        document.getElementById('interest-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveInterest(interestIndex);
        });

        this.openModal();
    }

    saveInterest(interestIndex) {
        const name = document.getElementById('interest-name').value.trim();
        const keywords = document.getElementById('interest-keywords').value.split(',').map(k => k.trim()).filter(k => k);

        if (!name || keywords.length === 0) {
            this.showMessage('Veuillez remplir tous les champs requis', 'error');
            return;
        }

        const interest = { name, keywords };

        if (interestIndex !== null) {
            this.currentData.interests[interestIndex] = interest;
        } else {
            this.currentData.interests.push(interest);
        }

        this.closeModal();
        this.renderInterests();
        this.showMessage('Centre d\'intérêt sauvegardé avec succès', 'success');
    }

    editInterest(index) {
        this.showInterestModal(index);
    }

    deleteInterest(index) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce centre d\'intérêt ?')) {
            this.currentData.interests.splice(index, 1);
            this.renderInterests();
            this.showMessage('Centre d\'intérêt supprimé', 'success');
        }
    }

    // Modal Management
    openModal() {
        document.getElementById('modal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        document.getElementById('modal').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // Message Management
    showMessage(message, type = 'info') {
        const container = document.getElementById('message-container');
        const messageDiv = document.createElement('div');
        
        const bgColor = type === 'error' ? 'bg-red-100 text-red-700' : 
                       type === 'success' ? 'bg-green-100 text-green-700' : 
                       'bg-blue-100 text-blue-700';
        
        messageDiv.className = `p-4 rounded-lg shadow-lg mb-2 slide-in ${bgColor}`;
        messageDiv.textContent = message;
        
        container.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Export Data
    async exportData() {
        try {
            // Validate data before export
            const validationResult = await validateSkillsTags();
            if (validationResult.issues && validationResult.issues.length > 0) {
                this.showMessage('Des problèmes ont été détectés dans les données. Vérifiez les compétences.', 'error');
                return;
            }

            // Create export data
            const exportData = {
                timestamp: new Date().toISOString(),
                language: this.currentLanguage,
                data: this.currentData
            };

            // Create and download file
            const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `cv-data-${this.currentLanguage}-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.showMessage('Données exportées avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors de l\'export:', error);
            this.showMessage('Erreur lors de l\'export des données', 'error');
        }
    }
}

// Initialize the admin manager when the page loads
let adminManager;
document.addEventListener('DOMContentLoaded', () => {
    adminManager = new AdminDataManager();
}); 