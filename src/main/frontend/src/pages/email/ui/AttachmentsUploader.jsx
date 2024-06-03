import { PaperClipIcon, Trash } from "src/components/icons";

const AttachmentsUploader = ({ attachments, setAttachments }) => {
  const uploadAttachments = (e) => {
    const newAttachments = [...attachments, ...e.target.files];
    setAttachments(newAttachments);
  };

  const removeFile = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  return (
    <div className="mt-6 px-4">
      <label
        htmlFor="fileInput"
        className="text-sm text-foreground flex gap-2 items-center cursor-pointer"
      >
        <PaperClipIcon className="flex align-middle h-4 w-4" />
        <span>Upload attachments</span>
      </label>
      <input
        type="file"
        name="fileInput"
        id="fileInput"
        className="hidden"
        onChange={uploadAttachments}
        multiple
      />

      <div className="flex gap-2  mt-4 flex-wrap">
        {attachments.map((file, index) => (
          <div
            key={index}
            className="p-2 text-foreground bg-zinc-100 rounded-md w-36 h-16 border border-gray-200 flex flex-col justify-between dark:bg-zinc-900 dark:border-zinc-800"
          >
            <div className="text-xs truncate">{file.name}</div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-600">
                {(file.size / 1024).toFixed(2)} KB
              </div>
              <div className="cursor-pointer" onClick={() => removeFile(index)}>
                <Trash />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttachmentsUploader;
