import {
  useState,
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { AlertFormType } from "../types";

interface ContextProps {
  children: ReactNode;
}

const defaultValue: AlertValueType = {
  activeAlert: {
    show: false,
    message: "",
    color: "green",
  },
  setActiveAlert: () => {},
};

interface AlertValueType {
  activeAlert: AlertFormType;
  setActiveAlert: Dispatch<SetStateAction<AlertFormType>>;
}

const AlertContext = createContext<AlertValueType>(defaultValue);

const AlertProvider = ({ children }: ContextProps) => {
  const [activeAlert, setActiveAlert] = useState<AlertFormType>({
    show: false,
    message: "",
    color: "green",
  });
  useEffect(() => {
    if (activeAlert.show) {
      const timer = setTimeout(
        () => setActiveAlert((prev) => ({ ...prev, show: false })),
        2000
      );
      return () => clearTimeout(timer);
    }
  }, [activeAlert.show]);

  const alertValue: AlertValueType = { activeAlert, setActiveAlert };

  return (
    <AlertContext.Provider value={alertValue}>{children}</AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };
