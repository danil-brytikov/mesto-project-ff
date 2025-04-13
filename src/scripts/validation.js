export {enableValidation, clearValidation}


function clearValidation(formValidationProf, validationConfig){
  const InputsErrorsSelAll = formValidationProf.querySelectorAll(validationConfig.inputSelector);
  const subButtn = formValidationProf.querySelector(validationConfig.submitButtonSelector);
  
  toggleButtonSubmit(validationConfig, subButtn, formValidationProf);

  InputsErrorsSelAll.forEach((inputError) => 
    hideError(validationConfig, inputError, formValidationProf)
  );
};

function enableValidation(settings) {
  const Forms = document.querySelectorAll(settings.formSelector);

  Forms.forEach((form) => CheckInputs(settings, form));
};


function CheckInputs(settings, form) {
  const Inputs = form.querySelectorAll(settings.inputSelector);
  const subButtn = form.querySelector(settings.submitButtonSelector);

  Inputs.forEach((input) => {
   input.addEventListener('input', () => {
      CheckValidity(settings, input, form);
      toggleButtonSubmit(settings, subButtn, form);
    });
  });
};

function showError(settings, input, form) {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  formError.classList.add(settings.errorClass);

  formError.textContent = input.validationMessage;
};

function hideError(settings, input, form) {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  formError.classList.remove(settings.errorClass);

  formError.textContent = null;
};

function CheckValidity(settings, input, form) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  };

  if (!input.validity.valid) {
    showError(settings, input, form);
  } else {
    hideError(settings, input, form); 
  };
};

function toggleButtonSubmit(settings, buttonSubmit, form){
  if (!form.checkValidity()) { 
    buttonSubmit.disabled = true;
    buttonSubmit.classList.add(settings.inactiveButtonClass);
  } else {
    buttonSubmit.disabled = false;
    buttonSubmit.classList.remove(settings.inactiveButtonClass);
  };
};


