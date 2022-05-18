import jwt from "jsonwebtoken";
import pool from "../../const/database";
// const { handleError } = require("./handleError")

async function verifyToken(req, res, next) {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      res.status(403).send({ code: "43292" });
    }

    /* Decoding the token to get the payload */
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const { id } = JSON.parse(atob(base64));

    /* Check if there is a secret key for that user id */
    const { rows } = await pool.query(
      "select * from session where id_user_account_session=$1",
      [id]
    );
    const { secret_key_session } = rows[0];

    /* Check if the token is valid */
    await jwt.verify(token, secret_key_session, (error, decoded) => {
      if (!error) {
        req.userId = decoded.id;
        next();
      } else {
        res.status(403).json({ code: "43292" });
      }
    });
  } catch (e) {
    // handleError(res, e)
    console.log(e);
  }
}

export default verifyToken;
