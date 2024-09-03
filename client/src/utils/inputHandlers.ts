import { Dispatch, SetStateAction, ChangeEvent } from "react";

// this is a generic function to handle input changes, it has the setState as parameter
export const handleInputChange =
  <T extends object>(setter: Dispatch<SetStateAction<T>>) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };
