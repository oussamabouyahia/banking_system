import AuthPage from "../Auth/AuthPage";
interface ProtectedRouteProps {
  children: React.ReactNode;
  authenticated: boolean;
}
const ProtectedRoute = ({ children, authenticated }: ProtectedRouteProps) => {
  return authenticated ? <>{children}</> : <AuthPage />;
};

export default ProtectedRoute;
