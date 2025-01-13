import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  OutlinedInput,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { serverBaseUrl } from "../../config/data";

const PlayerCreateModal = ({
  open,
  onClose,
  serverId,
  callback,
}: {
  open: boolean;
  onClose: () => void;
  serverId: string;
  callback?: (arg: any) => void;
}) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePlayerCreate = async () => {
    try {
      const res = await axios.post(serverBaseUrl + "/player", {
        name: name,
        gameServerId: serverId,
      });
      callback?.(res.data);
      onClose();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} fullWidth maxWidth={"sm"}>
      <DialogTitle>
        <Typography variant={"h3"}>Enter Name</Typography>
      </DialogTitle>
      <DialogContent>
        <OutlinedInput
          fullWidth
          placeholder="type here..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormHelperText error>{error}</FormHelperText>
      </DialogContent>
      <DialogActions>
        <Button
          variant={"contained"}
          color={"primary"}
          disabled={!name}
          onClick={handlePlayerCreate}
        >
          {loading ? "Loading..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlayerCreateModal;
