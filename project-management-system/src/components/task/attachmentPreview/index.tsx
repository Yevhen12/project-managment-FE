import { Dialog, DialogContent, IconButton } from "@mui/material";
import { useState } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";

type AttachmentProps = {
  id: string;
  name: string;
  url: string;
  onDelete: (id: string) => void;
};

export const AttachmentPreview = ({ id, name, url, onDelete }: AttachmentProps) => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const isImage = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);

  const handleOpen = () => {
    if (isImage) setOpen(true);
    else window.open(url, "_blank");
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // не відкривати зображення при натисканні на іконку
    onDelete(id);
  };

  return (
    <>
      <div
        onClick={handleOpen}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "relative",
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
        }}
      >
        {hover && (
          <IconButton
            onClick={handleDelete}
            size="small"
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              backgroundColor: "rgba(255,255,255,0.8)",
              zIndex: 2,
            }}
          >
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        )}

        {isImage ? (
          <img
            src={url}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <InsertDriveFileIcon style={{ fontSize: 48, color: "#757575" }} />
        )}
      </div>

      {isImage && (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
          <DialogContent style={{ padding: 0 }}>
            <img
              src={url}
              alt={name}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
