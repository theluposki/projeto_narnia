export const hoursToMilliseconds = (hours) => {
  const millisecondsPerHour = 60 * 60 * 1000;
  const currentTimestamp = Date.now(); 
  const expirationTimestamp = Math.floor(currentTimestamp / 1000) + Number(hours) * (millisecondsPerHour / 1000); // Calcula o timestamp de expiração em segundos
  return expirationTimestamp;
};
