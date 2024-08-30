// utils/inputHandlers.ts

import { Dispatch, SetStateAction, ChangeEvent } from "react";

// Define a generic function to handle input changes
export const handleInputChange =
  <T extends object>(setter: Dispatch<SetStateAction<T>>) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };
