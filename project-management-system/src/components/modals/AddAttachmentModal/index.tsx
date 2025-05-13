import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { UploadCloud, FileIcon } from "lucide-react";

type AddAttachmentModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (file: File) => void;
};

export const AddAttachmentModal = ({
  open,
  onClose,
  onAdd,
}: AddAttachmentModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
      } else {
        setPreviewUrl("");
      }
    }
  };

  const handleSubmit = () => {
    if (file) {
      onAdd(file);
      setFile(null);
      setPreviewUrl("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Attachment</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "8px",
        }}
      >
        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadCloud />}
        >
          Upload File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        {file && (
          <div style={{ textAlign: "center", marginTop: "8px" }}>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
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
        <Button onClick={handleSubmit} variant="contained" disabled={!file}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
