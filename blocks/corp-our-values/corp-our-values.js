import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageRow,
    heading1Row,
    heading2Row,
    valuesContainerRow, // This row contains the 'Values' heading, not the items themselves
    buttonsContainerRow, // This row contains the 'Buttons' heading, not the items themselves
    ...itemRows // All subsequent rows are actual items
  ] = [...block.children];

  const genericWrapper = document.createElement('section');
  genericWrapper.classList.add('genericWrapper');
  moveInstrumentation(block, genericWrapper);

  // Background Image
  const picture = backgroundImageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('img-responsive', 'bg-image', 'lazyload');
      genericWrapper.append(optimizedPic);
    }
  }

  const ourValuesWrapper = document.createElement('section');
  ourValuesWrapper.classList.add('our-values-wrapper');

  const mainHeader = document.createElement('div');
  mainHeader.classList.add('main-header', 'container');

  const topBorder = document.createElement('div');
  topBorder.classList.add('topBorder');
  topBorder.innerHTML = '&nbsp;';
  mainHeader.append(topBorder);

  const h2 = document.createElement('h2');
  moveInstrumentation(heading1Row.firstElementChild, h2);
  h2.id = 'our';
  h2.classList.add('text-uppercase');
  h2.textContent = heading1Row.firstElementChild.textContent;
  mainHeader.append(h2);

  const h3 = document.createElement('h3');
  moveInstrumentation(heading2Row.firstElementChild, h3);
  h3.id = 'values';
  h3.classList.add('text-uppercase');
  h3.textContent = heading2Row.firstElementChild.textContent;
  mainHeader.append(h3);

  ourValuesWrapper.append(mainHeader);

  const ourValuesComponents = document.createElement('div');
  ourValuesComponents.classList.add('our-values-components', 'g-row');

  const valuesList = document.createElement('ul');
  valuesList.classList.add('col-lg-12', 'col-md-12', 'col-sm-12');

  // Filter for 'value' items: they have one cell containing a picture
  const valueItems = itemRows.filter((row) => row.children.length === 1 && row.firstElementChild.querySelector('picture'));
  valueItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('sub-holder', 'col-lg-2', 'col-sm-2', 'col-md-3', 'col-xs-6');

    const imgSpace = document.createElement('div');
    imgSpace.classList.add('img-space');

    // The image is in the first (and only) cell of the row
    const pictureEl = row.firstElementChild.querySelector('picture');
    if (pictureEl) {
      const img = pictureEl.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('lazyload');
        imgSpace.append(optimizedPic);
      }
    }
    li.append(imgSpace);
    valuesList.append(li);
  });
  ourValuesComponents.append(valuesList);
  ourValuesWrapper.append(ourValuesComponents);

  const buttonHolder = document.createElement('div');
  buttonHolder.classList.add('button-holder');

  // Filter for 'button' items: they have two cells, the first containing an 'a' tag
  const buttonItems = itemRows.filter((row) => row.children.length === 2 && row.firstElementChild.querySelector('a'));
  buttonItems.forEach((row, index) => {
    const linkCell = row.children[0]; // First cell for the link
    const textCell = row.children[1]; // Second cell for the text

    const originalLink = linkCell.querySelector('a');
    const newLink = document.createElement('a');
    moveInstrumentation(linkCell, newLink);

    if (originalLink) {
      newLink.href = originalLink.href;
      newLink.title = textCell.textContent; // Title from the text cell
      newLink.textContent = textCell.textContent; // Text content from the text cell
      newLink.target = originalLink.target;
    } else {
      newLink.href = '#';
      newLink.title = textCell.textContent;
      newLink.textContent = textCell.textContent;
    }

    newLink.classList.add('button', 'btns', 'button-red');
    if (index < buttonItems.length - 1) {
      newLink.style.marginRight = '10px';
    }
    buttonHolder.append(newLink);
  });
  ourValuesWrapper.append(buttonHolder);

  genericWrapper.append(ourValuesWrapper);

  block.textContent = '';
  block.append(genericWrapper);
}
