const isRequired = (body, requiredProperties) => {
  for (const property of requiredProperties) {
    if (!body.hasOwnProperty(property) || body[property] === null || body[property] === undefined || body[property] === "") {
      return `${property} is mandatory.`;
    }
  }
  return null;
};

export default isRequired
