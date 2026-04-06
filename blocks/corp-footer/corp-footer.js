import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure the first three known container rows, then collect the rest as itemRows
  const [linkColumnsContainer, contactsContainer, footerContentContainer, ...itemRows] = [...block.children];

  // Main footer wrapper
  block.classList.add('footer-wrapper', 'footer', 'g-container');
  const mainRow = document.createElement('div');
  mainRow.classList.add('row', 'footer__columns', 'footer__columns--collapsed', 'footer__link-grid-container');
  block.append(mainRow);

  // Link Columns
  // A link-column item has 2 cells: a heading (text) and links (container of links).
  // It should not contain a picture directly in the first cell, and the second cell should contain 'a' tags.
  const linkColumnItems = itemRows.filter(row =>
    row.children.length === 2 &&
    !row.children[0].querySelector('picture') &&
    !row.children[0].querySelector('a') &&
    row.children[1].querySelector('a')
  );

  const linkColumnWrapper = document.createElement('div');
  linkColumnWrapper.classList.add('col-lg-6', 'col-items');

  linkColumnItems.forEach((row, index) => {
    const col = document.createElement('div');
    col.classList.add('col-lg-4', 'link-column-container', 'column', `column-${index}`);
    if (index === 0) { // First column has different styling in original HTML
      col.classList.remove('col-lg-4');
      col.classList.add('col-lg-3');
    }

    const columnWrapper = document.createElement('div');
    columnWrapper.classList.add('link-column-wrapper');
    col.append(columnWrapper);

    const linkColumnBlock = document.createElement('div');
    linkColumnBlock.classList.add('link-column', 'block');
    columnWrapper.append(linkColumnBlock);

    const linkGridColumn = document.createElement('div');
    linkGridColumn.classList.add('link-grid-column');
    if (index === 0) {
      linkGridColumn.classList.add('link-column-horizontal');
    } else {
      linkGridColumn.classList.add('link-column-vertical');
    }
    linkColumnBlock.append(linkGridColumn);

    const headingCell = row.children[0];
    const linksCell = row.children[1];

    const heading = document.createElement('h3');
    moveInstrumentation(headingCell, heading);
    heading.classList.add('accordian-item', 'link-column__heading');
    while (headingCell.firstChild) heading.append(headingCell.firstChild);
    linkGridColumn.append(heading);

    const ul = document.createElement('ul');
    ul.classList.add('content', 'links-container', 'accordian-content', 'collpsable');
    moveInstrumentation(linksCell, ul);
    [...linksCell.children].forEach((linkRow) => {
      const li = document.createElement('li');
      moveInstrumentation(linkRow, li);
      while (linkRow.firstChild) li.append(linkRow.firstChild);
      ul.append(li);
    });
    linkGridColumn.append(ul);

    // Accordion functionality
    heading.addEventListener('click', () => {
      ul.classList.toggle('collpsable');
      heading.classList.toggle('collapsed');
    });

    if (index === 0) {
      mainRow.append(col);
    } else {
      linkColumnWrapper.append(col);
    }
  });
  mainRow.append(linkColumnWrapper);

  // Contacts
  // A contact item has 2 cells: a title (text) and contact icons (container of links with images).
  const contactItems = itemRows.filter(row =>
    row.children.length === 2 &&
    !row.children[0].querySelector('picture') &&
    !row.children[0].querySelector('a') &&
    row.children[1].querySelector('img') &&
    row.children[1].querySelector('a')
  );

  const contactSection = document.createElement('div');
  contactSection.classList.add('section', 'arena', 'footer-center-section', 'contact-container', 'column', 'column-4', 'collpsable', 'hide__section', 'contact-section', 'col-lg-3');
  mainRow.append(contactSection);

  // Default content wrapper for contact section
  const defaultContentWrapper = document.createElement('div');
  defaultContentWrapper.classList.add('default-content-wrapper');
  contactSection.append(defaultContentWrapper);

  // Example of hardcoded buttons from original HTML
  const callButtonContainer = document.createElement('p');
  callButtonContainer.classList.add('button-container');
  const callButton = document.createElement('a');
  callButton.href = 'tel:1800%20102%201800';
  callButton.title = '1800 102 1800';
  callButton.classList.add('button');
  callButton.textContent = '1800 102 1800';
  callButtonContainer.append(callButton);
  defaultContentWrapper.append(callButtonContainer);

  const mailButtonContainer = document.createElement('p');
  mailButtonContainer.classList.add('button-container');
  const mailButton = document.createElement('a');
  mailButton.href = 'mailto:contact@maruti.co.in';
  mailButton.title = 'contact@maruti.co.in';
  mailButton.classList.add('button');
  mailButton.textContent = 'contact@maruti.co.in';
  mailButtonContainer.append(mailButton);
  defaultContentWrapper.append(mailButtonContainer);

  const disclaimerP = document.createElement('p');
  disclaimerP.textContent = 'Disclaimer';
  disclaimerP.style.cursor = 'pointer';
  defaultContentWrapper.append(disclaimerP);

  contactItems.forEach((row, index) => {
    const contactWrapper = document.createElement('div');
    contactWrapper.classList.add('contact-wrapper');
    if (index === 2) contactWrapper.classList.add('qr-code'); // QR code specific class
    contactSection.append(contactWrapper);

    const contactBlock = document.createElement('div');
    contactBlock.classList.add('contact', 'block');
    contactWrapper.append(contactBlock);

    const contactWrpArena = document.createElement('div');
    contactWrpArena.classList.add('contact_wrp_arena', 'user__contact');
    if (index === 0) contactWrpArena.classList.add('header');
    contactBlock.append(contactWrpArena);

    const titleCell = row.children[0];
    const contactIconsCell = row.children[1];

    if (titleCell.textContent.trim()) {
      const title = document.createElement('h3');
      moveInstrumentation(titleCell, title);
      title.classList.add('user__contact-title');
      while (titleCell.firstChild) title.append(titleCell.firstChild);
      contactWrpArena.append(title);
    }

    const userContactIcons = document.createElement('div');
    userContactIcons.classList.add('user__contact__icons');
    moveInstrumentation(contactIconsCell, userContactIcons);
    [...contactIconsCell.children].forEach((iconRow) => {
      const link = iconRow.querySelector('a');
      const img = iconRow.querySelector('img');
      if (link && img) {
        const iconLink = document.createElement('a');
        iconLink.href = link.href;
        iconLink.target = link.target;
        iconLink.classList.add('user__contact--icon', 'out-default');
        if (link.title) iconLink.title = link.title;
        if (link.rel) iconLink.rel = link.rel;

        const span = document.createElement('span');
        span.classList.add('sr-only');
        span.textContent = img.alt;
        iconLink.append(span);

        const iconImg = document.createElement('img');
        iconImg.src = img.src;
        iconImg.alt = img.alt;
        iconImg.loading = 'lazy';
        iconLink.append(iconImg);
        userContactIcons.append(iconLink);
      }
    });
    contactWrpArena.append(userContactIcons);
  });

  // Footer Content (Disclaimer popup section)
  // A footer-content item has 1 cell: rich text content.
  const footerContentItems = itemRows.filter(row =>
    row.children.length === 1 &&
    !row.children[0].querySelector('picture') &&
    !row.children[0].querySelector('a') &&
    row.children[0].textContent.trim()
  );

  const footerPopupSection = document.createElement('div');
  footerPopupSection.classList.add('section', 'arena', 'footer-popup-section', 'column', 'column-5', 'collpsable', 'hide__section');
  footerPopupSection.style.height = '0px'; // Initially hidden
  mainRow.append(footerPopupSection);

  const footerPopupContentWrapper = document.createElement('div');
  footerPopupContentWrapper.classList.add('default-content-wrapper');
  footerPopupSection.append(footerPopupContentWrapper);

  footerContentItems.forEach((row) => {
    const contentCell = row.children[0];
    moveInstrumentation(contentCell, footerPopupContentWrapper);
    while (contentCell.firstChild) footerPopupContentWrapper.append(contentCell.firstChild);
  });

  // Disclaimer functionality
  disclaimerP.addEventListener('click', () => {
    footerPopupSection.classList.toggle('hide__section');
    footerPopupSection.classList.toggle('collpsable');
    footerPopupSection.style.height = footerPopupSection.classList.contains('hide__section') ? '0px' : 'auto';
  });

  // Footer Bottom Section
  const footerBottomSection = document.createElement('div');
  footerBottomSection.classList.add('row', 'footer-bottom-section', 'col-sm-12');
  block.append(footerBottomSection);

  const columnsWrapper = document.createElement('div');
  columnsWrapper.classList.add('columns-wrapper');
  footerBottomSection.append(columnsWrapper);

  const columnsBlock = document.createElement('div');
  columnsBlock.classList.add('columns', 'block', 'columns-1-cols');
  columnsWrapper.append(columnsBlock);

  const bottomContentDiv = document.createElement('div');
  const innerDiv = document.createElement('div');
  moveInstrumentation(footerContentContainer, innerDiv);
  while (footerContentContainer.firstChild) innerDiv.append(footerContentContainer.firstChild);
  bottomContentDiv.append(innerDiv);
  columnsBlock.append(bottomContentDiv);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Remove original rows that were processed
  linkColumnsContainer.remove();
  contactsContainer.remove();
  footerContentContainer.remove();
  itemRows.forEach(row => row.remove());
}
