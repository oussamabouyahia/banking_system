import React from "react";

interface ConfirmProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmProps) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.message}>{message}</p>
        <div style={styles.buttons}>
          <button onClick={onConfirm} style={styles.confirmButton}>
            Confirm
          </button>
          <button onClick={onCancel} style={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "600px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column", // Ensure a column layout for the children
    alignItems: "center", // Center items horizontally
  },
  title: {
    marginBottom: "10px",
    color: "#333",
    fontSize: "18px",
    fontWeight: "bold",
  },
  message: {
    marginBottom: "20px",
    color: "#555",
    fontSize: "16px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%", // Ensure the buttons take full width of the container
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    flex: 1, // Make the button expand to take equal space
    marginRight: "10px",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    color: "#333",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    flex: 1, // Make the button expand to take equal space
  },
};

export default ConfirmDialog;
