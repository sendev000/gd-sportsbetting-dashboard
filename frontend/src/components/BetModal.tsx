import React, { useState } from "react";
import { SportsEvent } from "../utils/types";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";

interface BetModalProps {
  event: SportsEvent;
  onClose: () => void;
}

const BetModal: React.FC<BetModalProps> = ({ event, onClose }) => {
  const [betAmount, setBetAmount] = useState<string>("");

  const handlePlaceBet = () => {
    if (Number(betAmount) > 0) {
      toast.success("Bet placed successfully!", { autoClose: 1000 });
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      toast.error("Please enter a valid bet amount.");
    }
  };

  return (
    <Dialog open={true} maxWidth="xs" fullWidth>
      <DialogTitle>Place Bet</DialogTitle>
      <DialogContent dividers className="flex flex-col gap-4">
        <p className="text-gray-700">
          <strong>{event.event_name}</strong>
        </p>
        <p className="text-gray-600">Odds: {event.odds}</p>
        <TextField
          label="Bet Amount"
          type="number"
          variant="outlined"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          className="mt-2"
        />
      </DialogContent>
      <DialogActions>
        <Button fullWidth variant="contained" color="success" onClick={handlePlaceBet}>
          Confirm Bet
        </Button>
        <Button fullWidth variant="contained" color="error" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BetModal;
