import { useNavigate } from "react-router-dom";
import { Button, Avatar, Tooltip } from "@mui/material";
import { useAuthStore } from "../store/authStore";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logoutUser } = useAuthStore();
  const userEmail = useAuthStore((state) => state.userEmail ? state.userEmail : ""); // Get Email.

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex items-center gap-3">
      <Tooltip title={userEmail || "No Email"}>
        <Avatar className="bg-blue-500 text-white">
          {userEmail ? userEmail.charAt(0).toUpperCase() : "?"}
        </Avatar>
      </Tooltip>
      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        className="!bg-red-500 hover:!bg-red-600"
      >
        Log out
      </Button>
    </div>
  );
};

export default LogoutButton;
