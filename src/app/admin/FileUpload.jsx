import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

const FileUpload = ({ setHouseImages }) => {
  const [images, setImages] = useState([]); // Local state for preview
  const inputRef = useRef(null);

  const handleFileSelect = () => {
    inputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const selectedFiles = Array.from(event.target.files); // Convert FileList to an array
  
    // Update local preview
    const imagePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imagePreviews]);
  
    // Update parent state with the actual files
    setHouseImages((prev) => [...(prev || []), ...selectedFiles]);
  };
  

  return (
    <div className="bg-muted h-32 flex flex-col sm:flex-row sm:py-0 py-3 rounded items-center justify-between px-5">
      <div className="flex gap-3">
        {images.length > 0 &&
          images.map((url, index) => (
            <img src={url} key={index} className="h-20 w-20 rounded" />
          ))}
      </div>

      <h1 className="text-xl font-space">
        Upload Your Image <br />
        <span className="text-muted-foreground text-sm text-center">
          You can upload multiple images
        </span>
      </h1>

      <div className="flex flex-col max-w-fit justify-evenly h-full">
        <Button onClick={handleFileSelect}>
          <input
            type="file"
            ref={inputRef}
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
          Select Image
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
