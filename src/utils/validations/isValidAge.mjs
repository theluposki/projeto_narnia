const isValidAge = (birthdate) => {
  if(!birthdate) return "birthdate is mandatory.";

  if(birthdate.split("-").length != 3) {
    return `format error [${birthdate}]` 
  }
  
  const currentDate = new Date().getFullYear();
  const year = new Date(birthdate).getFullYear()
  const age = currentDate - year;

  if(age <= 17) {
    return `${age} cannot be underage.`
  }

  if(age > 130) {
    return `${age} maximum age reached.`
  }

  return null
};

export default isValidAge
