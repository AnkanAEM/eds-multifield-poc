import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root model fields as per BlockJson
  const [socialLinksContainer, navigationLinksContainer, languageLinksContainer, policyLinksContainer, copyrightRow] = [...block.children];

  // Create main footer wrapper
  const cmpFooterWrapper = document.createElement('div');
  cmpFooterWrapper.classList.add('cmp-footer__wrapper');

  // --- Navigation Section ---
  const navigationDiv = document.createElement('div');
  navigationDiv.classList.add('navigation', 'footer-nav-css-from-wrapper');

  const cmpNavigationWrapper = document.createElement('div');
  cmpNavigationWrapper.classList.add('cmp-navigation__wrapper');

  // Logo
  const cmpNavigationLogo = document.createElement('div');
  cmpNavigationLogo.classList.add('cmp-navigation__logo');
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.target = '_self';
  logoLink.setAttribute('aria-label', 'Qiddiya - Go to homepage');
  const logoSpan = document.createElement('span');
  logoSpan.classList.add('qd-icon', 'qd-icon--logo', 'qd-logo-footer');
  for (let i = 1; i <= 25; i += 1) {
    const pathSpan = document.createElement('span');
    pathSpan.classList.add(`path${i}`);
    logoSpan.append(pathSpan);
  }
  logoLink.append(logoSpan);
  cmpNavigationLogo.append(logoLink);
  cmpNavigationWrapper.append(cmpNavigationLogo);

  const cmpNavigationContent = document.createElement('div');
  cmpNavigationContent.classList.add('cmp-navigation__content');

  // Social Links
  const socialLinksDiv = document.createElement('div');
  socialLinksDiv.classList.add('socialLinks', 'social-links', 'footer-social-css-from-wrapper');
  const socialLinksList = document.createElement('ul');
  socialLinksList.classList.add('cmp-social-links__list');

  // Social links are children of the socialLinksContainer
  const socialLinkItems = [...socialLinksContainer.children];
  socialLinkItems.forEach((row) => {
    // A social-link item has 3 cells: URL (a), Icon (text), Aria Label (text)
    if (row.children.length === 3) {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.classList.add('cmp-social-links__item');

      const urlCell = row.children[0];
      const iconCell = row.children[1];
      const ariaLabelCell = row.children[2];

      const linkEl = urlCell.querySelector('a');

      if (linkEl && iconCell && ariaLabelCell) {
        const a = document.createElement('a');
        a.classList.add('cmp-social-links__icon', `qd-icon`, `qd-icon--${iconCell.textContent.trim().toLowerCase()}`);
        a.target = '_blank';
        a.href = linkEl.href;
        a.setAttribute('aria-label', ariaLabelCell.textContent.trim());
        li.append(a);
      }
      socialLinksList.append(li);
    }
  });
  socialLinksDiv.append(socialLinksList);
  cmpNavigationContent.append(socialLinksDiv);

  // Navigation Links
  const navigationLinksList = document.createElement('ul');
  navigationLinksList.classList.add('cmp-navigation__links');

  // Navigation links are children of the navigationLinksContainer
  const navigationLinkItems = [...navigationLinksContainer.children];
  navigationLinksItems.forEach((row) => {
    // A navigation-link item has 2 cells: URL (a), Title (text)
    if (row.children.length === 2) {
      const li = document.createElement('li');
      moveInstrumentation(row, li);

      const urlCell = row.children[0];
      const titleCell = row.children[1];

      const linkEl = urlCell.querySelector('a');

      if (linkEl && titleCell) {
        const a = document.createElement('a');
        a.classList.add('cmp-navigation__link-item');
        a.target = '_self';
        a.title = titleCell.textContent.trim();
        a.href = linkEl.href;
        a.textContent = titleCell.textContent.trim();
        li.append(a);
      }
      navigationLinksList.append(li);
    }
  });
  cmpNavigationContent.append(navigationLinksList);
  cmpNavigationWrapper.append(cmpNavigationContent);
  navigationDiv.append(cmpNavigationWrapper);
  cmpFooterWrapper.append(navigationDiv);

  // Divider
  const divider = document.createElement('div');
  divider.classList.add('cmp-footer__divider');
  cmpFooterWrapper.append(divider);

  // --- Bottom Section ---
  const cmpFooterBottom = document.createElement('div');
  cmpFooterBottom.classList.add('cmp-footer__bottom');

  // Language Selector
  const languageSelectorDiv = document.createElement('div');
  languageSelectorDiv.classList.add('language-selector', 'footer-lang-css-from-wrapper');
  const languageSelectorList = document.createElement('ul');
  languageSelectorList.classList.add('cmp-language-selector');

  // Language links are children of the languageLinksContainer
  const languageLinkItems = [...languageLinksContainer.children];
  languageLinkItems.forEach((row) => {
    // A language-link item has 4 cells: URL (a), Label (text), Language Code (text), Active (boolean)
    if (row.children.length === 4) {
      const li = document.createElement('li');
      moveInstrumentation(row, li);

      const urlCell = row.children[0];
      const labelCell = row.children[1];
      const langCodeCell = row.children[2];
      const activeCell = row.children[3];

      const linkEl = urlCell.querySelector('a');

      if (linkEl && labelCell && langCodeCell && activeCell) {
        if (activeCell.textContent.trim().toLowerCase() === 'true') {
          li.classList.add('active');
        }
        const a = document.createElement('a');
        a.href = linkEl.href;
        a.setAttribute('aria-label', labelCell.textContent.trim());
        a.classList.add('cmp-language-selector__link');
        a.setAttribute('data-lang', langCodeCell.textContent.trim());
        a.textContent = labelCell.textContent.trim();
        li.append(a);
      }
      languageSelectorList.append(li);
    }
  });
  languageSelectorDiv.append(languageSelectorList);
  cmpFooterBottom.append(languageSelectorDiv);

  // Policy Links
  const policyLinksDiv = document.createElement('div');
  policyLinksDiv.classList.add('policy-links', 'footer-policy-css-from-wrapper');
  const cmpPolicyLinksWrapper = document.createElement('div');
  cmpPolicyLinksWrapper.classList.add('cmp-policy-links__wrapper');
  const cmpPolicyLinksContent = document.createElement('div');
  cmpPolicyLinksContent.classList.add('cmp-policy-links__content');

  // Policy links are children of the policyLinksContainer
  const policyLinkItems = [...policyLinksContainer.children];
  policyLinkItems.forEach((row) => {
    // A policy-link item has 2 cells: URL (a), Title (text)
    if (row.children.length === 2) {
      const urlCell = row.children[0];
      const titleCell = row.children[1];

      const linkEl = urlCell.querySelector('a');

      if (linkEl && titleCell) {
        const a = document.createElement('a');
        a.classList.add('cmp-policy-links__item');
        a.title = titleCell.textContent.trim();
        a.href = linkEl.href;
        a.target = '_self';
        a.textContent = titleCell.textContent.trim();
        cmpPolicyLinksContent.append(a);
      }
    }
  });

  cmpPolicyLinksWrapper.append(cmpPolicyLinksContent);

  // Copyright
  const copyrightP = document.createElement('p');
  copyrightP.classList.add('cmp-policy-links__copyright');
  moveInstrumentation(copyrightRow, copyrightP);
  // The copyrightRow contains a single div, which contains the text.
  // We want to move the content of that div into the paragraph.
  if (copyrightRow.firstElementChild) {
    while (copyrightRow.firstElementChild.firstChild) {
      copyrightP.append(copyrightRow.firstElementChild.firstChild);
    }
  }
  cmpPolicyLinksWrapper.append(copyrightP);

  policyLinksDiv.append(cmpPolicyLinksWrapper);
  cmpFooterBottom.append(policyLinksDiv);
  cmpFooterWrapper.append(cmpFooterBottom);

  block.textContent = '';
  block.append(cmpFooterWrapper);
}
