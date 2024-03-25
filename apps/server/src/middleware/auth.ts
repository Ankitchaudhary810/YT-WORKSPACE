import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
class Auth {
  public static async userAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authHeader = req.headers.authorization;
      console.log(authHeader);
      if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET!, (err, decodedToken) => {
          console.log(err);
          console.log(decodedToken);

          if (err) {
            return res.sendStatus(403);
          }

          if (!decodedToken) {
            return res.sendStatus(403);
          }

          if (typeof decodedToken === "string") {
            return res.sendStatus(403);
          }
          req.headers["userId"] = decodedToken.id;
          req.headers["userRole"] = decodedToken.role;
          req.headers["userEmail"] = decodedToken.email;
          next();
        });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log("Error in the user Auth", error);
      return res.sendStatus(501);
    }
  }

  public static async editorAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authHeader = req.headers.authorization;
      console.log(authHeader);
      if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET!, (err, decodedToken) => {
          console.log(err);
          console.log(decodedToken);

          if (err) {
            return res.sendStatus(403);
          }

          if (!decodedToken) {
            return res.sendStatus(403);
          }

          if (typeof decodedToken === "string") {
            return res.sendStatus(403);
          }

          req.headers["userId"] = decodedToken.id;
          req.headers["userRole"] = decodedToken.role;
          req.headers["userEmail"] = decodedToken.email;
          next();
        });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log("Error in the editor Auth", error);
      return res.sendStatus(501);
    }
  }
}

export default Auth;
