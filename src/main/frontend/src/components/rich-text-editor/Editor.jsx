import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const Editor = ({ content, setContent }) => {
  // Function to handle content change
  const handleContentChange = (value) => {
    setContent(value);
  };

  return (
    <div className="text-foreground bg-background max-w-[940px]">
      <ReactQuill
        modules={modules}
        className="bg-background text-foreground p-4 rounded-lg"
        theme="snow" // You can choose a different theme if you prefer
        value={content}
        onChange={handleContentChange}
      />
    </div>
  );
};

export default Editor;
