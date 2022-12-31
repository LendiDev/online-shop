// Handles auth, forms data validations

const passwordIsStrong = (password) => {
  /*
  Ensure password has at least one lowercase letter.
  Ensure password has at least one uppercase letter.
  Ensure password has at least one digit.
  Ensure password has at least one special case letter.
  Ensure password has at least length of 6.
  Basic explanation: (?=(.*RULE){MIN_OCCURRENCE,MAX_OCCURRENCE]})   
  */
  const passwordRegex = new RegExp(
    `
    ^(?=(.*[a-z]){1,})
    (?=(.*[A-Z]){1,})
    (?=(.*[0-9]){1,})
    (?=(.*[!@#$%^&*()\-__+.])
    {1,}).{6,}$
    `
  );

  return passwordRegex.test(password);
};

module.exports = {
  passwordIsStrong,
};