import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";

export const LogInPage = () => {
  const [token, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const history = useHistory();

  const onLogInClicked = async () => {
    const response = await axios.post("/api/login", {
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
        Log In
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
        <button
          className="block bg-violet-600 text-white font-medium py-2 px-6 rounded w-80 mt-0 mx-auto mb-5 cursor-pointer hover:bg-violet-800"
          disabled={!emailValue || !passwordValue}
          onClick={onLogInClicked}>
          Log In
        </button>
        <button
          className="text-violet-600 hover:text-violet-400 "
          onClick={() => history.push("/forgot-password")}>
          Forgot your password?
        </button>
        <p className="dark:text-dark-mode-text">
          Don't have an account?{" "}
          <button
            className="text-violet-600"
            onClick={() => history.push("/signup")}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};
