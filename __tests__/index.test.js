const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Load the HTML file
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom;
let document;

describe('Portfolio index.html', () => {
    beforeEach(() => {
        // Create a new JSDOM instance for each test to ensure isolation
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        document = dom.window.document;
    });

    describe('Document Metadata and Structure', () => {
        it('should have the correct language attribute', () => {
            const htmlElement = document.querySelector('html');
            expect(htmlElement.getAttribute('lang')).toBe('fr');
        });

        it('should have a descriptive title', () => {
            expect(document.title).toBe('Aurélien Rodier - Product Owner');
        });

        it('should have a meta description', () => {
            const description = document.querySelector('meta[name="description"]');
            expect(description).not.toBeNull();
            expect(description.getAttribute('content')).toBeTruthy();
        });

        it('should contain all main sections', () => {
            const sectionIds = ['#accueil', '#a-propos', '#parcours', '#competences', '#formation', '#divers', '#contact'];
            sectionIds.forEach(id => {
                const section = document.querySelector(id);
                expect(section).not.toBeNull(`Section with id ${id} should exist.`);
            });
        });
    });

    describe('Header and Navigation', () => {
        it('should have a header that is fixed to the top', () => {
            const header = document.querySelector('header');
            expect(header).not.toBeNull();
            expect(header.classList.contains('fixed')).toBe(true);
        });

        it('should have a logo linking to #accueil', () => {
            const logoLink = document.querySelector('#home-link');
            expect(logoLink).not.toBeNull();
            expect(logoLink.getAttribute('href')).toBe('#accueil');
            const logoImg = logoLink.querySelector('img');
            expect(logoImg).not.toBeNull();
            expect(logoImg.getAttribute('alt')).toBe('Logo Aurélien Rodier');
        });

        it('should have desktop navigation links', () => {
            // Tailwind's md:flex is tricky to select, so we check the parent container
            const desktopNav = document.querySelector('.hidden.md\\:flex .nav-link');
            expect(desktopNav).not.toBeNull();
        });

        it('should have a mobile menu button', () => {
            const menuBtn = document.querySelector('#menu-btn');
            expect(menuBtn).not.toBeNull();
        });
    });

    describe('Accessibility (A11y)', () => {
        it('should have alt text for all important images', () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                // The favicon is a data URI and doesn't need an alt tag in this context.
                if (!img.src.startsWith('data:image/svg+xml')) {
                    expect(img.getAttribute('alt')).toBeTruthy();
                }
            });
        });

        it('should have aria-labels for icon-only buttons', () => {
            const themeToggle = document.querySelector('#theme-toggle');
            expect(themeToggle.getAttribute('aria-label')).toBe('Changer de thème');

            const scrollArrows = document.querySelectorAll('a.scroll-arrow, a.down-arrow-bounce');
            scrollArrows.forEach(arrow => {
                expect(arrow.getAttribute('aria-label')).toBeTruthy();
            });
        });

        it('should use semantic HTML for page structure', () => {
            expect(document.querySelector('main')).not.toBeNull();
            expect(document.querySelector('footer')).not.toBeNull();
            expect(document.querySelector('nav')).not.toBeNull();
        });

        it('should have labels for all form inputs (even if visually hidden)', () => {
            const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
            inputs.forEach(input => {
                const label = document.querySelector(`label[for="${input.id}"]`);
                expect(label).not.toBeNull(`Input with id #${input.id} should have a corresponding label.`);
            });
        });
    });

    describe('Interactive Elements', () => {
        it('should have an "Exporter CV" button', () => {
            const exportBtn = document.querySelector('#bouton-telecharger-cv');
            expect(exportBtn).not.toBeNull();
            expect(exportBtn.textContent).toContain('Exporter CV');
        });

        it('should have a contact form with a submit button', () => {
            const form = document.querySelector('#contact-form');
            expect(form).not.toBeNull();
            const submitButton = form.querySelector('button[type="submit"]');
            expect(submitButton).not.toBeNull();
        });

        it('should have a PDF options modal dialog', () => {
            const modal = document.querySelector('#pdf-options-modal');
            expect(modal).not.toBeNull();
            expect(modal.tagName).toBe('DIALOG');
        });
    });
});