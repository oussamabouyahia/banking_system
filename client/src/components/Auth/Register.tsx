import Button from "../utils Components/Button";

interface RegisterProps {
  userRegistration: { name: string; email: string; password: string };
  handleRegistrationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  registrationSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  nameError: string;
  emailError: string;
  passwordError: string;
}
const Register = ({
  userRegistration,
  handleRegistrationChange,
  registrationSubmit,
  nameError,
  emailError,
  passwordError,
}: RegisterProps) => {
  const isDisabled =
    nameError.length > 0 ||
    emailError.length > 0 ||
    passwordError.length > 0 ||
    userRegistration.name.trim().length === 0 ||
    userRegistration.password.trim().length === 0;
  return (
    <form onSubmit={registrationSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your name"
          onChange={handleRegistrationChange}
          value={userRegistration.name}
        />
        {nameError && <p className="text-red-500 text-sm mt-2">{nameError}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your email"
          onChange={handleRegistrationChange}
          value={userRegistration.email}
        />
        {emailError && (
          <p className="text-red-500 text-sm mt-2">{emailError}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <input
          type="password"
          name="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your password"
          onChange={handleRegistrationChange}
          value={userRegistration.password}
        />
        {passwordError && (
          <p className="text-red-500 text-sm mt-2">{passwordError}</p>
        )}
      </div>

      <Button isDisabled={isDisabled} text="Register" />
    </form>
  );
};

export default Register;
