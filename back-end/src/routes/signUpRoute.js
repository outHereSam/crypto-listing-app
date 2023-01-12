import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db.js";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    // Retrieve the user's email and password
    // from the request body
    const { email, password } = req.body;

    // Connect to the db
    const db = getDbConnection("cmc-api-db");

    // Find the user with the email
    const user = await db.collection("users").findOne({ email });

    if (user) {
      // A user with the email was found
      // send a conflict error
      res.sendStatus(409);
    }

    // Encrpt the user's password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const startingInfo = {
      nickname: "",
    };

    const result = await db.collection("users").insertOne({
      email,
      passwordHash,
      info: startingInfo,
      isVerified: false,
    });

    const { insertedId } = result;

    // Generate jwt with user info
    jwt.sign(
      {
        id: insertedId,
        email,
        info: startingInfo,
        isVerified: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).json({ token });
      }
    );
  },
};
