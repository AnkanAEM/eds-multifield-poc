import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const allRows = [...block.children];

  const navbarArena = document.createElement('div');
  navbarArena.classList.add('navbar', 'navbar-arena', 'g-container');

  const navHamburger = document.createElement('div');
  navHamburger.classList.add('nav-hamburger');
  const hamburgerButton = document.createElement('button');
  hamburgerButton.setAttribute('type', 'button');
  hamburgerButton.setAttribute('aria-controls', 'nav');
  hamburgerButton.setAttribute('aria-label', 'Open navigation');
  hamburgerButton.setAttribute('aria-expanded', 'false');
  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.classList.add('nav-hamburger-icon');
  hamburgerButton.append(hamburgerIcon);
  navHamburger.append(hamburgerButton);
  navbarArena.append(navHamburger);

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('logo-wrapper');
  const logoBlock = document.createElement('div');
  logoBlock.classList.add('logo', 'block');
  const logoSpan = document.createElement('span');
  logoSpan.classList.add('arena');
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo__picture');
  logoLink.href = '/'; // Default href, will be updated if a logo link is found in content
  const logoPicture = document.createElement('picture');
  const logoImg = document.createElement('img');
  logoImg.alt = 'Arena Logo';
  logoImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775472078091.svg+xml'; // Default src
  logoPicture.append(logoImg);
  logoLink.append(logoPicture);
  logoSpan.append(logoLink);
  logoBlock.append(logoSpan);
  logoWrapper.append(logoBlock);
  navbarArena.append(logoWrapper);

  const linksContainer = document.createElement('div');
  linksContainer.classList.add('links');
  navbarArena.append(linksContainer);

  const rightSection = document.createElement('div');
  rightSection.classList.add('right');
  rightSection.id = 'nav-right';

  const contactWrapper = document.createElement('div');
  contactWrapper.classList.add('contact-wrapper');
  const contactBlock = document.createElement('div');
  contactBlock.classList.add('contact', 'block');
  const contactWrpArena = document.createElement('div');
  contactWrpArena.classList.add('contact_wrp_arena', 'user__contact', 'header');

  const contactTitle = document.createElement('h4');
  contactTitle.classList.add('user__contact-title');
  contactTitle.textContent = 'Contact Us';
  const contactIconPhone = document.createElement('span');
  contactIconPhone.classList.add('user__contact-title', 'icon-phone');
  contactIconPhone.setAttribute('aria-label', 'Contact Us');
  contactWrpArena.append(contactTitle, contactIconPhone);

  // Add event listener for the contact icon to toggle the contact details
  contactIconPhone.addEventListener('click', () => {
    contactBlock.querySelector('.user__contact__icons').classList.toggle('hidden');
    contactBlock.querySelector('.contact-toggle-box').classList.toggle('hidden');
  });

  const contactIcons = document.createElement('div');
  contactIcons.classList.add('user__contact__icons', 'hidden');

  const phoneLink = document.createElement('a');
  phoneLink.href = '#';
  phoneLink.classList.add('user__contact--icon', 'phone');
  phoneLink.addEventListener('click', (e) => {
    e.preventDefault();
    contactBlock.querySelector('.contact-toggle-box').classList.toggle('hidden');
  });
  const phoneSrOnly = document.createElement('span');
  phoneSrOnly.classList.add('sr-only');
  phoneSrOnly.textContent = 'phone';
  const phoneImg = document.createElement('img');
  phoneImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775472078035.svg+xml';
  phoneImg.alt = 'phone';
  phoneImg.loading = 'lazy';
  phoneLink.append(phoneSrOnly, phoneImg);
  contactIcons.append(phoneLink);

  const whatsappLink = document.createElement('a');
  whatsappLink.href = 'https://wa.me/919289311487?text=Hi';
  whatsappLink.target = '_blank';
  whatsappLink.classList.add('user__contact--icon', 'whatsapp');
  whatsappLink.setAttribute('rel', 'noopener noreferrer');
  const whatsappSrOnly = document.createElement('span');
