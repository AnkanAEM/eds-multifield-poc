import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoLinkRow, contactLinkRow, ...itemRows] = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.classList.add('cmp-navigation-wrapper');
  wrapper.setAttribute('role', 'banner');
  wrapper.setAttribute('aria-label', 'navigation.header.aria.label');

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('cmp-navigation-wrapper__logo');
  const logoLink = logoLinkRow.querySelector('a');
  if (logoLink) {
    const newLogoLink = document.createElement('a');
    moveInstrumentation(logoLinkRow.firstElementChild, newLogoLink);
    newLogoLink.href = logoLink.href;
    newLogoLink.setAttribute('aria-label', 'Qiddiya - Go to homepage');
    newLogoLink.setAttribute('target', '_self');

    const logoSpan = document.createElement('span');
    logoSpan.classList.add('qd-icon', 'qd-icon--logo', 'qd-logo');
    for (let i = 1; i <= 25; i += 1) {
      const pathSpan = document.createElement('span');
      pathSpan.classList.add(`path${i}`);
      logoSpan.append(pathSpan);
    }
    newLogoLink.append(logoSpan);
    logoDiv.append(newLogoLink);
  }

  // Contact Us CTA and Hamburger
  const contactCtaDiv = document.createElement('div');
  contactCtaDiv.classList.add('cmp-navigation-wrapper__contactUs-cta');

  const contactLink = contactLinkRow.querySelector('a');
  if (contactLink) {
    const newContactLink = document.createElement('a');
    moveInstrumentation(contactLinkRow.firstElementChild, newContactLink);
    newContactLink.href = contactLink.href;
    newContactLink.classList.add('cta', 'cmp-navigation--content__cta'); // Corrected 'cta__' to 'cta'
    newContactLink.setAttribute('target', '_self');
    newContactLink.setAttribute('aria-label', 'Contact Us');

    const ctaIcon = document.createElement('span');
    ctaIcon.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    newContactLink.append(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.classList.add('cta__label');
    ctaLabel.textContent = contactLink.textContent;
    newContactLink.append(ctaLabel);
    contactCtaDiv.append(newContactLink);
  }

  const navToggleDiv = document.createElement('div');
  navToggleDiv.classList.add('cmp-navigation-wrapper__icon');
  navToggleDiv.id = 'navigation-toggle';
  const hamburgerEllipse = document.createElement('div');
  hamburgerEllipse.classList.add('hamburger-ellipse');
  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.classList.add('hamburger-icon', 'qd-icon', 'qd-icon--hamburger');
  const closeIcon = document.createElement('span');
  closeIcon.classList.add('close-icon', 'qd-icon', 'qd-icon--cancel');
  hamburgerEllipse.append(hamburgerIcon, closeIcon);
  navToggleDiv.append(hamburgerEllipse);
  contactCtaDiv.append(navToggleDiv);

  logoDiv.append(contactCtaDiv);
  wrapper.append(logoDiv);

  // Desktop Navbar
  const desktopNav = document.createElement('nav');
  desktopNav.classList.add('cmp-navigation-wrapper__navbar');
  desktopNav.id = 'navbar-desktop';
  desktopNav.setAttribute('role', 'navigation');
  desktopNav.setAttribute('aria-label', 'navigation.main.aria.label');

  const desktopNavList = document.createElement('ul');
  desktopNavList.classList.add('cmp-navigation-wrapper__navbar-list');
  desktopNav.append(desktopNavList);

  // Mobile Navbar
  const mobileNav = document.createElement('nav');
  mobileNav.classList.add('cmp-navigation-wrapper__mobilenavbar');
  mobileNav.id = 'navbar-mobile';
  mobileNav.setAttribute('role', 'navigation');
  mobileNav.setAttribute('aria-label', 'navigation.main.aria.label');

  const mobileNavList = document.createElement('ul');
  mobileNavList.classList.add('cmp-navigation-wrapper__mobilenavbar-list');
  mobileNav.append(mobileNavList);

  // Separate nav-item and language-option rows
  const navItems = itemRows.filter((row) => row.children.length === 2 && !row.querySelector('div:first-child').textContent.toLowerCase().includes('language'));
  const languageOptions = itemRows.filter((row) => row.children.length === 2 && row.querySelector('div:first-child').textContent.toLowerCase().includes('language'));

  navItems.forEach((row) => {
    const labelCell = row.firstElementChild;
    const linkCell = row.lastElementChild;

    const label = labelCell.textContent;
    const link = linkCell.querySelector('a');

    // Desktop Nav Item
    const desktopLi = document.createElement('li');
    moveInstrumentation(row, desktopLi);
    desktopLi.classList.add('cmp-navigation-wrapper__navbar-menu');
    const desktopLink = document.createElement('a');
    desktopLink.classList.add('cmp-navigation-wrapper__navbar-menulink');
    desktopLink.setAttribute('aria-haspopup', 'true');
    desktopLink.setAttribute('aria-expanded', 'false');
    desktopLink.setAttribute('target', '_self');
    if (link) desktopLink.href = link.href;
    const spanLabel = document.createElement('span');
    spanLabel.textContent = label;
    desktopLink.append(spanLabel);
    const iconWrapper = document.createElement('span');
    iconWrapper.classList.add('qd-icon-wrapper');
    const menuIcon = document.createElement('span');
    menuIcon.classList.add('menu-icon', 'qd-icon', 'qd-icon--cheveron-down');
    iconWrapper.append(menuIcon);
    desktopLink.append(iconWrapper);
    desktopLi.append(desktopLink);
    desktopNavList.append(desktopLi);

    // Mobile Nav Item
    const mobileLi = document.createElement('li');
    moveInstrumentation(row, mobileLi);
    mobileLi.classList.add('cmp-navigation-wrapper__mobilenavbar-menu', 'border');
    const mobileLink = document.createElement('a');
    mobileLink.classList.add('cmp-navigation-wrapper__mobilenavbar-menulink');
    const mobileSpanLabel = document.createElement('span');
    mobileSpanLabel.textContent = label;
    mobileLink.append(mobileSpanLabel);
    const mobileIcon = document.createElement('span');
    mobileIcon.classList.add('qd-icon', 'qd-icon--cheveron-right', 'cmp-navigation-wrapper__mobilenavbar-menulink-icon');
    mobileLink.append(mobileIcon);
    mobileLi.append(mobileLink);
    mobileNavList.append(mobileLi);

    // Add event listeners for dropdowns (desktop and mobile)
    const desktopSubmenu = document.createElement('ul');
    desktopSubmenu.classList.add('cmp-navigation-wrapper__navbar-submenu');
    desktopLi.append(desktopSubmenu);

    const mobileSubmenu = document.createElement('ul');
    mobileSubmenu.classList.add('cmp-navigation-wrapper__mobilenavbar-submenu');
    const mobileSubmenuHeader = document.createElement('li');
    mobileSubmenuHeader.classList.add('cmp-navigation-wrapper__mobilenavbar-menuheader');
    const mobileSubmenuHeaderLink = document.createElement('a');
    const mobileSubmenuHeaderSpan = document.createElement('span');
    mobileSubmenuHeaderSpan.textContent = label;
    mobileSubmenuHeaderLink.append(mobileSubmenuHeaderSpan);
    mobileSubmenuHeader.append(mobileSubmenuHeaderLink);
    mobileSubmenu.append(mobileSubmenuHeader);
    mobileLi.append(mobileSubmenu);

    // For now, submenus are empty as the model doesn't support nested navigation.
    // If the model changes to support nested items, this logic will need to be updated.
    // The original HTML shows nested items, so we should at least create placeholder structure.
    // For demonstration, let's add a dummy sub-item to match the HTML structure.
    // In a real scenario, this would be populated from the model.
    const dummyDesktopSubItem = document.createElement('li');
    dummyDesktopSubItem.classList.add('cmp-navigation-wrapper__navbar-submenu'); // Added class
    const dummyDesktopSubLink = document.createElement('a');
    dummyDesktopSubLink.setAttribute('aria-expanded', 'false');
    dummyDesktopSubLink.setAttribute('target', '_self');
    dummyDesktopSubLink.href = link ? link.href : '#';
    const dummyDesktopSubSpan = document.createElement('span');
    dummyDesktopSubSpan.textContent = `${label} Subitem`;
    dummyDesktopSubLink.append(dummyDesktopSubSpan);
    dummyDesktopSubItem.append(dummyDesktopSubLink);
    desktopSubmenu.append(dummyDesktopSubItem);

    const dummyMobileSubItem = document.createElement('li');
    dummyMobileSubItem.classList.add('cmp-navigation-wrapper__mobilenavbar-menu'); // Added class
    const dummyMobileSubLink = document.createElement('a');
    dummyMobileSubLink.classList.add('cmp-navigation-wrapper__mobilenavbar-menulink'); // Added class
    dummyMobileSubLink.setAttribute('target', '_self');
    dummyMobileSubLink.href = link ? link.href : '#';
    const dummyMobileSubSpan = document.createElement('span');
    dummyMobileSubSpan.textContent = `${label} Subitem`;
    dummyMobileSubLink.append(dummyMobileSubSpan);
    dummyMobileSubItem.append(dummyMobileSubLink);
    mobileSubmenu.append(dummyMobileSubItem);


    desktopLink.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = desktopLink.getAttribute('aria-expanded') === 'true';
      desktopLink.setAttribute('aria-expanded', !isExpanded);
      desktopSubmenu.classList.toggle('show'); // Assuming 'show' class reveals submenu
    });

    mobileLink.addEventListener('click', (e) => {
      e.preventDefault();
      mobileNavList.classList.add('hide');
      mobileSubmenu.classList.add('show');
    });

    mobileSubmenuHeaderLink.addEventListener('click', (e) => {
      e.preventDefault();
      mobileSubmenu.classList.remove('show');
      mobileNavList.classList.remove('hide');
    });
  });

  // Language Selector
  const languageSelectorDesktop = document.createElement('div');
  languageSelectorDesktop.classList.add('language-selector', 'header-lang-css-from-wrapper');
  languageSelectorDesktop.style.visibility = 'visible';
  const languageUlDesktop = document.createElement('ul');
  languageUlDesktop.classList.add('cmp-language-selector');

  const languageSelectorMobile = document.createElement('div');
  languageSelectorMobile.classList.add('language-selector', 'header-lang-css-from-wrapper');
  languageSelectorMobile.style.visibility = 'visible';
  const languageUlMobile = document.createElement('ul');
  languageUlMobile.classList.add('cmp-language-selector');

  languageOptions.forEach((row, index) => {
    const langCell = row.firstElementChild;
    const linkCell = row.lastElementChild;

    const language = langCell.textContent;
    const link = linkCell.querySelector('a');

    // Desktop
    const liDesktop = document.createElement('li');
    moveInstrumentation(row, liDesktop);
    if (index === 0) liDesktop.classList.add('active');
    const aDesktop = document.createElement('a');
    aDesktop.href = link ? link.href : '#';
    aDesktop.setAttribute('aria-label', language);
    aDesktop.classList.add('cmp-language-selector__link');
    aDesktop.setAttribute('data-lang', language.substring(0, 2).toLowerCase()); // Assuming first two chars for data-lang
    aDesktop.textContent = language;
    liDesktop.append(aDesktop);
    languageUlDesktop.append(liDesktop);

    // Mobile
    const liMobile = document.createElement('li');
    moveInstrumentation(row, liMobile);
    if (index === 0) liMobile.classList.add('active');
    const aMobile = document.createElement('a');
    aMobile.href = link ? link.href : '#';
    aMobile.setAttribute('aria-label', language);
    aMobile.classList.add('cmp-language-selector__link');
    aMobile.setAttribute('data-lang', language.substring(0, 2).toLowerCase());
    aMobile.textContent = language;
    liMobile.append(aMobile);
    languageUlMobile.append(liMobile);
  });

  languageSelectorDesktop.append(languageUlDesktop);
  desktopNav.append(languageSelectorDesktop);

  languageSelectorMobile.append(languageUlMobile);
  mobileNav.append(languageSelectorMobile);

  wrapper.append(desktopNav, mobileNav);

  // Mobile nav back button
  const mobileNavBack = document.createElement('div');
  mobileNavBack.classList.add('cmp-navigation-wrapper__mobilenavbar-back', 'nav-back');
  const backLink = document.createElement('a');
  backLink.classList.add('cmp-navigation-wrapper__icon');
  const backIcon = document.createElement('span');
  backIcon.classList.add('back-icon', 'qd-icon', 'qd-icon--cheveron-left');
  backLink.append(backIcon);
  const backLabel = document.createElement('span');
  backLabel.classList.add('cmp-navigation-wrapper__iconlabel');
  backLabel.textContent = 'Back';
  mobileNavBack.append(backLink, backLabel);
  mobileNav.append(mobileNavBack);

  // Toggle functionality for mobile nav
  navToggleDiv.addEventListener('click', () => {
    wrapper.classList.toggle('active');
    mobileNav.classList.toggle('show');
    document.body.classList.toggle('disable-scroll'); // Assuming a class to disable body scroll
  });

  backLink.addEventListener('click', () => {
    mobileNav.classList.remove('show');
    wrapper.classList.remove('active');
    document.body.classList.remove('disable-scroll');
    mobileNavList.classList.remove('hide');
    [...mobileNavList.children].forEach((li) => {
      const submenu = li.querySelector('.cmp-navigation-wrapper__mobilenavbar-submenu');
      if (submenu) submenu.classList.remove('show');
    });
  });

  block.textContent = '';
  block.append(wrapper);
}
