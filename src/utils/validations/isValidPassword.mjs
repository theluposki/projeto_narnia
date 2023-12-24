const msgError = `1. Must be at least 12 characters long.
2. Must contain at least one capital letter (A-Z).
3. It must contain at least one special character among the following: @, #, $, %, ^, &, +, =, * or !.
4. Must not contain 3 to 12 digit sequential numbers such as 123, 4567, 89012, etc.
Valid password example: MyPassw0rd#2023`;

const isValidPassword = (password) => {
  const _regexPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{12,}$/;

  const result = _regexPassword.test(password);

  if (!result) return msgError;

  return null;
};

export default isValidPassword;