whatsappSrOnly.classList.add('sr-only');
  whatsappSrOnly.textContent = 'whatsapp';
  const whatsappImg = document.createElement('img');
  whatsappImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775472077963.svg+xml';
  whatsappImg.alt = 'whatsapp';
  whatsappImg.loading = 'lazy';
  whatsappLink.append(whatsappSrOnly, whatsappImg);
  contactIcons.append(whatsappLink);

  const emailLink = document.createElement('a');
  emailLink.href = 'mailto:contact@maruti.co.in';
  emailLink.classList.add('user__contact--icon', 'email');
  const emailSrOnly = document.createElement('span');
  emailSrOnly.classList.add('sr-only');
  emailSrOnly.textContent = 'email';
  const emailImg = document.createElement('img');
  emailImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775472077984.svg+xml';
  emailImg.alt = 'email';
  emailImg.loading = 'lazy';
  emailLink.append(emailSrOnly, emailImg);
  contactIcons.append(emailLink);
  contactWrpArena.append(contactIcons);

  const contactToggleBox = document.createElement('div');
  contactToggleBox.classList.add('hidden', 'contact-toggle-box');
  const callContainer = document.createElement('div');
  callContainer.classList.add('user__contact__icon-call_container');
  const primaryTel = document.createElement('a');
  primaryTel.href = 'tel:1800 102 1800';
  primaryTel.classList.add('primary-telephone');
  primaryTel.textContent = '1800 102 1800';
  const secondaryTel = document.createElement('a');
  secondaryTel.href = 'tel:';
  secondaryTel.classList.add('secondary-telephone');
  callContainer.append(primaryTel, secondaryTel);
  contactToggleBox.append(callContainer);
  contactWrpArena.append(contactToggleBox);
  contactBlock.append(contactWrpArena);
  contactWrapper.append(contactBlock);
  rightSection.append(contactWrapper);

  const languageDiv = document.createElement('div');
  languageDiv.classList.add('language');
  languageDiv.textContent = 'EN';
  rightSection.append(languageDiv);

  const signInWrapper = document.createElement('div');
  signInWrapper.classList.add('sign-in-wrapper', 'hidden');
  const signInBlock = document.createElement('div');
  signInBlock.classList.add('sign-in', 'block');
  const userDropdown = document.createElement('div');
  userDropdown.classList.add('user__dropdown');
  const userAccount = document.createElement('div');
  userAccount.classList.add('user__account');

  const reachUsLink = document.createElement('a');
  reachUsLink.href = 'https://www.marutisuzuki.com/corporate/reach-us';
  reachUsLink.classList.add('user__account--link', 'reach', 'us');
  reachUsLink.target = '_self';
  const reachUsIconSpan = document.createElement('span');
  reachUsIconSpan.classList.add('user__account__list-icon');
  const reachUsImg = document.createElement('img');
  reachUsImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775472078004.svg+xml';
  reachUsImg.loading = 'lazy';
  reachUsImg.alt = 'Reach Us';
  reachUsIconSpan.append(reachUsImg);
  reachUsLink.append(reachUsIconSpan, 'Reach Us');
  userAccount.append(reachUsLink);

  const profileLink = document.createElement('a');
  profileLink.href = 'https://www.marutisuzuki.com/user';
  profileLink.classList.add('user__account--link', 'profile');
  profileLink.target = '_self';
  const profileIconSpan = document.createElement('span');
  profileIconSpan.classList.add('user__account__list-icon');
  const profileImg = document.createElement('img');
  profileImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775472078201.svg+xml';
  profileImg.loading = 'lazy';
  profileImg.alt = 'Profile';
  profileIconSpan.append(profileImg);
  profileLink.append(profileIconSpan, 'Profile');
  userAccount.append(profileLink);

  const signInBtnDiv = document.createElement('div');
  signInBtnDiv.classList.add('user__account--link', 'sign-in-btn');
  const signInIconSpan = document.createElement('span');
  signInIconSpan.classList.add('user__account__list-icon');
  const signInImg = document.createElement('img');
  signInImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775472078430.svg+xml';
  signInImg.loading = 'lazy';
  signInImg.alt = 'Sign-in';
  signInIconSpan.append(signInImg);
  const signInButton = document.createElement('button');
  signInButton.setAttribute('type', 'button');
  signInButton.setAttribute('data-sign-out-text', 'Sign Out');
  signInButton.textContent = 'Sign In';
  signInBtnDiv.append(signInIconSpan, signInButton);
  userAccount.append(signInBtnDiv);

  userDropdown.append(userAccount);
  signInBlock.append(userDropdown);
  signInWrapper.append(signInBlock);
  rightSection.append(signInWrapper);
  navbarArena.append(rightSection);

  const menu = document.createElement('div');
  menu.id = 'menu';
  menu.classList.add('menu', 'hidden', 'menu-arena');

  const menuHeader = document.createElement('div');
  menuHeader.classList.add('menu-header');
  const backArrow = document.createElement('div');
  backArrow.classList.add('back-arrow');
  const menuTitle = document.createElement('span');
  menuTitle.classList.add('menu-title');
  menuTitle.textContent = 'Menu';
  const closeIcon = document.createElement('span');
  closeIcon.classList.add('close-icon');
  menuHeader.append(backArrow, menuTitle, closeIcon);
  menu.append(menuHeader);

  const menuList = document.createElement('ul');
  menuList.classList.add('menu-list');
  menu.append(menuList);

  let linkIndex = 0;

  allRows.forEach((row) => {
    // Determine item type based on cell count and content
    const cells = [...row.children];
    if (cells.length === 1 && cells[0].querySelector('div')) {
      // This is a 'link-column' item (container of links)
      const linkColumnCell = cells[0];
      const linkGridColumn = document.createElement('div');
      linkGridColumn.classList.add('link-grid-column', 'link-column-vertical');
      moveInstrumentation(row, linkGridColumn);

      const ul = document.createElement('ul');
      ul.classList.add('content', 'links-container', 'accordian-content');
      linkGridColumn.append(ul);

      // Assuming the content of linkColumnCell is a list of links
      const links = linkColumnCell.querySelectorAll('a');
      links.forEach((link) => {
        const li = document.createElement('li');
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        if (link.target) newLink.target = link.target;
        if (link.rel) newLink.rel = link.rel;
        li.append(newLink);
        ul.append(li);
      });

      // These link-column items are typically for desktop panels or sub-menus.
      // For this block, they are part of the 'Corporate', 'Sales', 'More From us' sections.
      // The current JS doesn't have a clear mapping for these, so we'll append them
      // to a temporary container for now, similar to the original.
      // A more complete implementation would involve creating the desktop panels and
      // associating these link-columns with them.
      const tempContainer = document.createElement('div'); // Placeholder
      tempContainer.append(linkGridColumn);
      // linksContainer.append(linkGridColumn); // This is a placeholder, actual placement depends on the link-grid structure
    } else if (cells.length === 2) {
      // This is a 'link' item
      const hrefCell = cells[0];
      const textCell = cells[1];

      const link = hrefCell.querySelector('a');
      const linkText = textCell.textContent.trim();

      if (link) {
        const linkTitle = document.createElement('div');
        linkTitle.classList.add('link-title');
        moveInstrumentation(row, linkTitle);

        const span = document.createElement('span');
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = linkText; // Use text from textCell
        if (link.title) newLink.title = link.title;
        if (link.classList.contains('button')) newLink.classList.add('button');
        if (link.classList.contains('logo__picture')) newLink.classList.add('logo__picture');

        // Handle image inside link for "Maruti Engage"
        const picture = link.querySelector('picture');
        if (picture) {
          const newPicture = document.createElement('picture');
          const source = picture.querySelector('source');
          const img = picture.querySelector('img');
          if (source) {
            const newSource = document.createElement('source');
            newSource.media = source.media;
            newSource.srcset = source.srcset;
            newSource.height = source.height;
            newSource.width = source.width;
            newPicture.append(newSource);
          }
          if (img) {
            const newImg = document.createElement('img');
            newImg.alt = img.alt;
            newImg.src = img.src;
            newImg.height = img.height;
            newImg.width = img.width;
            newPicture.append(newImg);
          }
          newLink.textContent = ''; // Clear text content if an image is present
          newLink.append(newPicture);
        }

        span.append(newLink);
        linkTitle.append(span);
        linksContainer.append(linkTitle);

        // Also add to mobile menu
        const li = document.createElement('li');
        li.id = `menu-item-${linkIndex}`;
        li.classList.add('nav-link');
        if (link.title) {
          li.classList.add(...link.title.toLowerCase().split(' ').filter(Boolean));
        } else if (linkText) {
          li.classList.add(...linkText.toLowerCase().split(' ').filter(Boolean));
        }
        
        // Check if this link should be an accordion based on original HTML
        // The original HTML shows "Corporate", "Sales", "More From us" as accordions
        const accordionTitles = ['Corporate', 'Sales', 'More From us'];
        if (accordionTitles.includes(linkText)) {
          li.classList.add('accordion');
        }

        const menuLinkSpan = document.createElement('span');
        menuLinkSpan.classList.add('menu-title');
        const menuLink = document.createElement('a');
        menuLink.href = link.href;
        menuLink.textContent = linkText;
        if (link.title) menuLink.title = link.title;
        if (link.classList.contains('button')) menuLink.classList.add('button');
        if (link.classList.contains('logo__picture')) menuLink.classList.add('logo__picture');

        // Handle image inside link for "Maruti Engage" in menu
        if (picture) {
          const newPicture = document.createElement('picture');
          const source = picture.querySelector('source');
          const img = picture.querySelector('img');
          if (source) {
            const newSource = document.createElement('source');
            newSource.media = source.media;
            newSource.srcset = source.srcset;
            newSource.height = source.height;
            newSource.width = source.width;
            newPicture.append(newSource);
          }
          if (img) {
            const newImg = document.createElement('img');
            newImg.alt = img.alt;
            newImg.src = img.src;
            newImg.height = img.height;
            newImg.width = img.width;
            newPicture.append(newImg);
          }
          menuLink.textContent = ''; // Clear text content if an image is present
          menuLink.append(newPicture);
        }

        menuLinkSpan.append(menuLink);
        li.append(menuLinkSpan);
        menuList.append(li);
        linkIndex++;
      }
    }
  });

  // Re-append the contact, language, and sign-in to the menu for mobile
  // Note: Cloning to avoid moving the original elements from the rightSection
  const contactListItem = document.createElement('li');
  moveInstrumentation(contactWrapper, contactListItem);
  contactListItem.append(contactWrpArena.cloneNode(true));
  menuList.append(contactListItem);

  const signInListItem = document.createElement('li');
  moveInstrumentation(signInWrapper, signInListItem);
  signInListItem.append(signInBlock.cloneNode(true));
  menuList.append(signInListItem);

  block.textContent = '';
  block.append(navbarArena, menu);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Hamburger menu toggle logic
  hamburgerButton.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    hamburgerButton.setAttribute('aria-expanded', menu.classList.contains('hidden') ? 'false' : 'true');
  });

  closeIcon.addEventListener('click', () => {
    menu.classList.add('hidden');
    hamburgerButton.setAttribute('aria-expanded', 'false');
  });

  // Accordion logic for menu items (based on the original HTML structure)
  menuList.querySelectorAll('li.accordion').forEach((accordionItem) => {
    accordionItem.addEventListener('click', () => {
      accordionItem.classList.toggle('active');
      // The panel is expected to be the *next sibling* in the original HTML structure.
      // In the generated JS, we are not creating these panels yet, so this part
      // will need to be expanded if the panels are dynamically generated.
      // For now, this listener will target a hypothetical next sibling with class 'panel'.
      const panel = accordionItem.nextElementSibling;
      if (panel && panel.classList.contains('panel')) {
        panel.classList.toggle('hidden');
      }
    });
  });

  // Sign-in button logic
  const signInButtons = block.querySelectorAll('.sign-in-btn button');
  signInButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Implement sign-in/sign-out logic here
      // For now, just toggle text for demonstration
      const currentText = btn.textContent;
      const signOutText = btn.getAttribute('data-sign-out-text');
      btn.textContent = currentText === 'Sign In' ? signOutText : 'Sign In';
    });
  });
}
