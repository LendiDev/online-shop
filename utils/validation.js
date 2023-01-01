// Handles auth, forms data validations

const passwordIsStrong = (password) => {
  const passwordErrors = [];

  /*
  Ensure password has at least one lowercase letter.
  Ensure password has at least one uppercase letter.
  Ensure password has at least one digit.
  Ensure password has at least one special case letter.
  Ensure password has at least length of 8.
  Basic explanation: (?=(.*RULE){MIN_OCCURRENCE,MAX_OCCURRENCE]})   
  */
  const passwordContainsLowercaseLetter = /^(?=(.*[a-z]){1,})/.test(password);
  const passwordContainsUppercaseLetter = /^(?=(.*[A-Z]){1,})/.test(password);
  const passwordContainsDigit = /^(?=(.*[0-9]){1,})/.test(password);
  const passwordContainsSpecialCaseLetter =
    /^(?=(.*[!@#$%^&*()\-__+.]){1,})/.test(password);
  const passwordContainsMinLength = /.{8,}/.test(password);

  if (!passwordContainsLowercaseLetter) {
    passwordErrors.push("Password should contain lowercase letter");
  }
  if (!passwordContainsUppercaseLetter) {
    passwordErrors.push("Password should contain uppercase letter");
  }
  if (!passwordContainsDigit) {
    passwordErrors.push("Password should contain digit");
  }
  if (!passwordContainsSpecialCaseLetter) {
    passwordErrors.push("Password should contain special character");
  }
  if (!passwordContainsMinLength) {
    passwordErrors.push("Password length should be at least 8 characters");
  }

  return passwordErrors;
};

const emailIsValid = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

const isEmpty = (value) => {
  return !value || value.trim() === "";
};

const userCredentialsAreValid = (email, password) => {
  return email &&
  emailIsValid(email) &&
  password &&
  password.trim().length >= 8
}

const userDetailsAreValid = (
  email,
  password,
  name,
  street,
  postcode,
  city,
  country
) => {
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postcode) &&
    !isEmpty(city) &&
    !isEmpty(country)
  );
};

const emailIsConfirmed = (email, confirmEmail) => {
  return email === confirmEmail;
}

module.exports = {
  passwordIsStrong,
  userDetailsAreValid,
  emailIsConfirmed
};
