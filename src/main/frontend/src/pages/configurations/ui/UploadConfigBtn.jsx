import { useState } from "react";
import toast from "react-hot-toast";

import { Trash, UploadIcon } from "src/components/icons";
import { isValidEmailConfig } from "../lib/validate-email-config";

function UploadConfigBtn({ updateEmailConfig }) {
  const [fileName, setFileName] = useState("");

  const uploadFile = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const fileType = getFileType(file);
    if (fileType === "json") {
      parseJSON(file);
    } else {
      toast.error("Unsupported file type!");
    }
    event.target.value = "";
  };

  const getFileType = (file) => {
    if (file) {
      const fileName = file.name;
      setFileName(fileName);
      const fileType = fileName.split(".").pop().toLowerCase();
      return fileType;
    }
  };

  const parseJSON = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      const parsedData = JSON.parse(content);
      if (isValidEmailConfig(parsedData)) {
        toast.success("Valid JSON Config");
        updateEmailConfig({
          sender: parsedData?.sender,
          host: parsedData?.host,
          username: parsedData?.username,
          password: parsedData?.password,
          port: parseInt(parsedData?.port, 10),
          smtpAuth: parsedData?.smtpAuth,
          startTLSEnable: parsedData?.startTLSEnable,
          replyTo: parsedData?.replyTo,
          receiver: parsedData?.receiver,
        });
      } else {
        toast.error("Invalid JSON configuration");
      }
    };

    reader.readAsText(file);
  };

  const removeJSONConfig = () => {
    setFileName("");

    updateEmailConfig({
      sender: "",
      host: "",
      username: "",
      port: "",
      smtpAuth: true,
      startTLSEnable: true,
      replyTo: "",
      receiver: "",
    });
  };

  return (
    <div className="flex justify-center">
      <div>
        <input
          className="hidden"
          id="upload-json-email-config"
          name="input-json-config"
          type="file"
          accept=".json"
          onChange={uploadFile}
        />

        <label
          className="text-foreground cursor-pointer flex justify-center gap-3 overflow-hidden whitespace-nowrap truncate w-64"
          htmlFor="upload-json-email-config"
        >
          <span className="truncate">
            {fileName || "Upload JSON Configuration"}
          </span>
          {!fileName && <UploadIcon className="w-5 h-5" />}
        </label>
      </div>
      {fileName && (
        <span onClick={removeJSONConfig}>
          <Trash />
        </span>
      )}
    </div>
  );
}

export default UploadConfigBtn;
