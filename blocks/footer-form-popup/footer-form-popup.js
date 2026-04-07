import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.id = 'footerformpopup';
  block.style.display = 'none';

  const modalBackdrop = document.createElement('div');
  modalBackdrop.classList.add('modal-backdrop', 'dod_overlay', 'popuplayout');
  block.append(modalBackdrop);

  const dodBannerHp = document.createElement('div');
  dodBannerHp.classList.add('dod_banner_hp', 'dod_banner_hp_pop', 'active', 'popupform');
  dodBannerHp.id = 'dod_banner_hp';
  block.append(dodBannerHp);

  const closeButton = document.createElement('a');
  closeButton.href = 'javascript:void(0);';
  closeButton.classList.add('close');
  closeButton.setAttribute('data-formpopup', 'dod_banner_hp');
  closeButton.textContent = 'X';
  dodBannerHp.append(closeButton);

  const disclaimerPop = document.createElement('div');
  disclaimerPop.classList.add('disclaimer-pop');
  dodBannerHp.append(disclaimerPop);

  const container = document.createElement('div');
  container.classList.add('container');
  disclaimerPop.append(container);

  const innerContainerForm = document.createElement('div');
  innerContainerForm.classList.add('inner-container-form');
  container.append(innerContainerForm);

  const gformWrapper = document.createElement('div');
  gformWrapper.classList.add('gf_browser_chrome', 'gform_wrapper', 'gravity-theme', 'gform-theme--no-framework');
  gformWrapper.setAttribute('data-form-theme', 'gravity-theme');
  gformWrapper.setAttribute('data-form-index', '0');
  gformWrapper.id = 'gform_wrapper_1';
  innerContainerForm.append(gformWrapper);

  const gformAnchor = document.createElement('div');
  gformAnchor.id = 'gf_1';
  gformAnchor.classList.add('gform_anchor');
  gformAnchor.tabIndex = -1;
  gformWrapper.append(gformAnchor);

  const gformHeading = document.createElement('div');
  gformHeading.classList.add('gform_heading');
  gformWrapper.append(gformHeading);

  const gformTitle = document.createElement('h2');
  gformTitle.classList.add('gform_title');
  gformTitle.textContent = 'Get in touch';
  gformHeading.append(gformTitle);

  const gformDescription = document.createElement('p');
  gformDescription.classList.add('gform_description');
  gformHeading.append(gformDescription);

  const form = document.createElement('form');
  form.method = 'post';
  form.enctype = 'multipart/form-data';
  form.target = 'gform_ajax_frame_1';
  form.id = 'gform_1';
  form.action = '/#gf_1';
  form.setAttribute('data-formid', '1');
  form.noValidate = true;
  gformWrapper.append(form);

  const gformsPum = document.createElement('input');
  gformsPum.type = 'hidden';
  gformsPum.classList.add('gforms-pum');
  gformsPum.value = '{"closepopup":false,"closedelay":0,"openpopup":false,"openpopup_id":0}';
  form.append(gformsPum);

  const gformBody = document.createElement('div');
  gformBody.classList.add('gform-body', 'gform_body');
  form.append(gformBody);

  const gformFields = document.createElement('div');
  gformFields.id = 'gform_fields_1';
  gformFields.classList.add('gform_fields', 'top_label', 'form_sublabel_below', 'description_below', 'validation_below');
  gformBody.append(gformFields);

  // Content detection for rows instead of direct index access
  const rows = [...block.children];
  const nameRow = rows.find(row => row.querySelector('div')?.textContent.includes('Name value'));
  const emailRow = rows.find(row => row.querySelector('div')?.textContent.includes('Email value'));
  const phoneRow = rows.find(row => row.querySelector('div')?.textContent.includes('Phone value'));
  const stateRow = rows.find(row => row.querySelector('div')?.textContent.includes('State value'));
  const cityRow = rows.find(row => row.querySelector('div')?.textContent.includes('City value'));
  const refererUrlRow = rows.find(row => row.querySelector('a')?.href.includes('referer-url'));
  const messageRow = rows.find(row => row.querySelector('p')?.textContent.includes('Message text content'));

  // Name field
  const nameField = document.createElement('div');
  nameField.id = 'field_1_6';
  nameField.classList.add('gfield', 'gfield--type-text', 'gfield--input-type-text', 'gfield--width-full', 'gfield_contains_required', 'field_sublabel_below', 'gfield--no-description', 'field_description_below', 'hidden_label', 'field_validation_below', 'gfield_visibility_visible');
  if (nameRow) moveInstrumentation(nameRow, nameField);
  gformFields.append(nameField);

  const nameLabel = document.createElement('label');
  nameLabel.classList.add('gfield_label', 'gform-field-label');
  nameLabel.htmlFor = 'input_1_6';
  nameLabel.textContent = 'Name';
  const nameRequired = document.createElement('span');
  nameRequired.classList.add('gfield_required');
  const nameRequiredText = document.createElement('span');
  nameRequiredText.classList.add('gfield_required', 'gfield_required_text');
  nameRequiredText.textContent = '(Required)';
  nameRequired.append(nameRequiredText);
  nameLabel.append(nameRequired);
  nameField.append(nameLabel);

  const nameInputContainer = document.createElement('div');
  nameInputContainer.classList.add('ginput_container', 'ginput_container_text');
  nameField.append(nameInputContainer);

  const nameInput = document.createElement('input');
  nameInput.name = 'input_6';
  nameInput.id = 'input_1_6';
  nameInput.type = 'text';
  nameInput.value = nameRow?.querySelector('div')?.textContent || '';
  nameInput.classList.add('large');
  nameInput.placeholder = 'Your Name';
  nameInput.setAttribute('aria-required', 'true');
  nameInput.setAttribute('aria-invalid', 'false');
  nameInputContainer.append(nameInput);

  // Email field
  const emailField = document.createElement('div');
  emailField.id = 'field_1_4';
  emailField.classList.add('gfield', 'gfield--type-email', 'gfield--input-type-email', 'gfield--width-full', 'gfield_contains_required', 'field_sublabel_below', 'gfield--no-description', 'field_description_below', 'hidden_label', 'field_validation_below', 'gfield_visibility_visible');
  if (emailRow) moveInstrumentation(emailRow, emailField);
  gformFields.append(emailField);

  const emailLabel = document.createElement('label');
  emailLabel.classList.add('gfield_label', 'gform-field-label');
  emailLabel.htmlFor = 'input_1_4';
  emailLabel.textContent = 'Email';
  const emailRequired = document.createElement('span');
  emailRequired.classList.add('gfield_required');
  const emailRequiredText = document.createElement('span');
  emailRequiredText.classList.add('gfield_required', 'gfield_required_text');
  emailRequiredText.textContent = '(Required)';
  emailRequired.append(emailRequiredText);
  emailLabel.append(emailRequired);
  emailField.append(emailLabel);

  const emailInputContainer = document.createElement('div');
  emailInputContainer.classList.add('ginput_container', 'ginput_container_email');
  emailField.append(emailInputContainer);

  const emailInput = document.createElement('input');
  emailInput.name = 'input_4';
  emailInput.id = 'input_1_4';
  emailInput.type = 'email';
  emailInput.value = emailRow?.querySelector('div')?.textContent || '';
  emailInput.classList.add('large');
  emailInput.placeholder = 'Email';
  emailInput.setAttribute('aria-required', 'true');
  emailInput.setAttribute('aria-invalid', 'false');
  emailInputContainer.append(emailInput);

  // Phone field
  const phoneField = document.createElement('div');
  phoneField.id = 'field_1_3';
  phoneField.classList.add('gfield', 'gfield--type-phone', 'gfield--input-type-phone', 'gfield--width-full', 'gfield_contains_required', 'field_sublabel_below', 'gfield--no-description', 'field_description_below', 'hidden_label', 'field_validation_below', 'gfield_visibility_visible');
  if (phoneRow) moveInstrumentation(phoneRow, phoneField);
  gformFields.append(phoneField);

  const phoneLabel = document.createElement('label');
  phoneLabel.classList.add('gfield_label', 'gform-field-label');
  phoneLabel.htmlFor = 'input_1_3';
  phoneLabel.textContent = 'Phone';
  const phoneRequired = document.createElement('span');
  phoneRequired.classList.add('gfield_required');
  const phoneRequiredText = document.createElement('span');
  phoneRequiredText.classList.add('gfield_required', 'gfield_required_text');
  phoneRequiredText.textContent = '(Required)';
  phoneRequired.append(phoneRequiredText);
  phoneLabel.append(phoneRequired);
  phoneField.append(phoneLabel);

  const phoneInputContainer = document.createElement('div');
  phoneInputContainer.classList.add('ginput_container', 'ginput_container_phone');
  phoneField.append(phoneInputContainer);

  const phoneInput = document.createElement('input');
  phoneInput.name = 'input_3';
  phoneInput.id = 'input_1_3';
  phoneInput.type = 'tel';
  phoneInput.value = phoneRow?.querySelector('div')?.textContent || '';
  phoneInput.classList.add('large');
  phoneInput.placeholder = 'Phone';
  phoneInput.setAttribute('aria-required', 'true');
  phoneInput.setAttribute('aria-invalid', 'false');
  phoneInputContainer.append(phoneInput);

  // State field
  const stateField = document.createElement('div');
  stateField.id = 'field_1_10';
  stateField.classList.add('gfield', 'gfield--type-select', 'gfield--input-type-select', 'gfield--width-half', 'gfield_contains_required', 'field_sublabel_below', 'gfield--no-description', 'field_description_below', 'hidden_label', 'field_validation_below', 'gfield_visibility_visible');
  if (stateRow) moveInstrumentation(stateRow, stateField);
  gformFields.append(stateField);

  const stateLabel = document.createElement('label');
  stateLabel.classList.add('gfield_label', 'gform-field-label');
  stateLabel.htmlFor = 'input_1_10';
  stateLabel.textContent = 'State';
  const stateRequired = document.createElement('span');
  stateRequired.classList.add('gfield_required');
  const stateRequiredText = document.createElement('span');
  stateRequiredText.classList.add('gfield_required', 'gfield_required_text');
  stateRequiredText.textContent = '(Required)';
  stateRequired.append(stateRequiredText);
  stateLabel.append(stateRequired);
  stateField.append(stateLabel);

  const stateInputContainer = document.createElement('div');
  stateInputContainer.classList.add('ginput_container', 'ginput_container_select');
  stateField.append(stateInputContainer);

  const stateSelect = document.createElement('select');
  stateSelect.name = 'input_10';
  stateSelect.id = 'input_1_10';
  stateSelect.classList.add('large', 'gfield_select');
  stateSelect.setAttribute('aria-required', 'true');
  stateSelect.setAttribute('aria-invalid', 'false');
  stateInputContainer.append(stateSelect);

  const statePlaceholder = document.createElement('option');
  statePlaceholder.value = '';
  statePlaceholder.selected = true;
  statePlaceholder.classList.add('gf_placeholder');
  statePlaceholder.textContent = 'State';
  stateSelect.append(statePlaceholder);

  const stateValue = stateRow?.querySelector('div')?.textContent;
  const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'];
  states.forEach(s => {
    const option = document.createElement('option');
    option.value = s;
    option.textContent = s;
    if (s === stateValue) {
      option.selected = true;
    }
    stateSelect.append(option);
  });

  // City field
  const cityField = document.createElement('div');
  cityField.id = 'field_1_11';
  cityField.classList.add('gfield', 'gfield--type-select', 'gfield--input-type-select', 'gfield--width-half', 'gfield_contains_required', 'field_sublabel_below', 'gfield--no-description', 'field_description_below', 'hidden_label', 'field_validation_below', 'gfield_visibility_visible');
  if (cityRow) moveInstrumentation(cityRow, cityField);
  gformFields.append(cityField);

  const cityLabel = document.createElement('label');
  cityLabel.classList.add('gfield_label', 'gform-field-label');
  cityLabel.htmlFor = 'input_1_11';
  cityLabel.textContent = 'City';
  const cityRequired = document.createElement('span');
  cityRequired.classList.add('gfield_required');
  const cityRequiredText = document.createElement('span');
  cityRequiredText.classList.add('gfield_required', 'gfield_required_text');
  cityRequiredText.textContent = '(Required)';
  cityRequired.append(cityRequiredText);
  cityLabel.append(cityRequired);
  cityField.append(cityLabel);

  const cityInputContainer = document.createElement('div');
  cityInputContainer.classList.add('ginput_container', 'ginput_container_select');
  cityField.append(cityInputContainer);

  const citySelect = document.createElement('select');
  citySelect.name = 'input_11';
  citySelect.id = 'input_1_11';
  citySelect.classList.add('large', 'gfield_select');
  citySelect.setAttribute('aria-required', 'true');
  citySelect.setAttribute('aria-invalid', 'false');
  cityInputContainer.append(citySelect);

  const cityPlaceholder = document.createElement('option');
  cityPlaceholder.value = '';
  cityPlaceholder.selected = true;
  cityPlaceholder.classList.add('gf_placeholder');
  cityPlaceholder.textContent = 'City';
  citySelect.append(cityPlaceholder);

  const cityValue = cityRow?.querySelector('div')?.textContent;
  if (cityValue) {
    const option = document.createElement('option');
    option.value = cityValue;
    option.textContent = cityValue;
    option.selected = true;
    citySelect.append(option);
  }

  // Referer URL field
  const refererUrlField = document.createElement('div');
  refererUrlField.id = 'field_1_12';
  refererUrlField.classList.add('gfield', 'gfield--type-text', 'gfield--input-type-text', 'gfield--width-full', 'field_sublabel_below', 'gfield--no-description', 'field_description_below', 'field_validation_below', 'gfield_visibility_hidden');
  if (refererUrlRow) moveInstrumentation(refererUrlRow, refererUrlField);
  gformFields.append(refererUrlField);

  const adminHiddenMarkup = document.createElement('div');
  adminHiddenMarkup.classList.add('admin-hidden-markup');
  refererUrlField.append(adminHiddenMarkup);

  const gformIcon = document.createElement('i');
  gformIcon.classList.add('gform-icon', 'gform-icon--hidden');
  gformIcon.setAttribute('aria-hidden', 'true');
  gformIcon.title = 'This field is hidden when viewing the form';
  adminHiddenMarkup.append(gformIcon);

  const adminHiddenText = document.createElement('span');
  adminHiddenText.textContent = 'This field is hidden when viewing the form';
  adminHiddenMarkup.append(adminHiddenText);

  const refererUrlLabel = document.createElement('label');
  refererUrlLabel.classList.add('gfield_label', 'gform-field-label');
  refererUrlLabel.htmlFor = 'input_1_12';
  refererUrlLabel.textContent = 'Referer Url';
  refererUrlField.append(refererUrlLabel);

  const refererUrlInputContainer = document.createElement('div');
  refererUrlInputContainer.classList.add('ginput_container', 'ginput_container_text');
  refererUrlField.append(refererUrlInputContainer);

  const refererUrlInput = document.createElement('input');
  refererUrlInput.name = 'input_12';
  refererUrlInput.id = 'input_1_12';
  refererUrlInput.type = 'text';
  const refererLink = refererUrlRow?.querySelector('a');
  refererUrlInput.value = refererLink ? refererLink.href : '';
  refererUrlInput.classList.add('large');
  refererUrlInput.placeholder = 'We can help you with';
  refererUrlInput.setAttribute('aria-invalid', 'false');
  refererUrlInputContainer.append(refererUrlInput);

  // Message field
  const messageField = document.createElement('div');
  messageField.id = 'field_1_5';
  messageField.classList.add('gfield', 'gfield--type-textarea', 'gfield--input-type-textarea', 'gfield--width-full', 'field_sublabel_below', 'gfield--no-description', 'field_description_below', 'hidden_label', 'field_validation_below', 'gfield_visibility_visible');
  if (messageRow) moveInstrumentation(messageRow, messageField);
  gformFields.append(messageField);

  const messageLabel = document.createElement('label');
  messageLabel.classList.add('gfield_label', 'gform-field-label');
  messageLabel.htmlFor = 'input_1_5';
  messageLabel.textContent = 'Message';
  messageField.append(messageLabel);

  const messageInputContainer = document.createElement('div');
  messageInputContainer.classList.add('ginput_container', 'ginput_container_textarea');
  messageField.append(messageInputContainer);

  const messageTextarea = document.createElement('textarea');
  messageTextarea.name = 'input_5';
  messageTextarea.id = 'input_1_5';
  messageTextarea.classList.add('textarea', 'large');
  messageTextarea.placeholder = 'Your message';
  messageTextarea.setAttribute('aria-invalid', 'false');
  messageTextarea.rows = '10';
  messageTextarea.cols = '50';
  messageTextarea.value = messageRow?.querySelector('p')?.textContent || '';
  messageInputContainer.append(messageTextarea);

  const gformFooter = document.createElement('div');
  gformFooter.classList.add('gform-footer', 'gform_footer', 'top_label');
  form.append(gformFooter);

  const submitButton = document.createElement('input');
  submitButton.type = 'submit';
  submitButton.id = 'gform_submit_button_1';
  submitButton.classList.add('gform_button', 'button');
  submitButton.setAttribute('onclick', 'gform.submission.handleButtonClick(this);');
  submitButton.setAttribute('data-submission-type', 'submit');
  submitButton.value = 'Submit';
  gformFooter.append(submitButton);

  const hiddenInputs = [
    { name: 'gform_ajax', value: 'form_id=1&title=1&description=1&tabindex=0&theme=gravity-theme&styles=[]&hash=2de067ee5b08f35e1a7f1532febbffa2' },
    { class: 'gform_hidden', name: 'gform_submission_method', 'data-js': 'gform_submission_method_1', value: 'iframe' },
    { class: 'gform_hidden', name: 'gform_theme', 'data-js': 'gform_theme_1', id: 'gform_theme_1', value: 'gravity-theme' },
    { class: 'gform_hidden', name: 'gform_style_settings', 'data-js': 'gform_style_settings_1', id: 'gform_style_settings_1', value: '[]' },
    { class: 'gform_hidden', name: 'is_submit_1', value: '1' },
    { class: 'gform_hidden', name: 'gform_submit', value: '1' },
    { class: 'gform_hidden', name: 'gform_unique_id', value: '' },
    { class: 'gform_hidden', name: 'state_1', value: 'WyJ7XCIxMFwiOltcImRkNDc5NGMxMzVmYTMwZGRjOTI4MjQzZTBmNTY1ODBkXCIsXCJmNWU4Y2JjYjg1ZDZlNDdjN2UyYzMwMTdhMzhmOTg5ZlwiLFwiYzkwNTQyZTcxZTI3OWY2NzVkNTM1ZjUxNWU0NTRmNzRcIixcIjUzMmUwYzRmNThjYWRkYWJlNTA3N2QzMDg3ZWYxNzE1XCIsXCJlMjg1ZjIxMjhiNTkzMDlkMzE2MzA3OTM4N2VjZjllOVwiLFwiNWMwMTZmMGUxNTI0ZTBhOTYxMTg0NmIyNWVjYjhmMmVcIixcIjAwMjM1NDQyMzdlNmM3YjlhNjcyMjBlNGY0N2NhYWU0XCIsXCIwZTMyMWYzZDk5ZWI5Y2MzM2MzMTYyMjZjNzcyY2M2ZFwiLFwiMDNmNGQxNzhkODdkZTQyYWMwNDBmNjFmOGQyOGI0ZjFcIixcIjk1OTI2MWIxZTNiMzFmMjg1N2RjODIyYTIzMTFmMjRmXCIsXCI2YWJiMDU2YTZiOGE1NzA5ZWRjYzk2ODU1Y2M0ODM5YVwiLFwiYWQ1ZTVkY2UwM2JlMTFlZDViNGZjYTRjOTgzMjVmYWRcIixcImEyYjA5NWYwNTgyMDdkYzJkZTViZGY2YzYxNjA1MTQzXCIsXCI1Nzc1ZGIzMzBkNGU4YWY1OTkyYjUzZWVhZmZiZWQzNVwiLFwiNzY2NjhjNTFkNTBmM2Q1ZmViOTFmNWY5OWM3ZDlmMDVcIixcIjRhMDQxMDk2YTljNDAyMzJhZWZlMjMyOWEwYjYzMTQ1XCIsXCI1ZjlhOTZlZGJhYTA3ODMzMjJiNzU1ZDdkNjMxNDJhM1wiLFwiMjM0ZmNhOTU0MWQ3MDAyY2NhYmUzNGJiY2YyZmM4NzdcIixcImUzZjE3ZjBhZjk3NTk5MzllNzAyMjFmZjVhZTMyN2NkXCIsXCJjZDQzMzQwMjM2NjZjMTE3OGU2ODlhM2NhOWMwNjc0MlwiLFwiMzEzMjJhYjJlY2EyNzg5NzllYjk0MTdhMGIyMTg1ZDhcIixcIjMxZDYyYTdlNTk0YzNjN2I4NmEyODVmMjM3ZTRiMWRlXCIsXCIyOGRjNmY0MTk3N2IwYzY4N2ZhMDI1MTMzZDlhNTU2NVwiLFwiMDBiNDgyOWRjYjU4YjQ3NjdjN2Q1NzNmMTI5MWQ0ZjZcIixcImIxZThlYjI2NGVjNzYxZWRkNmJlNjQxZGM5NmIzN2FhXCIsXCJlMDE1MjIyNmQyOWNmZGRhMDFkMDhmNTI1ZGJmM2ZiN1wiLFwiMzcxNDAxMTk4M2JlM2E2ZjY3NjU0ZjMzYjEzYTM5ODlcIixcIjMyYjQ5MmZlOTA5NmI2NDUyZjk4YjkxOTVjNGIxMDhmXCIsXCJiMjViNzI3Nzk4M2M4NWQzZjg0NzVjYWY2OTBlOTIzNlwiLFwiYzJkYzIwYzYxNjk3ZWVjMjA2MGRmMjkwOTdkMDc1MjhcIixcImRjMTQyZTE0ZDNiNmZhMzczNTdiOTUxNzBkNTBhY2M2XCIsXCI4MWRjYzA2MDFhYjExNzUyNzI4Mzc4YjhkNTMwMGU5ZlwiLFwiMGFiNGZhZWYyNjJmZjcyYTI5OTFmNWQ2ZTc1YWI2MGJcIixcImY3MGMxOGYzZWE2NmNkNGYwNmI3Y2NjNGMwOWY3YTJlXCIsXCJhNWUwNWZiNzM2NDgwZmYwZjJjZjJlMjdkOTBkNTc5M1wiXX0iLCJhM2UwYWZlOTA3NzQ4ZmIxYzI4NjI2YTIyYWNiYWUyMSJd' },
    { autocomplete: 'off', class: 'gform_hidden', name: 'gform_target_page_number_1', id: 'gform_target_page_number_1', value: '0' },
    { autocomplete: 'off', class: 'gform_hidden', name: 'gform_source_page_number_1', id: 'gform_source_page_number_1', value: '1' },
    { name: 'gform_field_values', value: '' },
  ];

  hiddenInputs.forEach(attrs => {
    const input = document.createElement('input');
    input.type = 'hidden';
    for (const key in attrs) {
      input.setAttribute(key, attrs[key]);
    }
    gformFooter.append(input);
  });

  const gformVisibilityTest = document.createElement('span');
  gformVisibilityTest.id = 'gform_visibility_test_1';
  gformWrapper.append(gformVisibilityTest);

  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.style.width = '0px';
  iframe.style.height = '0px';
  iframe.src = 'about:blank';
  iframe.name = 'gform_ajax_frame_1';
  iframe.id = 'gform_ajax_frame_1';
  iframe.title = 'This iframe contains the logic required to handle Ajax powered Gravity Forms.';
  gformWrapper.append(iframe);

  const privacyParagraph = document.createElement('p');
  privacyParagraph.id = 'privacy';
  privacyParagraph.innerHTML = `By continuing, you agree to Fortune Food's <a href="https://www.fortunefoods.com/privacy-policy/">privacy policy</a><br> and <a href="https://www.fortunefoods.com/terms-and-conditions/">terms of use</a>.`;
  innerContainerForm.append(privacyParagraph);

  // Event listener for close button
  closeButton.addEventListener('click', () => {
    block.style.display = 'none';
  });

  block.textContent = '';
  block.append(modalBackdrop, dodBannerHp);
}
