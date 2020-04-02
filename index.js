const form = document.querySelector(".contact-form");

const nameInputField = document.querySelector(
  '.contact-form input[name="name"]'
);

const emailInputField = document.querySelector(
  '.contact-form input[name="email"]'
);

const messageTextArea = document.querySelector(
  '.contact-form textarea[name="message"]'
);

const showPopup = () => {
  document.body.classList.add("show-popup");
};

const closePopup = () => {
  document.body.classList.remove("show-popup");
  clearContactForm();
};

const clearContactForm = () => {
  nameInputField.value = null;
  emailInputField.value = null;
  messageTextArea.value = null;
};

const clearErrorMessages = () => {
  document.querySelectorAll(".error-message").forEach(errorMessage => {
    errorMessage.classList.remove("show");
  });
};

const showErrorMessage = selector => {
  document.querySelector(selector).classList.add("show");
};

form.addEventListener("submit", event => {
  event.preventDefault();
  clearErrorMessages();

  const name = nameInputField.value;
  const email = emailInputField.value;
  const message = messageTextArea.value;

  const nameValid = name && name != "";
  const emailValid = email && email != "" && /\w+@\w+\.\w+/.test(email);
  const messageValid = message && message != "";

  if (nameValid && emailValid && messageValid) {
    showPopup();
  } else {
    if (!nameValid) {
      showErrorMessage(".error-message-name");
    }
    if (!emailValid) {
      showErrorMessage(".error-message-email");
    }
    if (!messageValid) {
      showErrorMessage(".error-message-message");
    }
  }
});

document.querySelector(".popup .btn").addEventListener("click", closePopup);
