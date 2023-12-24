export const tokenDateExp = (expire) => {
  if (!expire) return "Expiration time is mandatory.";
  
  const expirationTime = parseInt(expire);

  if (!expirationTime || isNaN(expirationTime)) {
    return "Expiration time must be a valid number representing a Unix timestamp.";
  }

  const now = Math.floor(Date.now() / 1000);
  const remainingTime = expirationTime - now;

  if (remainingTime <= 0) {
    return "The token has expired.";
  }

  const remainingMinutes = Math.floor(remainingTime / 60);
  const remainingHours = Math.floor(remainingMinutes / 60);
  const remainingMinutesAfterLastHour = remainingMinutes % 60;

  if (remainingHours > 0) {
    return `The token expires in ${remainingHours} hours and ${remainingMinutesAfterLastHour} minutes.`;
  } else if (remainingMinutesAfterLastHour > 0) {
    return `The token expires in ${remainingMinutesAfterLastHour} minutes.`;
  } else {
    return "The token will expire soon.";
  }
};
