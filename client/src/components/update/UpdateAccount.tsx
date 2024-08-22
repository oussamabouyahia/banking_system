const UpdateAccount = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          My Profile
        </h3>

        <div className="mb-4">
          <label
            htmlFor="fname"
            className="block text-gray-700 font-medium mb-2"
          >
            Name:
          </label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="balance"
            className="block text-gray-700 font-medium mb-2"
          >
            Balance:
          </label>
          <input
            type="number"
            id="balance"
            name="balance"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Update My Account
        </button>
      </form>
    </div>
  );
};

export default UpdateAccount;
