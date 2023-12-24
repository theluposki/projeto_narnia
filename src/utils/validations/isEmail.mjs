const isEmail = (email) => {
  const _regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const result = _regexEmail.test(email);
  
  const msgError = "invalid email."
  
  if (!result) return msgError

  return null
};

export default isEmail
