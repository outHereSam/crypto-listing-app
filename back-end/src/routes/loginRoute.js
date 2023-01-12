import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db.js";

export const logInRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    // Retrieve the user's email and password from the request body
    const { email, password } = req.body;

    // Connect to the database
    const db = getDbConnection("cmc-api-db");

    // Fetch a user with the provided email
    const user = await db.collection("users").findOne({ email });

    // If no user with that email exists
    // send back a 401 error
    if (!user) return res.sendStatus(401);

    // Getting these info from the user object
    const { _id: id, isVerified, passwordHash, info } = user;

    // Compare the encrypted password from the request body
    // to the hashed password in the database
    const isCorrect = await bcrypt.compare(password, passwordHash);

    if (isCorrect) {
      jwt.sign(
        { id, isVerified, email, info },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            res.status(500).json(err);
          }
          res.status(200).json({ token });
        }
      );
    } else {
      res.sendStatus(401);
    }
  },
};
