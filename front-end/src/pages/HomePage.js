import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useUser } from "../auth/useUser";
import { formatCurrency } from "../utils/formatCurrency";

export const HomePage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useUser();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/crypto");
        setCryptoData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const history = useHistory();

  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <div className="max-w-screen-lg pt-36 mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold dark:text-dark-mode-text">
          Welcome {user.info.nickname}!
        </h1>

        <div className="flex justify-between items-center gap-5">
          <button
            onClick={() => history.push("/userInfo")}
            className="h-8 flex justify-between items-center gap-1 py-5 px-3 rounded hover:bg-slate-100 dark:text-dark-mode-text dark:hover:bg-slate-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ fill: "rgba(166, 176, 195, 1)" }}>
              <path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"></path>
            </svg>
            Edit Profile
          </button>
          <button
            className="hover:underline dark:text-dark-mode-text"
            onClick={logOut}>
            Log Out
          </button>
        </div>
      </div>

      <div className="mt-20">
        <h1 className="text-2xl mb-8 dark:text-dark-mode-text">
          Crypto Listings
        </h1>

        <table className="w-full">
          <thead className="border border-x-0 dark:border-slate-800">
            <tr>
              <th className="py-3 text-sm text-left dark:text-dark-mode-text">
                #
              </th>
              <th className="py-3 text-sm text-left dark:text-dark-mode-text">
                Name
              </th>
              <th className="py-3 text-sm text-left dark:text-dark-mode-text">
                Price
              </th>
            </tr>
          </thead>

          {loading && (
            <h1 className="text-xl text-bold mt-8 mx-auto dark:text-dark-mode-text">
              Loading...
            </h1>
          )}
          {error && <pre>{JSON.stringify(error)}</pre>}
          {!cryptoData && null}
          <tbody>
            {cryptoData.map((crypto) => (
              <tr
                className="border border-x-0 dark:border-slate-800"
                key={crypto.id}>
                <td className="py-5 text-sm text-gray-700 dark:text-dark-mode-text">
                  {crypto.cmc_rank}
                </td>
                <td className="flex items-center gap-3 py-5 text-sm text-gray-700 dark:text-dark-mode-text">
                  <img
                    className="w-6 h-6"
                    src={`https://coinicons-api.vercel.app/api/icon/${crypto.symbol.toLowerCase()}`}
                    alt="Coin Icon"
                  />
                  {crypto.name}
                  {"  "}
                  <span className="text-slate-400 dark:text-dark-mode-text">
                    {crypto.symbol}
                  </span>
                </td>
                <td className="py-5 text-sm text-gray-700 dark:text-dark-mode-text">
                  {formatCurrency(crypto.quote["USD"]["price"])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
