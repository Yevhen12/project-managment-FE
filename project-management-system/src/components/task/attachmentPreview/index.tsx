import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"; // <-- Іконка файла

type AttachmentProps = {
  name: string;
  url: string;
  type: "image" | "file";
};

export const AttachmentPreview = ({ name, url, type }: AttachmentProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenImage = () => {
    if (type === "image") {
      setOpen(true);
    } else {
      window.open(url, "_blank"); // якщо файл — просто відкриваємо в новій вкладці
    }
  };

  return (
    <>
      <div
        onClick={handleOpenImage}
        style={{
          cursor: "pointer",
          width: "150px",
          height: "150px",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {type === "image" ? (
          <img
            src={url}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <InsertDriveFileIcon style={{ fontSize: 48, color: "#757575" }} />
        )}
      </div>

      {/* Модалка для картинки */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <DialogContent style={{ padding: 0 }}>
          <img
            src={url}
            alt={name}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
