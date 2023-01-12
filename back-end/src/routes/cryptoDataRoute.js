import axios from "axios";

export const cryptoDataRoute = {
  path: "/api/crypto",
  method: "get",
  handler: (req, res) => {
    let response = null;
    new Promise(async (resolve, reject) => {
      try {
        response = await axios.get(
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
          {
            headers: {
              "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
            },
          }
        );
      } catch (ex) {
        response = null;
        // error
        console.log(ex);
        reject(ex);
      }
      if (response) {
        // success
        const json = response.data;
        // console.log(json.data);
        res.json(json.data);
        resolve(json);
      }
    });
  },
};
