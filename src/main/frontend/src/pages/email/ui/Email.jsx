import { Input } from "@nextui-org/react";

import AttachmentsUploader from "./AttachmentsUploader";
import RichTextEditor from "./RichTextEditor";
import { useAppStore } from "src/store/app-store";

function Email() {
  const emailContent = useAppStore((state) => state.email.content);
  const updateEmailContent = useAppStore((state) => state.updateEmailContent);

  return (
    <div className="mt-8">
      <Input
        name="subject"
        size="sm"
        className="px-4"
        label="Subject"
        value={emailContent?.subject}
        onValueChange={(value) => updateEmailContent({ subject: value })}
      />
      <RichTextEditor
        content={emailContent?.body}
        setContent={(value) => updateEmailContent({ body: value })}
      />
      <AttachmentsUploader
        attachments={emailContent?.attachments}
        setAttachments={(value) => updateEmailContent({ attachments: value })}
      />
    </div>
  );
}

export default Email;
