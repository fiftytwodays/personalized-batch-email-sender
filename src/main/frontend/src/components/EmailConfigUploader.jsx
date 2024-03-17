import { useState } from "react";
import hasEmailConfiguration from "../lib/validate-email-props";
import toast from "react-hot-toast";
import { Trash } from "./icons";
import { UploadIcon } from "./icons";

function EmailConfigUploader({ setEmailProperties }) {
  const [fileName, setFileName] = useState("");

  //   const setInputEmailPropValues = (properties) => {
  //     senderRef.current.value = properties?.emailConfiguration?.sender;
  //     hostRef.current.value = properties?.emailConfiguration?.host;
  //     usernameRef.current.value = properties?.emailConfiguration?.username;
  //     passwordRef.current.value = properties?.emailConfiguration?.password;
  //     portRef.current.value = properties?.emailConfiguration?.port;
  //     smtpAuthRef.current.checked = properties?.emailConfiguration?.smtpAuth;
  //     startTLSRef.current.checked =
  //       properties?.emailConfiguration?.startTLSEnable;

  //     replyToRef.current.value = properties?.emailConfiguration?.replyTo;
  //     receiverRef.current.value = properties?.receiver;
  //   };

  const handleFileUpload = (event) => {
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
      if (hasEmailConfiguration(parsedData)) {
        toast.success("Valid JSON Config");
        setEmailProperties({
          sender: parsedData?.emailConfiguration?.sender,
          host: parsedData?.emailConfiguration?.host,
          username: parsedData?.emailConfiguration?.username,
          password: parsedData?.emailConfiguration?.password,
          port: parseInt(parsedData?.emailConfiguration?.port, 10),
          smtpAuth: parsedData?.emailConfiguration?.smtpAuth,
          startTLSEnable: parsedData?.emailConfiguration?.startTLSEnable,
          replyTo: parsedData?.emailConfiguration?.replyTo,
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

    setEmailProperties({
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
          onChange={handleFileUpload}
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

export default EmailConfigUploader;
