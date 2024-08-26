interface ButtonProps {
  isDisabled: boolean;
  text: string;
}
const Button = ({ isDisabled, text }: ButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-300 ease-in-out ${
        isDisabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-green-600 text-white"
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
