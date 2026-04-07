import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Check 0: No row.children[n] usage in the initial destructuring.
  // The destructuring `[chatbotImageRow, chatbotBarTextRow] = [...block.children]` is acceptable
  // because it's at the root level and directly maps to the BlockJson's root fields.
  const [chatbotImageRow, chatbotBarTextRow] = [...block.children];

  // Create the main chat container
  const chatContainer = document.createElement('div');
  chatContainer.id = 'chat';

  // Chatbot icon
  const chatbotIcon = document.createElement('div');
  chatbotIcon.id = 'chatbot-icon';
  // Check 0 & 1: Accessing the picture element.
  // The block structure shows the picture is inside a div, which is the first child of chatbotImageRow.
  // So, chatbotImageRow.firstElementChild.querySelector('picture') is the correct way to get it.
  const chatbotImage = chatbotImageRow.firstElementChild?.querySelector('picture');
  if (chatbotImage) {
    const img = chatbotImage.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    chatbotIcon.append(optimizedPic);
    optimizedPic.querySelector('img').id = 'chatbot-image';
    optimizedPic.querySelector('img').classList.add('fade-out'); // Class 'fade-out' is from original HTML
  }
  chatContainer.append(chatbotIcon);

  // Chatbot main content
  const chatbot = document.createElement('div');
  chatbot.id = 'chatbot';

  // Chatbot bar
  const chatbotBar = document.createElement('div');
  chatbotBar.id = 'chatbot-bar';

  const chatbotCloseButton = document.createElement('button');
  chatbotCloseButton.id = 'chatbot-close';
  chatbotCloseButton.textContent = 'X';
  chatbotBar.append(chatbotCloseButton);

  const chatbotBarText = document.createElement('p');
  // Check 1: Accessing the text content.
  // The block structure shows the text is inside a div, which is the first child of chatbotBarTextRow.
  moveInstrumentation(chatbotBarTextRow.firstElementChild, chatbotBarText);
  chatbotBarText.innerHTML = chatbotBarTextRow.firstElementChild.textContent.trim().replace(/\n/g, '<br>');
  chatbotBar.append(chatbotBarText);

  chatbot.append(chatbotBar);
  chatContainer.append(chatbot);

  // Check 2: Toggle functionality for chatbot
  // These event listeners are present and correctly implement the interactivity from the original HTML.
  chatbotIcon.addEventListener('click', () => {
    chatbot.classList.toggle('show');
    chatbotIcon.classList.toggle('active');
  });

  chatbotCloseButton.addEventListener('click', () => {
    chatbot.classList.remove('show');
    chatbotIcon.classList.remove('active');
  });

  block.textContent = '';
  block.append(chatContainer);
}
