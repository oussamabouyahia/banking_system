import { Dispatch, SetStateAction } from "react";

function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export const validateInput = (
  setNameError: Dispatch<SetStateAction<string>>,
  setEmailError: Dispatch<SetStateAction<string>>,
  setPasswordError: Dispatch<SetStateAction<string>>,
  name: string,
  value: string
) => {
  if (name === "name") {
    if (value.length < 3) {
      setNameError("Name should be at least 3 characters");
    } else {
      setNameError("");
    }
  }

  if (name === "email") {
    if (!validateEmail(value)) {
      setEmailError("Email should be valid");
    } else {
      setEmailError("");
    }
  }

  if (name === "password") {
    if (value.length < 6) {
      setPasswordError("Password should be at least 6 characters");
    } else {
      setPasswordError("");
    }
  }
};
