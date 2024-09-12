import React from "react";

interface AlertProps {
  message: string;
  color: "red" | "green";
}

const Alert: React.FC<AlertProps> = ({ message, color }) => {
  const colorClasses: { [key in AlertProps["color"]]: string } = {
    red: "bg-red-100 border-red-400 text-red-700",
    green: "bg-green-100 border-green-400 text-green-700",
  };

  const selectedColorClass = colorClasses[color];

  return (
    <div
      className={`border-l-4 p-4 ${selectedColorClass} rounded-md shadow-md`}
    >
      <p className="text-md text-center">{message}</p>
    </div>
  );
};

export default Alert;
