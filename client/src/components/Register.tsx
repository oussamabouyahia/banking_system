interface RegisterProps {
  userRegistration: { name: string; email: string; password: string };
  handleRegistrationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  registrationSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const Register = ({
  userRegistration,
  handleRegistrationChange,
  registrationSubmit,
}: RegisterProps) => {
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
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
