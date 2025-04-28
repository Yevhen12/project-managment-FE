import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { Attachment } from "../../../shared/types/task";
import { UploadCloud, FileIcon } from "lucide-react";

type AddAttachmentModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (attachment: Partial<Attachment>) => void;
};

export const AddAttachmentModal = ({ open, onClose, onAdd }: AddAttachmentModalProps) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [type, setType] = useState<"image" | "file">("image");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Якщо це картинка — створити прев'ю
      if (selectedFile.type.startsWith("image/")) {
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
        setType("image");
      } else {
        setPreviewUrl("");
        setType("file");
      }
    }
  };

  const handleSubmit = () => {
    if (name && file) {
      onAdd({
        name,
        url: previewUrl || "", // У реальному проекті замінити на реальне завантаження
        type,
      });
      // Очищення полів
      setName("");
      setFile(null);
      setPreviewUrl("");
      setType("image");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Attachment</DialogTitle>
      <DialogContent style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "8px" }}>
        
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadCloud />}
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>

        {/* Прев'ю або іконка */}
        {file && (
          <div style={{ textAlign: "center", marginTop: "8px" }}>
            {type === "image" ? (
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "8px", cursor: "pointer" }}
                onClick={() => window.open(previewUrl, "_blank")}
              />
            ) : (
              <FileIcon size={48} />
            )}
          </div>
        )}

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Add</Button>
      </DialogActions>
    </Dialog>
  );
};
