import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface UserContextType {
  logged: boolean;
  setLogged: Dispatch<SetStateAction<boolean>>;
}
const defaultContextValue: UserContextType = {
  logged: false,
  setLogged: () => {},
};
const UserContext = createContext<UserContextType>(defaultContextValue);

interface ContextProps {
  children: ReactNode;
}

const UserProvider = ({ children }: ContextProps) => {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setLogged(true);
    }
  }, []);
  const contextValue: UserContextType = { logged, setLogged };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
