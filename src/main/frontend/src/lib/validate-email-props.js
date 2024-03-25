export function hasEmailConfiguration(obj) {
  // Check if the object contains the required properties
  const { emailConfiguration } = obj;

  if (
    emailConfiguration &&
    typeof emailConfiguration === "object" &&
    emailConfiguration.sender.trim() !== "" &&
    typeof emailConfiguration.sender === "string" &&
    emailConfiguration.host.trim() !== "" &&
    typeof emailConfiguration.host === "string" &&
    emailConfiguration.username.trim() !== "" &&
    typeof emailConfiguration.username === "string" &&
    emailConfiguration.password.trim() !== "" &&
    typeof emailConfiguration.password === "string" &&
    Object.prototype.hasOwnProperty.call(emailConfiguration, "port") &&
    typeof emailConfiguration.port === "number" &&
    emailConfiguration.port >= 0 &&
    emailConfiguration.port <= 65535 &&
    Object.prototype.hasOwnProperty.call(emailConfiguration, "smtpAuth") &&
    typeof emailConfiguration.smtpAuth === "boolean" &&
    Object.prototype.hasOwnProperty.call(
      emailConfiguration,
      "startTLSEnable"
    ) &&
    typeof emailConfiguration.startTLSEnable === "boolean"
  ) {
    return true;
  } else {
    return false;
  }
}

export function hasEmailProps(emailProps) {
  const { emailSubject, emailBody, attachments } = emailProps;

  // Check emailSubject
  if (typeof emailSubject !== "string") {
    return false;
  }

  // Check emailBody
  if (typeof emailBody !== "string" || !/<[a-z][\s\S]*>/i.test(emailBody)) {
    return false;
  }

  // Check emailAttachments
  if (attachments && !Array.isArray(attachments)) {
    return false;
  }

  return true;
}

export default hasEmailConfiguration;
