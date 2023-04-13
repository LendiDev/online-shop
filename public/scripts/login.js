const loginAsSelectElement = document.getElementById("login_as");

const emailInputElement = document.getElementById("email");
const passwordInputElement = document.getElementById("password");

const autoFillCredentials = (email, password) => {
  emailInputElement.value = email;
  passwordInputElement.value = password;
};

const loginAsChanged = (e) => {
  const { value: valueSelected } = e.target;

  switch (valueSelected) {
    case "user1":
      autoFillCredentials("user@mail.com", "12345678");
      break
    case "user2":
      autoFillCredentials("user2@mail.com", "12345678");
      break
    case "admin":
      autoFillCredentials("admin@mail.com", "12345678");
      break
    default:
      autoFillCredentials("", "");
  }
};

loginAsSelectElement.addEventListener("change", loginAsChanged);
