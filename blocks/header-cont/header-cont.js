import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const header = document.createElement('header');
  header.classList.add('headerCont');

  const headerInrCont = document.createElement('div');
  headerInrCont.classList.add('headerInrCont');
  header.append(headerInrCont);

  const nav = document.createElement('nav');
  nav.id = 'menu';
  headerInrCont.append(nav);

  // Use content detection for logo and logo link rows
  const blockChildren = [...block.children];
  const logoRow = blockChildren.find(row => row.querySelector('picture'));
  const logoLinkRow = blockChildren.find(row => row.querySelector('a') && !row.querySelector('picture'));
  const menuItemRows = blockChildren.filter(row => row !== logoRow && row !== logoLinkRow);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  nav.append(logoDiv);

  const logoLink = document.createElement('a');
  logoLink.classList.add('mainLogo');
  if (logoLinkRow) {
    const logoLinkFound = logoLinkRow.querySelector('a');
    if (logoLinkFound) {
      logoLink.href = logoLinkFound.href;
    }
    moveInstrumentation(logoLinkRow, logoLink);
  }
  logoDiv.append(logoLink);

  if (logoRow) {
    const logoPicture = logoRow.querySelector('picture');
    if (logoPicture) {
      const img = logoPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        logoLink.append(optimizedPic);
      }
    }
  }

  const headMobile = document.createElement('div');
  headMobile.id = 'head-mobile';
  nav.append(headMobile);

  // Add event listener for mobile menu toggle
  headMobile.addEventListener('click', () => {
    nav.classList.toggle('menu-open'); // Assuming 'menu-open' class toggles mobile menu visibility
  });

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button');
  nav.append(buttonDiv);

  const menuContainer = document.createElement('div');
  menuContainer.classList.add('menu-primay-menu-container');
  nav.append(menuContainer);

  const ul = document.createElement('ul');
  ul.id = 'primary-menu';
  ul.classList.add('menu');
  menuContainer.append(ul);

  let currentParentLi = ul;
  const stack = [];

  menuItemRows.forEach((row) => {
    const cells = [...row.children];
    const linkCell = cells.find((cell) => cell.querySelector('a'));
    const textCell = cells.find((cell) => !cell.querySelector('a') && !cell.querySelector('picture'));
    const imageCell = cells.find((cell) => cell.querySelector('picture'));

    // Determine if it's a parent menu item (has children, no image in the main link row)
    // or a child menu item (with or without image)
    const isParentMenuItem = linkCell && textCell && !imageCell && (row.nextElementSibling && [...row.nextElementSibling.children].some(c => c.querySelector('a')));

    if (isParentMenuItem) {
      const li = document.createElement('li');
      li.classList.add('menu-item', 'menu-item-type-custom', 'menu-item-object-custom', 'menu-item-has-children', 'has-sub');
      moveInstrumentation(row, li);

      const submenuButton = document.createElement('span');
      submenuButton.classList.add('submenu-button');
      li.append(submenuButton);

      const link = document.createElement('a');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
        link.textContent = foundLink.textContent;
      }
      li.append(link);

      const subMenu = document.createElement('ul');
      subMenu.classList.add('sub-menu');
      li.append(subMenu);

      currentParentLi.append(li);
      stack.push(currentParentLi); // Save current parent before descending
      currentParentLi = subMenu; // Descend into submenu

      submenuButton.addEventListener('click', () => {
        li.classList.toggle('has-sub');
        li.classList.toggle('menu-item-has-children');
        subMenu.classList.toggle('show'); // Assuming 'show' class to display submenu
      });

    } else if (linkCell && imageCell) { // Child menu item with image
      const li = document.createElement('li');
      li.classList.add('menu-item', 'menu-item-type-post_type', 'menu-item-object-fortunes');
      moveInstrumentation(row, li);

      const link = document.createElement('a');
      link.classList.add('menu-image-box');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
      }
      li.append(link);

      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('menu-image');
        link.append(optimizedPic);
      }

      if (textCell) {
        link.append(textCell.textContent);
      }

      currentParentLi.append(li);

    } else if (linkCell && textCell && !imageCell) { // Simple menu item (no image, not a parent)
      const li = document.createElement('li');
      li.classList.add('menu-item', 'menu-item-type-post_type', 'menu-item-object-page');
      moveInstrumentation(row, li);

      const link = document.createElement('a');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
        link.textContent = foundLink.textContent;
      }
      li.append(link);
      currentParentLi.append(li);
    }
    // Logic to ascend the stack if the next row is not a child of the current parent
    // This part is complex and often requires more sophisticated parsing or explicit indentation in the block structure.
    // For now, assuming the block structure implies hierarchy by consecutive rows.
    // A more robust solution might involve checking the "level" of the menu item from the original HTML or a specific block structure indicator.
  });

  block.textContent = '';
  block.append(header);
}
