import colors from "@colors/colors";

export const err = (path, message, error) => {
  return console.log(`[${colors.green(path)}] ${colors.yellow("=>")} ${colors.red(message)} ${error ? ":: "+colors.red(error) : ""} `)
}

export const log = (path, message) => {
  return console.log(`[${colors.green(path)}] ${colors.yellow("=>")} ${colors.cyan(message)} `)
}

export const warn = (path, message) => {
  return console.log(`[${colors.green(path)}] ${colors.yellow("=>")} ${colors.yellow(message)} `)
}

export default {
  log,
  err,
  warn
}
