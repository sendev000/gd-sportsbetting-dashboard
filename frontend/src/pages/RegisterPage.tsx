import { useState } from "react";
import { TextField, Button, Container, Typography, Card, CardContent } from "@mui/material";
import { useAuthStore } from "../store/authStore";
import { showToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const { registerUser } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Password validation function
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[0-9]).{6,}$/;
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must contain at least one number");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Handle registration with validation
  const handleRegister = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      showToast("Please fix errors before submitting", "error");
      return;
    }

    try {
      await registerUser(email, password);
      navigate("/");
    } catch (error) {
      showToast(error as string, "error");
    }
  };

  return (
    <Container className="flex justify-center items-center min-h-screen">
        <Card className="shadow-md rounded-lg w-[24rem]">
            <CardContent className="flex flex-col gap-4">
              <Typography variant="h4">Register</Typography>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateEmail(email)}
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validatePassword(password)}
                error={!!passwordError}
                helperText={passwordError}
              />
              <Button variant="contained" color="primary" onClick={handleRegister}>
                Register
              </Button>
              <Link to="/login" className="text-blue-500 text-sm">
                  Already registered? Click here
              </Link>
            </CardContent>
          </Card>
    </Container>
  );
};

export default RegisterPage;
