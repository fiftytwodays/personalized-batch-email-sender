export function hasEmailConfiguration(obj) {
  // Check if the object contains the required properties
  const { emailConfiguration } = obj;

  if (
    emailConfiguration &&
    typeof emailConfiguration === "object" &&
    Object.prototype.hasOwnProperty.call(emailConfiguration, "sender") &&
    typeof emailConfiguration.sender === "string" &&
    Object.prototype.hasOwnProperty.call(emailConfiguration, "host") &&
    typeof emailConfiguration.host === "string" &&
    Object.prototype.hasOwnProperty.call(emailConfiguration, "username") &&
    typeof emailConfiguration.username === "string" &&
    Object.prototype.hasOwnProperty.call(emailConfiguration, "password") &&
    typeof emailConfiguration.password === "string" &&
    Object.prototype.hasOwnProperty.call(emailConfiguration, "port") &&
    typeof emailConfiguration.port === "number" &&
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

  console.log("att: ", attachments);
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
