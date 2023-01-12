import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";

export const SignUpPage = () => {
  const [token, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const history = useHistory();

  const onSignUpClicked = async () => {
    const response = await axios.post("/api/signup", {
      email: emailValue,
      password: passwordValue,
    });

    const { token } = response.data;
    setToken(token);
    history.push("/");
  };

  return (
    <div className="w-2/5 border mt-36 mx-auto rounded-md p-8 dark:border-gray-700">
      <h1 className="text-2xl font-normal text-center mb-5 dark:text-dark-mode-text">
        Sign Up
      </h1>

      <div className="text-center">
        {errorMessage && <div>{errorMessage}</div>}
        <input
          className="block w-80 border border-slate-300 p-2.5 mt-0 mb-3 mx-auto rounded outline-none dark:bg-dark-mode-bg dark:text-dark-mode-text"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="Email address"
        />
        <input
          className="block w-80 border border-slate-300 p-2.5 mt-0 mb-3 mx-auto rounded outline-none dark:bg-dark-mode-bg dark:text-dark-mode-text"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input
          className="block w-80 border border-slate-300 p-2.5 mt-0 mb-3 mx-auto rounded outline-none dark:bg-dark-mode-bg dark:text-dark-mode-text"
          value={confirmPasswordValue}
          onChange={(e) => setConfirmPasswordValue(e.target.value)}
          type="password"
          placeholder="Confirm password"
        />
        <button
          className="block bg-violet-600 text-white font-medium py-2 px-6 rounded w-80 mt-0 mx-auto mb-5 cursor-pointer hover:bg-violet-800"
          disabled={
            !emailValue ||
            !passwordValue ||
            passwordValue !== confirmPasswordValue
          }
          onClick={onSignUpClicked}>
          Sign Up
        </button>

        <p className="dark:text-dark-mode-text">
          Already have an account?{" "}
          <button
            className="text-violet-600"
            onClick={() => history.push("/login")}>
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};
