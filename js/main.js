console.log('🚀 JavaScript main.js chargé');

document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM chargé, initialisation...');

    (function() {
        try {
            console.log('🎨 Initialisation du thème...');
            const theme = localStorage.getItem('theme');
            console.log('Thème stocké:', theme);
            if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
                console.log('✅ Thème sombre appliqué');
            } else {
                document.documentElement.classList.remove('dark');
                console.log('✅ Thème clair appliqué');
            }
        } catch (e) { 
            console.error('❌ Erreur lors de l\'initialisation du thème:', e);
        }
    })();

    const allData = {
        jobs: [
            { id: 'sogeti', company: 'SogetiLab (Capgemini)', role: 'Product Owner / Consultant Fonctionnel', period: 'depuis 10/2024',
              description: `<p class="mb-4">Pilotage d'initiatives produit innovantes axées sur l'IA et l'automatisation. Contribution clé à la création d'une plateforme de labellisation d'images pour modèles d'IA, et à des solutions de détection d'animaux marins. Animation de la collaboration agile (Scrum).</p> <p><b>Lauréat (2ème place) du Hackathon "Prompt Master"</b> pour le développement d'une IA (RAG) générant des posts LinkedIn validés, en se basant sur la documentation interne pour garantir la conformité.</p>`,
              tags: ['IA', 'Audit Fonctionnel', 'Kanban', 'SAFe', 'Agile', 'Scrum', 'User Stories', 'Prompt Engineering', 'Communication', 'Leadership'] },
            { id: 'alten', company: 'Alten (Enedis Lab Bretagne)', role: 'Responsable Innovation de Produits', period: '05/2023 - 01/2024 (9 mois)',
              description: `<p class="mb-4"><b>Réduction significative des délais d'intervention</b> et <b>fiabilité du réseau améliorée</b> en pilotant une solution de gestion prédictive pour Enedis. Direction réussie de la <b>transition du navigateur interne</b> (Firefox à Edge), incluant la création et le déploiement de <b>programmes de formation</b> pour acculturer les agents aux nouvelles fonctionnalités.</p> <p>Conception et animation d'ateliers sur <b>Microsoft Power Automate</b>, renforçant la compétence digitale des équipes. Ces initiatives ont conduit à une <b>optimisation globale des processus internes</b> et une <b>réduction des coûts opérationnels</b>.</p>`,
              tags: ['Innovation', 'Automatisation', 'Gestion de projet', 'Définition KPIs', 'Formation des utilisateurs', 'Accompagnement au changement', 'IA', 'Optimisation des Processus', 'Leadership', 'Pédagogie', 'Adaptabilité'] },
            { id: 'wemanity', company: 'Wemanity (ADEO - Leroy Merlin)', role: 'Product Owner', period: '05/2022 - 05/2023 (1 an)',
              description: `<p class="mb-4">Garantie de la <b>conformité légale</b> et de l'<b>adoption fluide</b> d'un nouvel outil de calcul de pénalités fournisseurs (Europe & Asie) en pilotant sa conception de A à Z.</p> <p>Orchestration des réunions avec les parties prenantes clés (achats, juridique, comptabilité) pour définir et valider les règles métier. En collaboration avec le PO Data, <b>développement et validation d'un modèle de données précis</b>. Conception d'<b>interfaces utilisateur intuitives</b> avec l'équipe UX/UI, en intégrant les retours utilisateurs pour une <b>maintenance optimisée</b> de 3 solutions internes.</p>`,
              tags: ['Analyse fonctionnelle', 'Définition KPIs', 'Product Ownership', 'UX/UI', 'Scrum', 'User Stories', 'Modélisation de Données', 'Collaboration transverse', 'Communication', 'Rigueur', 'Empathie'] },
            { id: 'elamp', company: 'eLamp', role: 'Product Owner', period: '03/2020 - 03/2022 (2 ans et 1 mois)',
              description: `<p class="mb-4">En tant que Product Owner dans un environnement startup agile, j'ai géré le cycle de vie complet des fonctionnalités d'une plateforme RH. Responsable de la <b>roadmap</b> et du <b>backlog</b>, j'ai mené la <b>recette fonctionnelle</b>, rédigé les <b>spécifications techniques</b> et les user stories.</p> <p>J'ai également participé activement aux phases d'<b>avant-vente</b>, à l'amélioration de l'<b>UX</b>, et communiqué les nouveautés via des <b>release notes</b> et des démos, assurant un alignement constant entre les besoins utilisateurs et la stratégie produit.</p>`,
              tags: ['Lean Product', 'Gestion du MVP', 'User Stories', 'Veille concurrentielle', 'Scrum', 'Design Thinking', 'Roadmap Produit', 'Recette Fonctionnelle', 'Backlog Management', 'UX', 'Agile', 'Communication', 'Adaptabilité'] }
        ],
        skills: {
            'Gestion de Produit': [
                { name: 'Product Ownership', description: "Pilotage de la vision produit, de la stratégie à l'exécution, en maximisant la valeur pour les utilisateurs et l'entreprise." },
                { name: 'Backlog Management', description: "Organisation et priorisation du backlog produit pour assurer que l'équipe de développement travaille sur les tâches les plus importantes." },
                { name: 'User Stories', description: "Rédaction d'exigences claires et concises du point de vue de l'utilisateur pour guider le développement des fonctionnalités." },
                { name: 'Roadmap Produit', description: "Création et communication d'une feuille de route visuelle qui aligne les parties prenantes sur l'évolution stratégique du produit." },
                { name: 'Recette Fonctionnelle', description: "Validation et tests des fonctionnalités développées pour s'assurer qu'elles répondent aux exigences et aux standards de qualité." },
                { name: 'Gestion du MVP', description: "Définition et gestion du Produit Minimum Viable pour lancer rapidement une version initiale et itérer grâce aux retours utilisateurs." },
                { name: 'Lean Product', description: "Application des principes Lean pour éliminer le gaspillage, se concentrer sur la valeur et construire des produits que les clients aiment." },
            ],
            'Stratégie & Analyse': [
                { name: 'Analyse fonctionnelle', description: "Décomposition des besoins métier en exigences fonctionnelles détaillées pour l'équipe de développement." },
                { name: 'Audit Fonctionnel', description: "Évaluation approfondie d'un système ou d'une application existante pour identifier les améliorations et les écarts fonctionnels." },
                { name: 'Veille concurrentielle', description: "Surveillance et analyse des concurrents pour identifier les tendances du marché, les opportunités et les menaces." },
                { name: 'Définition KPIs', description: "Identification et suivi des Indicateurs Clés de Performance pour mesurer le succès du produit et guider les décisions." },
                { name: 'Optimisation des Processus', description: "Analyse et amélioration des flux de travail pour augmenter l'efficacité, réduire les coûts et améliorer la qualité." },
                { name: 'Modélisation de Données', description: "Conception de la structure logique des données d'un système pour assurer leur cohérence, leur intégrité et leur performance." },
            ],
            'Méthodologies & Agilité': [
                { name: 'Scrum', description: "Application du framework Scrum pour la gestion de projets complexes, en favorisant les cycles de développement itératifs et la collaboration d'équipe." },
                { name: 'Kanban', description: "Utilisation de la méthode Kanban pour visualiser le flux de travail, limiter le travail en cours et maximiser l'efficacité." },
                { name: 'SAFe', description: "Mise en œuvre du framework Scaled Agile (SAFe) pour appliquer les principes de l'agilité à grande échelle dans l'organisation." },
                { name: 'Design Thinking', description: "Utilisation d'une approche centrée sur l'humain pour résoudre des problèmes complexes et générer des solutions innovantes." },
                { name: 'Agile', description: "Adoption des principes du Manifeste Agile pour livrer de la valeur de manière itérative et incrémentale, en s'adaptant au changement." },
            ],
            'Soft Skills': [
                { name: 'Communication', description: "Capacité à transmettre des informations claires et concises à des interlocuteurs variés (techniques, métier, direction) et à animer des réunions efficaces." },
                { name: 'Leadership', description: "Aptitude à fédérer une équipe autour d'une vision produit, à motiver et à inspirer confiance pour atteindre les objectifs communs." },
                { name: 'Adaptabilité', description: "Flexibilité pour naviguer dans des environnements changeants (startup, grande entreprise) et à ajuster les priorités en fonction des nouvelles informations." },
            ],
            'Outils & Plateformes': [
                { name: 'JIRA', logo: 'https://logo.clearbit.com/jira.com', description: "Utilisation de Jira pour la gestion de projet agile, le suivi des tickets et la collaboration d'équipe." },
                { name: 'Figma', logo: 'https://logo.clearbit.com/figma.com', description: "Conception et prototypage d'interfaces utilisateur collaboratives pour visualiser et tester des solutions avant le développement." },
                { name: 'Notion', logo: 'https://logo.clearbit.com/notion.com', description: "Organisation de l'information, gestion de projets et création d'espaces de travail centralisés avec Notion." },
            ],
            'Technologies & Concepts Clés': [
                { name: 'IA', description: "Intégration de l'Intelligence Artificielle pour créer des produits plus intelligents, de l'automatisation à l'analyse prédictive." },
                { name: 'Prompt Engineering', description: "Art de concevoir des instructions efficaces pour les modèles d'IA générative afin d'obtenir des résultats précis et pertinents." },
                { name: 'Automatisation', description: "Mise en place de solutions pour automatiser les tâches répétitives et améliorer l'efficacité opérationnelle." },
                { name: 'UX/UI', description: "Conception d'expériences utilisateur (UX) et d'interfaces utilisateur (UI) intuitives et esthétiques, centrées sur les besoins de l'utilisateur." },
            ]
        },
        languages: [
            { lang: "Français", level: "Langue maternelle", flag: '🇫🇷' },
            { lang: "Anglais", level: "Niveau professionnel intermédiaire", flag: '🇬🇧' },
            { lang: "Italien", level: "Niveau débutant", flag: '🇮🇹' }
        ],
        engagements: [
            { role: "Mentor de jeunes", organization: "Le Déclic", period: "depuis 04/2025", description: "Coach et accompagnant pour aider à la recherche d'alternances, stages et premiers emplois.", url: "https://le-declic.com/devenir-mentor-le-declic/", logo: "https://logo.clearbit.com/le-declic.com" },
            { role: "Gestion de la communication digitale", organization: "Croix Rouge Italienne", period: "Bénévole", description: "Gestion des contenus et des réseaux sociaux pour soutenir les actions de l'association.", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Croce_Rossa_Italiana_-_logo_%28Italy%2C_1994%29.svg" }
        ],
        certifications: [
            { acronym: 'SAFe 6', fullName: 'Certified Practitioner', issuer: 'SAFe', date: '09/2024', url: 'https://aurelien-rodier.fr/SAFE.pdf', description: "Démontre la compétence pour travailler en tant que membre d'un Agile Release Train (ART) dans un environnement SAFe (Scaled Agile Framework).", logo: 'https://logo.clearbit.com/scaledagile.com' },
            { acronym: 'PSPO I', fullName: 'Professional Scrum Product Owner', issuer: 'Scrum.org', date: '09/2024', url: 'https://www.credly.com/badges/7af61bdc-d81f-49af-b4ef-304aa464b1a4', description: "Valide une compréhension approfondie du framework Scrum et de la manière de maximiser la valeur d'un produit en tant que Product Owner.", logo: 'https://images.credly.com/size/680x680/images/591762c5-fae7-49c6-b326-e1756979928d/image.png' },
            { acronym: 'PSM I', fullName: 'Professional Scrum Master', issuer: 'Scrum.org', date: '09/2024', url: 'https://www.credly.com/badges/285075d9-eb6b-4775-8554-5238b5c54791', description: "Atteste d'une connaissance fondamentale du framework Scrum, de ses rôles, événements et artefacts, et de la capacité à l'appliquer.", logo: 'https://images.credly.com/size/680x680/images/a2790314-008a-4c3d-9553-f5e84eb359ba/image.png' }
        ],
        formations: [
            { name: 'Formation Noé', school: 'Excellence Produit', date: '2024', url: 'https://www.noe.pm/formation-product-manager-la-formation-pm-en-4-semaines-noe', description: 'Formation intensive par des experts de scale-ups (Aircall, Blablacar), centrée sur les meilleures pratiques du Product Management moderne.', logo: 'https://logo.clearbit.com/https%3A//www.noe.pm/' },
            { name: 'Product Manager', school: 'OpenClassrooms', date: '2020 - 2022', url: 'https://openclassrooms.com/fr/paths/702-product-manager#projects', description: 'Formation diplômante (Niveau 7 EU) axée sur la pratique via des projets : étude de marché, roadmap, spécifications, tests utilisateurs et stratégie.', logo: 'https://logo.clearbit.com/openclassrooms.com' },
            { name: 'Master 2 Pranet', school: 'Université Rennes 2', date: '2015 - 2017', url: 'https://formations.univ-rennes2.fr/fr/formations/master-37/master-mention-communication-des-organisations-parcours-communication-organisationnelle-et-innovation-numerique-JFJEXOST.html', description: "Spécialisation en stratégie de communication digitale, gestion de projets numériques et analyse des usages de l'innovation.", logo: 'https://logo.clearbit.com/https%3A//www.univ-rennes2.fr/' },
            { name: 'Licence ATC', school: 'Université Paris-Est', date: '2014 - 2015', url: 'https://www.cidj.com/s-orienter/diplomes/licence-professionnelle-atc-activites-et-techniques-de-communication', description: 'Formation professionnalisante couvrant un large spectre des techniques de communication : audiovisuel, web, graphisme et stratégie.', logo: 'https://logo.clearbit.com/https%3A//www.univ-gustave-eiffel.fr/' }
        ]
    };
    
    const domElements = {
        timelineList: document.getElementById('timeline-list'),
        jobDetailsContainer: document.getElementById('job-details'),
        skillCategoriesList: document.getElementById('skill-categories-list'),
        skillTagsContainer: document.getElementById('skill-tags'),
        skillDetailsPanel: document.getElementById('skill-details-panel'),
        skillsTitle: document.getElementById('skills-title'),
        certificationsList: document.getElementById('certifications-list'),
        formationsList: document.getElementById('formations-list'),
        languagesList: document.getElementById('languages-list'),
        engagementsList: document.getElementById('engagements-list'),
        contactForm: document.getElementById('contact-form'),
        toastNotification: document.getElementById('toast-notification'),
        sectionNav: document.getElementById('section-nav'),
        navUp: document.getElementById('nav-up'),
        navDown: document.getElementById('nav-down'),
    };
    
    let currentJobIndex = 0;
    let activeSkill = null; 
    let activeCategory = 'Gestion de Produit';
    let sections = [];
    let currentSectionIndex = 0;

    function renderTimeline() {
        if (!domElements.timelineList) return;
        domElements.timelineList.innerHTML = allData.jobs.map(job => `
            <li>
                <button id="${job.id}" class="timeline-item timeline-line w-full text-left relative pl-8 border-l-2 py-2 mb-4 transition-colors">
                    <span class="timeline-dot-border absolute w-4 h-4 rounded-full -left-[9px] top-3 bg-accent-orange border-[3px]"></span>
                    <h4 class="font-bold pointer-events-none">${job.role}</h4>
                    <p class="text-sm pointer-events-none text-subtle">${job.company}</p>
                </button>
            </li>
        `).join('');
        updateTimelineActive(currentJobIndex);
    }

    function renderJobDetails(index) {
        if (!domElements.jobDetailsContainer) return;
        const job = allData.jobs[index];
        domElements.jobDetailsContainer.innerHTML = `
            <div class="fade-in flex flex-col h-full">
                <div>
                    <h3 class="text-2xl font-bold main-title">${job.role}</h3>
                    <p class="text-lg font-semibold text-[#E07A5F]">${job.company}</p>
                    <p class="text-sm text-subtle mb-4">${job.period}</p>
                    <div class="text-body leading-relaxed space-y-4">${job.description}</div>
                    <div class="mt-4 flex flex-wrap gap-2">
                        ${job.tags.map(tag => `<span class="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-xs font-medium px-2.5 py-1 rounded-full">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="mt-auto pt-6 flex justify-between">
                    <button id="prev-job" class="experience-nav-btn p-2 rounded-full" aria-label="Expérience précédente">
                         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button id="next-job" class="experience-nav-btn p-2 rounded-full" aria-label="Expérience suivante">
                         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </button>
                </div>
            </div>`;
        
        const prevBtn = domElements.jobDetailsContainer.querySelector('#prev-job');
        const nextBtn = domElements.jobDetailsContainer.querySelector('#next-job');

        const scrollToParcoursTop = () => document.getElementById('parcours').scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (window.innerWidth < 768) {
            if (index === 0) {
                prevBtn.onclick = () => document.getElementById('a-propos').scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                prevBtn.onclick = () => navigateJobs(-1);
            }
            if (index === allData.jobs.length - 1) {
                nextBtn.onclick = () => document.getElementById('competences').scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                nextBtn.onclick = () => navigateJobs(1);
            }
        } else {
            prevBtn.disabled = index === 0;
            prevBtn.classList.toggle('opacity-50', index === 0);
            prevBtn.classList.toggle('cursor-not-allowed', index === 0);
            prevBtn.onclick = () => { navigateJobs(-1); scrollToParcoursTop(); };

            nextBtn.disabled = index === allData.jobs.length - 1;
            nextBtn.classList.toggle('opacity-50', index === allData.jobs.length - 1);
            nextBtn.classList.toggle('cursor-not-allowed', index === allData.jobs.length - 1);
            nextBtn.onclick = () => { navigateJobs(1); scrollToParcoursTop(); };
        }
    }

    function renderCardList(container, items, type) {
        if (!container || !items) return;
        container.innerHTML = items.map(item => {
            let logoHtml = '';
            if(type === 'language') {
                logoHtml = `<span class="text-4xl">${item.flag}</span>`;
            } else if (item.logo) {
                logoHtml = `<img src="${item.logo}" alt="Logo de ${item.organization || item.school || item.issuer}" class="w-12 h-12 rounded-md object-contain flex-shrink-0" onerror="this.style.display='none'">`;
            }

            let titleHtml = '';
            switch(type) {
                case 'language':
                    titleHtml = `<p class="font-bold text-lg main-title">${item.lang}</p><p class="text-subtle">${item.level}</p>`;
                    break;
                case 'engagement':
                    titleHtml = `<p class="font-bold text-lg main-title">${item.role}</p><p class="font-semibold text-[#E07A5F]">${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="hover:underline">${item.organization}</a>` : item.organization} - ${item.period}</p>`;
                    break;
                case 'certification':
                     titleHtml = `<div class="flex-grow"><p class="font-bold text-lg main-title">${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="hover:text-[#E07A5F] underline">${item.acronym}</a>` : item.acronym}</p><p class="text-subtle font-semibold">${item.fullName}</p></div>`;
                    break;
                case 'formation':
                    titleHtml = `<div class="flex-grow"><p class="font-bold text-lg main-title">${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="hover:text-[#E07A5F] underline">${item.name}</a>` : item.name}</p><p class="text-subtle font-semibold">${item.school} - ${item.date}</p></div>`;
                    break;
            }
            
            return `
            <div class="info-card card-bg p-4 rounded-lg shadow-sm">
                <div class="flex items-center gap-4">
                    ${logoHtml}
                    <div class="flex-grow">
                        ${titleHtml}
                    </div>
                </div>
                ${item.description ? `<p class="text-sm text-subtle mt-2 ${type === 'engagement' ? 'pl-16' : ''}">${item.description}</p>` : ''}
            </div>`;
        }).join('');
    }

    function updateTimelineActive(index) {
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.classList.remove('active', 'main-title');
        });
        const activeItem = document.getElementById(allData.jobs[index].id);
        if (activeItem) {
            activeItem.classList.add('active', 'main-title');
        }
    }
    
    function renderCategories() {
        if (!domElements.skillCategoriesList) return;
        domElements.skillCategoriesList.innerHTML = Object.keys(allData.skills).map(category => `
            <button class="category-button card-bg text-subtle w-full text-left p-4 rounded-lg border-2 border-transparent transition" data-category="${category}">
                ${category}
            </button>
        `).join('');
        
        domElements.skillCategoriesList.querySelectorAll('.category-button').forEach(button => {
            button.addEventListener('click', () => {
                activeCategory = button.dataset.category;
                renderCategories();
                renderSkills();
                const firstSkill = allData.skills[activeCategory]?.[0];
                if (firstSkill) {
                    handleSkillClick(firstSkill);
                } else {
                    resetSkillsState();
                }
                document.getElementById('competences').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
        
        const activeButton = domElements.skillCategoriesList.querySelector(`[data-category="${activeCategory}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
    
    function renderSkills() {
        if (!domElements.skillTagsContainer) return;
        const skills = allData.skills[activeCategory] || [];
        if(domElements.skillsTitle) domElements.skillsTitle.textContent = activeCategory;
        domElements.skillTagsContainer.innerHTML = skills.map(skill => `
            <button class="skill-tag card-bg text-subtle shadow-sm flex items-center justify-center gap-2 px-4 py-2 rounded-md transition" data-skill-name="${skill.name}">
                <span>${skill.name}</span>
            </button>
        `).join('');
        
        domElements.skillTagsContainer.querySelectorAll('.skill-tag').forEach(button => {
            button.addEventListener('click', () => {
                const skillName = button.dataset.skillName;
                const skillData = allData.skills[activeCategory].find(s => s.name === skillName);
                handleSkillClick(skillData);
            });
        });
    }
    
    function handleSkillClick(skill) {
         if (activeSkill && activeSkill.name === skill.name) {
            resetSkillsState();
        } else {
            activeSkill = skill;
            document.querySelectorAll('.skill-tag').forEach(t => t.classList.remove('active-clicked'));
            if (domElements.skillTagsContainer) {
                const tagToActivate = domElements.skillTagsContainer.querySelector(`[data-skill-name="${skill.name}"]`);
                if (tagToActivate) {
                    tagToActivate.classList.add('active-clicked');
                }
            }
            updateSkillDetailsPanel(skill);
        }
    }
    
    function updateSkillDetailsPanel(skill) {
        const panel = domElements.skillDetailsPanel;
        if (!panel) return;
        panel.innerHTML = ''; 

        const jobsForThisSkill = allData.jobs.filter(job => job.tags.includes(skill.name));
        
        panel.innerHTML = `
            <div class="card-bg border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div class="flex justify-between items-center mb-4">
                    <h4 class="font-semibold text-lg text-accent-orange">${skill.name}</h4>
                    <button class="skill-panel-close-btn p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600" aria-label="Fermer">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <p class="text-body mb-4">${skill.description}</p>
                
                ${jobsForThisSkill.length > 0 ? `
                    <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h5 class="text-sm font-semibold text-subtle mb-2">Mis en pratique chez :</h5>
                        <div class="flex flex-col gap-1">
                            ${jobsForThisSkill.map(job => `
                                <button class="associated-job-item text-left p-2 rounded-md" data-job-id="${job.id}">
                                    ${job.role} chez <strong class="font-semibold">${job.company}</strong>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
        
        panel.querySelector('.skill-panel-close-btn').onclick = resetSkillsState;
        panel.querySelectorAll('.associated-job-item').forEach(button => {
            button.onclick = (e) => {
                const jobId = e.currentTarget.dataset.jobId;
                const jobIndex = allData.jobs.findIndex(j => j.id === jobId);
                if (jobIndex !== -1) {
                    currentJobIndex = jobIndex;
                    renderJobDetails(currentJobIndex);
                    updateTimelineActive(currentJobIndex);
                    document.getElementById('parcours').scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            };
        });
        
        panel.classList.add('active-panel');
    }
    
    function navigateJobs(direction) {
        const newIndex = currentJobIndex + direction;
        if (newIndex >= 0 && newIndex < allData.jobs.length) {
            currentJobIndex = newIndex;
            renderJobDetails(currentJobIndex);
            updateTimelineActive(currentJobIndex);
        }
    }

    function resetSkillsState() {
        activeSkill = null;
        if(domElements.skillDetailsPanel) {
            domElements.skillDetailsPanel.classList.remove('active-panel');
        }
        document.querySelectorAll('.skill-tag').forEach(t => t.classList.remove('active-clicked'));
    }
    
    function init() {
        startTypingEffect();

        sections = Array.from(document.querySelectorAll('main > section, main > div > section'));

        if (domElements.timelineList) {
            renderTimeline();
            if (allData.jobs.length > 0) {
                renderJobDetails(currentJobIndex);
            }
        }
        
        renderCardList(domElements.languagesList, allData.languages, 'language');
        renderCardList(domElements.engagementsList, allData.engagements, 'engagement');
        renderCardList(domElements.certificationsList, allData.certifications, 'certification');
        renderCardList(domElements.formationsList, allData.formations, 'formation');

        if (domElements.skillCategoriesList) {
            renderCategories();
            renderSkills();
        }

        if (domElements.timelineList) {
            domElements.timelineList.addEventListener('click', (e) => {
                const item = e.target.closest('.timeline-item');
                if (item) {
                    const jobIndex = allData.jobs.findIndex(job => job.id === item.id);
                    if (jobIndex > -1) {
                        currentJobIndex = jobIndex;
                        renderJobDetails(currentJobIndex);
                        updateTimelineActive(currentJobIndex);
                        document.getElementById('parcours').scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        }
        
        if (domElements.contactForm) {
            domElements.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const subject = formData.get('subject') || 'Contact depuis aurelien-rodier.fr';
                const body = `Message de : ${formData.get('name')} (${formData.get('email')})\n\n${formData.get('message')}`;
                window.location.href = `mailto:rodier.aurelien@orange.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                if(domElements.toastNotification) {
                    domElements.toastNotification.textContent = "Ouverture de votre client de messagerie...";
                    domElements.toastNotification.classList.add('show');
                    setTimeout(() => domElements.toastNotification.classList.remove('show'), 4000);
                }
            });
        }

        document.getElementById('menu-btn').addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });
        
        const updateNavs = () => {
            const scrollY = window.scrollY;
            const offset = window.innerHeight * 0.4;
            
            let newCurrentSectionIndex = -1;

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollY >= sectionTop - offset && scrollY < sectionTop + sectionHeight - offset) {
                     newCurrentSectionIndex = index;
                }
            });

            if (newCurrentSectionIndex !== -1 && newCurrentSectionIndex !== currentSectionIndex) {
                currentSectionIndex = newCurrentSectionIndex;
                const currentSectionId = sections[currentSectionIndex].id;

                const navLinks = document.querySelectorAll('header nav a.nav-link');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
                });

                const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
                mobileMenuLinks.forEach(link => {
                    link.classList.toggle('active-mobile', link.getAttribute('href') === `#${currentSectionId}`);
                });
            }

            if (domElements.sectionNav) {
                domElements.sectionNav.classList.toggle('visible', scrollY > window.innerHeight * 0.5);
                if (domElements.navUp) domElements.navUp.style.display = currentSectionIndex > 0 ? 'flex' : 'none';
                if (domElements.navDown) domElements.navDown.style.display = (currentSectionIndex < sections.length - 1 && currentSectionIndex !== -1) ? 'flex' : 'none';
            }
        };
        
        window.addEventListener('scroll', updateNavs, { passive: true });
        
        if (domElements.navUp) {
            domElements.navUp.addEventListener('click', () => {
                if (currentSectionIndex > 0) {
                    sections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
        if (domElements.navDown) {
            domElements.navDown.addEventListener('click', () => {
                 if (currentSectionIndex < sections.length - 1) {
                    sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        window.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (currentSectionIndex < sections.length - 1) {
                    sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentSectionIndex > 0) {
                    sections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
        
        document.getElementById('home-link').addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');
        console.log('🔘 Boutons de thème trouvés:', { themeToggle: !!themeToggle, themeToggleMobile: !!themeToggleMobile });
        
        if (themeToggle) {
            themeToggleMobile.innerHTML = themeToggle.innerHTML;
        }
        const allToggles = [themeToggle, themeToggleMobile];
        
        const applyThemeIcons = (theme) => {
            console.log('🎨 Application des icônes de thème:', theme);
            allToggles.forEach(toggle => {
                if (!toggle) return;
                const lightIcon = toggle.querySelector('#theme-icon-light');
                const darkIcon = toggle.querySelector('#theme-icon-dark');
                if(lightIcon && darkIcon) {
                    lightIcon.style.display = theme === 'dark' ? 'none' : 'block';
                    darkIcon.style.display = theme === 'dark' ? 'block' : 'none';
                }
            });
        };

        const toggleTheme = () => {
            console.log('🔄 Changement de thème...');
            const isDark = document.documentElement.classList.toggle('dark');
            const newTheme = isDark ? 'dark' : 'light';
            console.log('Nouveau thème:', newTheme);
            localStorage.setItem('theme', newTheme);
            applyThemeIcons(newTheme);
        };
        
        allToggles.forEach(toggle => {
            if(toggle) {
                console.log('📝 Ajout d\'écouteur d\'événement sur le bouton de thème');
                toggle.addEventListener('click', toggleTheme);
            }
        });
        
        const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        console.log('🎨 Thème actuel:', currentTheme);
        applyThemeIcons(currentTheme);
    }

    function startTypingEffect() {
        const typingElement = document.getElementById('typing-effect');
        if (!typingElement) return;

        const words = ["Product Owner", "Expert en Agilité", "Spécialiste IA", "Passionné d'innovation"];
        let i = 0;
        let j = 0;
        let currentWord = "";
        let isDeleting = false;

        function type() {
            currentWord = words[i];
            if (isDeleting) {
                j--;
            } else {
                j++;
            }

            typingElement.innerHTML = currentWord.substring(0, j);

            if (!isDeleting && j === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && j === 0) {
                isDeleting = false;
                i = (i + 1) % words.length;
                setTimeout(type, 500);
            } else {
                let typeSpeed = isDeleting ? 75 : 150;
                setTimeout(type, typeSpeed);
            }
        }
        type();
    }

    function exportToPDF() {
        // Créer un conteneur temporaire pour l'export
        const exportContainer = document.createElement('div');
        exportContainer.style.cssText = `
            position: absolute;
            left: -9999px;
            top: 0;
            width: 800px;
            background-color: white;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #111827;
            line-height: 1.6;
            padding: 0;
            margin: 0;
        `;
        
        // Récupérer les données dynamiquement depuis allData
        const profilePic = document.getElementById('profile-pic').src;
        const name = 'Aurélien Rodier';
        const title = 'Product Owner Confirmé | Spécialiste Produit IA & SaaS';
        const email = 'rodier.aurelien@orange.fr';
        const linkedin = 'linkedin.com/in/rodieraurelien';
        const website = 'aurelien-rodier.fr';
        
        // Fonction pour nettoyer le HTML des descriptions
        const cleanHTML = (html) => {
            return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
        };
        
        // Fonction pour générer les compétences par catégorie
        const generateSkillsHTML = () => {
            let skillsHTML = '';
            Object.keys(allData.skills).forEach(category => {
                const skills = allData.skills[category];
                skillsHTML += `
                    <div style="margin-bottom: 1rem;">
                        <h4 style="color: #4f46e5; font-weight: 600; margin: 0 0 0.5rem 0; font-size: 1rem;">${category}</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
                            ${skills.map(skill => `<span style="background-color: #f3f4f6; color: #374151; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">${skill.name}</span>`).join('')}
                        </div>
                    </div>
                `;
            });
            return skillsHTML;
        };
        
        // Fonction pour générer les expériences
        const generateExperiencesHTML = () => {
            return allData.jobs.map(job => `
                <div style="margin-bottom: 1.5rem; padding-left: 1rem; border-left: 3px solid #e5e7eb;">
                    <h3 style="font-size: 1.1rem; font-weight: 600; color: #111827; margin: 0 0 0.25rem 0;">${job.role}</h3>
                    <p style="font-weight: 500; color: #4f46e5; margin: 0 0 0.5rem 0; font-size: 0.9rem;">${job.company} | ${job.period}</p>
                    <div style="color: #6b7280; margin: 0.5rem 0 0 0; font-size: 0.9rem;">
                        ${cleanHTML(job.description)}
                    </div>
                    <div style="margin-top: 0.5rem;">
                        ${job.tags.map(tag => `<span style="background-color: #f3f4f6; color: #374151; padding: 0.1rem 0.4rem; border-radius: 3px; font-size: 0.7rem; margin-right: 0.2rem;">${tag}</span>`).join('')}
                    </div>
                </div>
            `).join('');
        };
        
        // Fonction pour générer les certifications
        const generateCertificationsHTML = () => {
            return allData.certifications.map(cert => `
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                    <span style="color: #4f46e5; font-size: 0.8rem;">●</span>
                    <div>
                        <p style="margin: 0; font-weight: 600; font-size: 0.9rem;">${cert.acronym} - ${cert.fullName}</p>
                        <p style="margin: 0; font-size: 0.8rem; color: #6b7280;">${cert.issuer} - ${cert.date}</p>
                    </div>
                </div>
            `).join('');
        };
        
        // Fonction pour générer les formations
        const generateFormationsHTML = () => {
            return allData.formations.map(formation => `
                <div style="margin-bottom: 0.75rem;">
                    <p style="margin: 0; font-weight: 600; font-size: 0.9rem;">${formation.name}</p>
                    <p style="margin: 0; font-size: 0.8rem; color: #6b7280;">${formation.school} - ${formation.date}</p>
                </div>
            `).join('');
        };
        
        // Fonction pour générer les langues
        const generateLanguagesHTML = () => {
            return allData.languages.map(lang => `
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                    <span style="font-size: 1rem;">${lang.flag}</span>
                    <span style="font-weight: 600; font-size: 0.9rem;">${lang.lang}</span>
                    <span style="color: #6b7280; font-size: 0.8rem;">- ${lang.level}</span>
                </div>
            `).join('');
        };
        
        // Construire le contenu du CV optimisé pour l'impression
        exportContainer.innerHTML = `
            <div style="padding: 2rem; background: linear-gradient(135deg, #f0f9ff 0%, #f1f5f9 100%); border-bottom: 4px solid #4f46e5;">
                <div style="display: flex; align-items: center; gap: 2rem;">
                    <img src="${profilePic}" alt="Aurélien Rodier" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid white; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                    <div style="flex: 1;">
                        <h1 style="font-size: 2.2rem; font-weight: 800; color: #111827; margin: 0 0 0.5rem 0;">${name}</h1>
                        <p style="font-size: 1.1rem; font-weight: 600; color: #4f46e5; margin: 0 0 1rem 0;">${title}</p>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; color: #374151;">
                                <span style="color: #4f46e5;">📧</span>
                                <span>${email}</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem; color: #374151;">
                                <span style="color: #4f46e5;">🔗</span>
                                <span>${linkedin}</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem; color: #374151;">
                                <span style="color: #4f46e5;">🌐</span>
                                <span>${website}</span>
                            </div>
                        </div>
                    </div>
                    <img src="https://aurelien-rodier.fr/qrcode_cv.png" alt="QR Code" style="width: 100px; height: 100px; border-radius: 6px;">
                </div>
            </div>
            
            <div style="padding: 2rem;">
                <div style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.4rem; font-weight: 700; color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">
                        📋 Profil Professionnel
                    </h2>
                    <p style="color: #6b7280; line-height: 1.6; font-size: 0.95rem;">
                        Product Owner certifié (PSPO I, PSM I, SAFe 6), spécialisé dans la conception et l'évolution de solutions SaaS innovantes intégrant l'IA. Mon expertise réside dans ma capacité à transformer les besoins utilisateurs en fonctionnalités à fort impact, en m'appuyant sur une approche data-driven et une maîtrise des méthodologies agiles (Scrum, SAFe). Passionné par l'innovation, je pilote des projets complexes pour maximiser la valeur produit et l'efficacité opérationnelle.
                    </p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.4rem; font-weight: 700; color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">
                        💼 Expériences Professionnelles
                    </h2>
                    ${generateExperiencesHTML()}
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <h2 style="font-size: 1.4rem; font-weight: 700; color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">
                            🛠️ Compétences
                        </h2>
                        ${generateSkillsHTML()}
                    </div>
                    
                    <div>
                        <h2 style="font-size: 1.4rem; font-weight: 700; color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">
                            🎓 Formations & Certifications
                        </h2>
                        <div style="margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1.1rem; font-weight: 600; color: #4f46e5; margin-bottom: 0.75rem;">Certifications</h3>
                            ${generateCertificationsHTML()}
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1.1rem; font-weight: 600; color: #4f46e5; margin-bottom: 0.75rem;">Formations</h3>
                            ${generateFormationsHTML()}
                        </div>
                        <div>
                            <h3 style="font-size: 1.1rem; font-weight: 600; color: #4f46e5; margin-bottom: 0.75rem;">Langues</h3>
                            ${generateLanguagesHTML()}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Ajouter le conteneur au DOM temporairement
        document.body.appendChild(exportContainer);
        
        // Configuration optimisée pour l'export PDF
        const opt = {
            margin: 0.5,
            filename: 'CV_Aurelien_Rodier.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2, 
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false
            },
            jsPDF: { 
                unit: 'in', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            }
        };
        
        // Attendre que les images soient chargées avant de générer le PDF
        const images = exportContainer.querySelectorAll('img');
        const imagePromises = Array.from(images).map(img => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = resolve;
                    img.onerror = resolve; // Continuer même si une image échoue
                }
            });
        });
        
        Promise.all(imagePromises).then(() => {
            // Générer le PDF après un court délai pour assurer le rendu
            setTimeout(() => {
                html2pdf().set(opt).from(exportContainer).save().then(() => {
                    document.body.removeChild(exportContainer);
                }).catch(error => {
                    console.error('Erreur lors de la génération du PDF:', error);
                    document.body.removeChild(exportContainer);
                });
            }, 500);
        });
    }
    window.exportToPDF = exportToPDF;

    init();
});