import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDbConnection } from "../db.js";

export const updateUserInfoRoute = {
  path: "/api/users/:userId",
  method: "put",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;

    // Get the updates to the user info as a json object
    const updates = (({ nickname }) => ({
      nickname,
    }))(req.body);

    // If there was no authorization header
    // send a 401 error
    if (!authorization) {
      return res.status(401).json({ message: "No authorization header sent" });
    }

    // Extracting the jwt from the token
    const token = authorization.split(" ")[1];

    // This whole process verifies that the token hasn't been tampered with
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unable to verify token" });
      }

      // Get the user id from the decoded data
      // sent to the server
      const { id } = decoded;

      // Checking to see if the id is equal to the user id in the req params
      if (id !== userId) {
        return res
          .status(403)
          .json({ message: "Not allowed to update that user's info" });
      }

      // Connect to the database and insert the new user data
      const db = getDbConnection("cmc-api-db");
      const result = await db
        .collection("users")
        .findOneAndUpdate(
          { _id: ObjectId(id) },
          { $set: { info: updates } },
          { returnOriginal: false }
        );
      const { email, isVerified, info } = result.value;

      jwt.sign(
        { id, email, isVerified, info },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            return res.status(200).json(err);
          }
          res.status(200).json({ token });
        }
      );
    });
  },
};
