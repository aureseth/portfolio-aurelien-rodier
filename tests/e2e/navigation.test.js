const { test, expect } = require('@playwright/test');

test.describe('Navigation principale', () => {
  const sections = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'a-propos', label: 'À Propos' },
    { id: 'parcours', label: 'Parcours' },
    { id: 'competences', label: 'Compétences' },
    { id: 'formation', label: 'Formation' },
    { id: 'divers', label: 'Langues & Engagements' },
    { id: 'contact', label: 'Contact' },
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8000/');
  });

  for (const section of sections) {
    test(`Le menu permet d'accéder à la section ${section.label}`, async ({ page }) => {
      // Clique sur le lien du menu
      await page.click(`a[href="#${section.id}"]`);
      // Vérifie que le titre de la section est visible dans le viewport
      const sectionEl = await page.$(`#${section.id}`);
      expect(sectionEl).not.toBeNull();
      const box = await sectionEl.boundingBox();
      expect(box).not.toBeNull();
      // Optionnel : attendre l'animation de scroll
      await page.waitForTimeout(400);
      // Vérifie que le titre de section est visible à l'écran
      const visible = await sectionEl.isVisible();
      expect(visible).toBeTruthy();
    });
  }
}); 