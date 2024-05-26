export function isValidEmailConfig(config) {
  // Check if the object contains the required emailConfiguration object
  if (typeof config !== "object" || config === null) {
    return false;
  }

  // Define the required fields and their types
  const requiredFields = {
    sender: "string",
    host: "string",
    username: "string",
    password: "string",
    port: "number",
    smtpAuth: "boolean",
    startTLSEnable: "boolean",
    replyTo: "string",
  };

  // Check if all required fields are present and have the correct type
  for (const [field, type] of Object.entries(requiredFields)) {
    if (
      !Object.prototype.hasOwnProperty.call(config, field) ||
      typeof config[field] !== type
    ) {
      return false;
    }
  }

  return true;
}

export default isValidEmailConfig;
