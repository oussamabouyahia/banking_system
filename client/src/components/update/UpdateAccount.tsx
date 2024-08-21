import "./UpdateAccount.css";
const UpdateAccount = () => {
  return (
    <div>
      <form>
        <label htmlFor="fname"> Name:</label>
        <input
          type="text"
          id="fname"
          name="firstname"
          placeholder="Your name.."
        />

        <label htmlFor="balance">Balance:</label>
        <input type="number" id="balance" name="balance" />

        <input type="submit" value="update my account" />
      </form>
    </div>
  );
};

export default UpdateAccount;
