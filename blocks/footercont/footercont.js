import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footer = document.createElement('footer');
  footer.classList.add('section', 'footerCont', 'nav-folderized', 'test-class');

  const wid1250 = document.createElement('div');
  wid1250.classList.add('wid1250');
  footer.append(wid1250);

  const footerLnkCont = document.createElement('div');
  footerLnkCont.classList.add('footerLnkCont', 'row');
  wid1250.append(footerLnkCont);

  const colLg9 = document.createElement('div');
  colLg9.classList.add('col-sm-12', 'col-lg-9');
  footerLnkCont.append(colLg9);

  const rowInner = document.createElement('div');
  rowInner.classList.add('row');
  colLg9.append(rowInner);

  const footerNavColOils = document.createElement('div');
  footerNavColOils.classList.add('ftr__list', 'footer-nav', 'col-sm-12', 'col-lg-3');
  rowInner.append(footerNavColOils);

  const footerHd3Oils = document.createElement('h4');
  footerHd3Oils.classList.add('footerHd3');
  footerHd3Oils.textContent = 'Oils';
  footerNavColOils.append(footerHd3Oils);

  const footerLnkBxOils = document.createElement('ul');
  footerLnkBxOils.classList.add('footerLnkBx');
  footerNavColOils.append(footerLnkBxOils);

  // Placeholder for dynamically added oil links
  const menuFortuneOilFooterContainer = document.createElement('div');
  menuFortuneOilFooterContainer.classList.add('menu-fortune-oil-footer-container');
  const oilFooterMenu = document.createElement('ul');
  oilFooterMenu.id = 'menu-fortune-oil-footer';
  oilFooterMenu.classList.add('oil-footer-menu');
  menuFortuneOilFooterContainer.append(oilFooterMenu);
  footerLnkBxOils.append(menuFortuneOilFooterContainer);

  const xpertLi = document.createElement('li');
  const xpertMnhd = document.createElement('a');
  xpertMnhd.classList.add('mnhd');
  xpertMnhd.textContent = 'Fortune Xpert';
  xpertLi.append(xpertMnhd);
  footerLnkBxOils.append(xpertLi);

  const menuFooterXpertOilMenuContainer = document.createElement('div');
  menuFooterXpertOilMenuContainer.classList.add('menu-footer-xpertoil-menu-container');
  const xpertOilFooterMenu = document.createElement('ul');
  xpertOilFooterMenu.id = 'menu-footer-xpertoil-menu';
  xpertOilFooterMenu.classList.add('xpertoil-footer-menu');
  menuFooterXpertOilMenuContainer.append(xpertOilFooterMenu);
  xpertLi.append(menuFooterXpertOilMenuContainer);

  const footerNavColFoods = document.createElement('div');
  footerNavColFoods.classList.add('ftr__list', 'footer-nav', 'col-sm-12', 'col-lg-6');
  rowInner.append(footerNavColFoods);

  const footerHd3Foods = document.createElement('h4');
  footerHd3Foods.classList.add('footerHd3');
  footerHd3Foods.textContent = 'Foods';
  footerNavColFoods.append(footerHd3Foods);

  const footerDivide = document.createElement('div');
  footerDivide.classList.add('footer-divide');
  footerNavColFoods.append(footerDivide);

  const footerDivide50_1 = document.createElement('div');
  footerDivide50_1.classList.add('footer-divide-50');
  footerDivide.append(footerDivide50_1);

  const footerLnkBx1 = document.createElement('ul');
  footerLnkBx1.classList.add('footerLnkBx');
  footerDivide50_1.append(footerLnkBx1);

  // Placeholder for dynamically added atta links
  const menuFooterAttaMenuContainer = document.createElement('div');
  menuFooterAttaMenuContainer.classList.add('menu-footer-atta-menu-container');
  const attaFooterMenu = document.createElement('ul');
  attaFooterMenu.id = 'menu-footer-atta-menu';
  attaFooterMenu.classList.add('atta-footer-menu');
  menuFooterAttaMenuContainer.append(attaFooterMenu);
  footerLnkBx1.append(menuFooterAttaMenuContainer);

  const riceLi = document.createElement('li');
  const riceMnhd = document.createElement('a');
  riceMnhd.classList.add('mnhd');
  riceMnhd.textContent = 'Fortune Rice';
  riceLi.append(riceMnhd);
  footerLnkBx1.append(riceLi);

  const menuFortuneRiceFooterContainer = document.createElement('div');
  menuFortuneRiceFooterContainer.classList.add('menu-fortune-rice-footer-container');
  const riceFooterMenu = document.createElement('ul');
  riceFooterMenu.id = 'menu-fortune-rice-footer';
  riceFooterMenu.classList.add('rice-footer-menu');
  menuFortuneRiceFooterContainer.append(riceFooterMenu);
  riceLi.append(menuFortuneRiceFooterContainer);

  const soyaLi = document.createElement('li');
  const soyaMnhd = document.createElement('a');
  soyaMnhd.classList.add('mnhd');
  soyaMnhd.textContent = 'Fortune Soya Chunks';
  soyaLi.append(soyaMnhd);
  footerLnkBx1.append(soyaLi);

  const menuSoyaFooterMenuContainer = document.createElement('div');
  menuSoyaFooterMenuContainer.classList.add('menu-soya-footer-menu-container');
  const soyaFooterMenu = document.createElement('ul');
  soyaFooterMenu.id = 'menu-soya-footer-menu';
  soyaFooterMenu.classList.add('soya-footer-menu');
  menuSoyaFooterMenuContainer.append(soyaFooterMenu);
  soyaLi.append(menuSoyaFooterMenuContainer);

  const footerDivide50_2 = document.createElement('div');
  footerDivide50_2.classList.add('footer-divide-50');
  footerDivide.append(footerDivide50_2);

  const footerLnkBx2 = document.createElement('ul');
  footerLnkBx2.classList.add('footerLnkBx');
  footerDivide50_2.append(footerLnkBx2);

  const pulsesLi = document.createElement('li');
  const pulsesMnhd = document.createElement('a');
  pulsesMnhd.classList.add('mnhd');
  pulsesMnhd.textContent = 'Fortune Pulses';
  pulsesLi.append(pulsesMnhd);
  footerLnkBx2.append(pulsesLi);

  const menuFooterPulsesMenuContainer = document.createElement('div');
  menuFooterPulsesMenuContainer.classList.add('menu-footer-pulses-menu-container');
  const pulsesFooterMenu = document.createElement('ul');
  pulsesFooterMenu.id = 'menu-footer-pulses-menu';
  pulsesFooterMenu.classList.add('pulses-footer-menu');
  menuFooterPulsesMenuContainer.append(pulsesFooterMenu);
  pulsesLi.append(menuFooterPulsesMenuContainer);

  const pohaLi = document.createElement('li');
  const pohaMnhd = document.createElement('a');
  pohaMnhd.classList.add('mnhd');
  pohaMnhd.textContent = 'Fortune Poha';
  pohaLi.append(pohaMnhd);
  footerLnkBx2.append(pohaLi);

  const menuFooterPohaMenuContainer = document.createElement('div');
  menuFooterPohaMenuContainer.classList.add('menu-footer-poha-menu-container');
  const pohaFooterMenu = document.createElement('ul');
  pohaFooterMenu.id = 'menu-footer-poha-menu';
  pohaFooterMenu.classList.add('poha-footer-menu');
  menuFooterPohaMenuContainer.append(pohaFooterMenu);
  pohaLi.append(menuFooterPohaMenuContainer);

  const colLg3Pl0Pr0 = document.createElement('div');
  colLg3Pl0Pr0.classList.add('col-sm-12', 'col-lg-3', 'pl-0', 'pr-0');
  rowInner.append(colLg3Pl0Pr0);

  const ftrListChangingFortunes = document.createElement('div');
  ftrListChangingFortunes.classList.add('ftr__list', 'footer-nav');
  colLg3Pl0Pr0.append(ftrListChangingFortunes);

  const footerHd3ChangingFortunes = document.createElement('h4');
  footerHd3ChangingFortunes.classList.add('footerHd3');
  footerHd3ChangingFortunes.textContent = 'Changing Fortunes';
  ftrListChangingFortunes.append(footerHd3ChangingFortunes);

  const menuFooterMenuChangingFortunes = document.createElement('ul');
  menuFooterMenuChangingFortunes.id = 'menu-footer-menu'; // This ID is duplicated in original HTML, needs careful handling
  menuFooterMenuChangingFortunes.classList.add('footerLnkBx');
  ftrListChangingFortunes.append(menuFooterMenuChangingFortunes);

  const h5 = document.createElement('h5');
  colLg3Pl0Pr0.append(h5);

  const menuFooterMenuContainer = document.createElement('div');
  menuFooterMenuContainer.classList.add('menu-footer-menu-container');
  h5.append(menuFooterMenuContainer);

  const footerMenu = document.createElement('ul');
  footerMenu.id = 'menu-footer-menu-secondary'; // Renamed to avoid ID duplication
  footerMenu.classList.add('footer-menu');
  menuFooterMenuContainer.append(footerMenu);

  const footerAddress = document.createElement('div');
  footerAddress.classList.add('col-sm-12', 'col-lg-3', 'footer-address');
  footerLnkCont.append(footerAddress);

  const colTextRight = document.createElement('div');
  colTextRight.classList.add('col', 'text-right');
  footerAddress.append(colTextRight);

  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');
  footer.append(footerBottom);

  const containerBottom = document.createElement('div');
  containerBottom.classList.add('container');
  footerBottom.append(containerBottom);

  const rowBottom = document.createElement('div');
  rowBottom.classList.add('row', 'flex-row-reverse', 'align-items-center');
  containerBottom.append(rowBottom);

  const colLg4 = document.createElement('div');
  colLg4.classList.add('col-sm-12', 'col-lg-4');
  rowBottom.append(colLg4);

  const footerSocial = document.createElement('div');
  footerSocial.classList.add('footer-social');
  colLg4.append(footerSocial);

  const colLg8 = document.createElement('div');
  colLg8.classList.add('col-sm-12', 'col-lg-8');
  rowBottom.append(colLg8);

  const copyrightP = document.createElement('p');
  colLg8.append(copyrightP);

  const [copyrightRow, ...itemRows] = [...block.children];

  // Copyright
  moveInstrumentation(copyrightRow, copyrightP);
  while (copyrightRow.firstChild) copyrightP.append(copyrightRow.firstChild);

  itemRows.forEach((row) => {
    const cells = [...row.children];
    const hasLink = cells.some(cell => cell.querySelector('a'));
    const hasPicture = cells.some(cell => cell.querySelector('picture'));

    if (cells.length === 2 && hasLink && hasPicture) { // footersocial
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const imageCell = cells.find(cell => cell.querySelector('picture'));

      const socialLink = document.createElement('a');
      moveInstrumentation(linkCell, socialLink);
      socialLink.href = linkCell.querySelector('a')?.href || '#';
      socialLink.target = '_blank';

      const icon = imageCell.querySelector('picture');
      if (icon) {
        const img = icon.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        icon.replaceWith(optimizedPic);
        socialLink.append(optimizedPic);
      }
      footerSocial.append(socialLink);
    } else if (cells.length === 2 && hasLink && !hasPicture) { // footerlink
      const labelCell = cells.find(cell => !cell.querySelector('a')); // Assuming label is plain text
      const urlCell = cells.find(cell => cell.querySelector('a'));

      if (labelCell && urlCell) {
        const li = document.createElement('li');
        li.classList.add('menu-item', 'menu-item-type-post_type', 'menu-item-object-page', 'level1Header');
        const link = document.createElement('a');
        moveInstrumentation(urlCell, link);
        link.href = urlCell.querySelector('a')?.href || '#';
        link.textContent = labelCell.textContent.trim(); // Use label cell for text content
        li.append(link);

        // Heuristic to distribute links based on original HTML structure
        if (link.textContent.includes('Suposhan') || link.textContent.includes('Sustainable Living')) {
          li.classList.add('footerHd3link', 'footerHd3linkpad');
          menuFooterMenuChangingFortunes.append(li);
        } else if (link.textContent.includes('Soya Health Oil') || link.textContent.includes('Sunlite Refined Sunflower Oil') || link.textContent.includes('Kachi Ghani Mustard Oil') || link.textContent.includes('Rice Bran Health Oil') || link.textContent.includes('Filtered Groundnut Oil') || link.textContent.includes('Cottonlite Oil') || link.textContent.includes('Pehli Dhaar Mustard Oil')) {
          oilFooterMenu.append(li);
        } else if (link.textContent.includes('Xpert Total Balance Oil') || link.textContent.includes('Xpert Pro Immunity Oil') || link.textContent.includes('Xpert Pro Sugar Conscious Oil')) {
          xpertOilFooterMenu.append(li);
        } else if (link.textContent.includes('Chakki Fresh Atta')) {
          attaFooterMenu.append(li);
        } else if (link.textContent.includes('Biryani Special Basmati Rice') || link.textContent.includes('Everyday Basmati Rice') || link.textContent.includes('Rozana Basmati Rice')) {
          riceFooterMenu.append(li);
        } else if (link.textContent.includes('Soya Granules') || link.textContent.includes('Soya Mini Chunks') || link.textContent.includes('Soya Chunks') || link.textContent.includes('Besan') || link.textContent.includes('Sugar')) {
          soyaFooterMenu.append(li);
        } else if (link.textContent.includes('Unpolished Chana Dal') || link.textContent.includes('Unpolished Arhar Dal') || link.textContent.includes('Rawa') || link.textContent.includes('Maida')) {
          pulsesFooterMenu.append(li);
        } else if (link.textContent.includes('Regular Poha') || link.textContent.includes('Indori Poha') || link.textContent.includes('Suji')) {
          pohaFooterMenu.append(li);
        } else {
          li.classList.add('footerHd3link', 'footerHd3linkpad');
          footerMenu.append(li);
        }
      }
    } else if (cells.length === 1 && hasPicture) { // footerimage
      const imageCell = cells.find(cell => cell.querySelector('picture'));
      if (imageCell) {
        const picture = imageCell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          picture.replaceWith(optimizedPic);

          const link = document.createElement('a');
          // If the original HTML has a link wrapping the image, use that href.
          // Otherwise, default to a placeholder or determine from context.
          const originalLink = imageCell.querySelector('a');
          link.href = originalLink ? originalLink.href : '#';
          link.append(optimizedPic);

          const imgWrapper = document.createElement('div');
          imgWrapper.classList.add('mb-3', 'img-responsive');
          imgWrapper.append(link);
          colTextRight.append(imgWrapper);
        }
      }
    }
  });

  block.textContent = '';
  block.append(footer);

  // Add event listeners for accordion-like behavior on mobile
  const accordionHeaders = footer.querySelectorAll('.footerHd3, .mnhd');
  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const parentList = header.closest('.ftr__list') || header.closest('li');
      if (parentList) {
        parentList.classList.toggle('active');
      }
    });
  });
}
