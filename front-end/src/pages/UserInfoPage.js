import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";

export const UserInfoPage = () => {
  const user = useUser();
  const [token, setToken] = useToken();

  const { id, email, info } = user;

  const [nickname, setNickname] = useState(info.nickname || "");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // This useEffect hook automatically hides the
  // success and error messages after 3 seconds when they're shown.
  // Just a little user interface improvement.
  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const history = useHistory();

  const saveChanges = async () => {
    try {
      const response = await axios.put(
        `/api/users/${id}`,
        {
          nickname,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { token: newToken } = response.data;
      setToken(newToken);
      setShowSuccessMessage(true);
    } catch (error) {
      setShowErrorMessage(true);
    }
  };

  const resetValues = () => {
    setNickname(info.nickname);
  };

  return (
    <div className="w-2/5 mt-36 mx-auto rounded-md p-8">
      <button
        className="mb-8 dark:text-dark-mode-text"
        onClick={() => history.push("/")}>
        &larr; Back Home
      </button>
      <h1 className="text-2xl font-normal mb-5 dark:text-dark-mode-text">
        Edit My Profile
      </h1>

      <h2 className="mb-5 font-medium dark:text-dark-mode-text">
        User with email: {email}
      </h2>

      {showSuccessMessage && (
        <div className="mb-3 rounded bg-green-500 p-3 text-white">
          Successfully updated info
        </div>
      )}
      {showErrorMessage && (
        <div className="mb-3 rounded bg-red-500 p-3 text-white">
          Uh oh... something wasn't right
        </div>
      )}
      <label className="font-normal block mb-2 dark:text-dark-mode-text">
        Nickname
      </label>
      <input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="block w-full border border-slate-300 p-2.5 mb-5 rounded outline-none dark:bg-dark-mode-bg dark:text-dark-mode-text dark:border-slate-700"
        placeholder="Enter a new nickname"
      />
      <button
        onClick={saveChanges}
        className="block bg-violet-600 text-white font-medium py-2 px-6 rounded mb-5 cursor-pointer hover:bg-violet-800">
        Save
      </button>
      <button
        className="block bg-slate-400 text-white font-medium py-2 px-6 rounded mb-5 cursor-pointer hover:bg-slate-600"
        onClick={resetValues}>
        Reset Value
      </button>
    </div>
  );
};
