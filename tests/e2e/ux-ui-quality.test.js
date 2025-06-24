const { test, expect } = require('@playwright/test');

const sections = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'a-propos', label: 'À Propos' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'competences', label: 'Compétences' },
  { id: 'formation', label: 'Formation' },
  { id: 'divers', label: 'Langues & Engagements' },
  { id: 'contact', label: 'Contact' },
];

async function checkSectionUXUI(page, section, theme) {
  // Clique sur le lien du menu
  await page.click(`a[href="#${section.id}"]`);
  await page.waitForTimeout(400);
  const sectionEl = await page.$(`#${section.id}`);
  expect(sectionEl, `Section ${section.label} présente`).not.toBeNull();
  // Vérifie la visibilité du titre (h2 ou h1 dans la section)
  const title = await sectionEl.$('h1, h2, h3');
  expect(title, `Titre présent dans ${section.label}`).not.toBeNull();
  const visible = await title.isVisible();
  expect(visible, `Titre visible dans ${section.label}`).toBeTruthy();
  // Vérifie l'alignement (centré ou à gauche)
  const align = await title.evaluate(el => getComputedStyle(el).textAlign);
  expect(['center', 'left', 'start']).toContain(align);
  // Vérifie la couleur du texte (lisibilité)
  const color = await title.evaluate(el => getComputedStyle(el).color);
  // On vérifie que ce n'est pas trop clair (pas du #fff sur fond clair)
  const rgb = color.match(/\d+/g).map(Number);
  const luminance = (0.299*rgb[0] + 0.587*rgb[1] + 0.114*rgb[2]);
  if (theme === 'light') expect(luminance).toBeLessThan(245);
  if (theme === 'dark') expect(luminance).toBeGreaterThan(120);
  // Vérifie l'espacement autour du titre
  const marginTop = await title.evaluate(el => parseFloat(getComputedStyle(el).marginTop));
  const marginBottom = await title.evaluate(el => parseFloat(getComputedStyle(el).marginBottom));
  expect(marginTop).toBeGreaterThan(5);
  expect(marginBottom).toBeGreaterThan(5);
  // Vérifie l'absence de scroll horizontal
  const scrollX = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(scrollX, 'Pas de scroll horizontal').toBeFalsy();
}

test.describe('Qualité UX/UI souple sur toutes les sections', () => {
  test('Vérifie chaque section en mode clair', async ({ page }) => {
    await page.goto('http://localhost:8000/');
    for (const section of sections) {
      await checkSectionUXUI(page, section, 'light');
    }
  });

  test('Vérifie chaque section en mode sombre', async ({ page }) => {
    await page.goto('http://localhost:8000/');
    // Active le dark mode via le bouton
    const themeBtn = await page.$('#theme-toggle');
    if (themeBtn) await themeBtn.click();
    await page.waitForTimeout(300);
    for (const section of sections) {
      await checkSectionUXUI(page, section, 'dark');
    }
  });
}); 