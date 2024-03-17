import { Input } from "@nextui-org/react";

import AttachmentsUploader from "./AttachmentsUploader";
import { Editor } from "./rich-text-editor";

function EmailBody({
  attachments,
  setAttachments,
  emailSubject,
  setEmailSubject,
  emailBody,
  setEmailBody,
}) {
  return (
    <div className="mt-8">
      <Input
        name="subject"
        size="sm"
        className="px-4"
        label="Subject"
        value={emailSubject}
        onValueChange={(value) => setEmailSubject(value)}
      />
      <Editor content={emailBody} setContent={setEmailBody} />
      <AttachmentsUploader
        attachments={attachments}
        setAttachments={setAttachments}
      />
    </div>
  );
}

export default EmailBody;
