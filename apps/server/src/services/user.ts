import { Request, Response } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  public static async handleSignup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) return res.json({ msg: "Email Already Exist" });

      const hashedPassword = await bcrypt.hash(password, 4);

      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: "User" },
        process.env.SECRET!
      );
      return res.status(200).json({ token });
    } catch (error) {
      console.log("Error while signup", error);
      return res.sendStatus(501);
    }
  }

  public static async handleSignin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) return res.json({ msg: "Email Already Exist" });

      if (!(await bcrypt.compare(password, user.password))) {
        return res.json({ msg: "Password not Match" });
      }

      const token = await jwt.sign(
        { id: user.id, email: user.email, role: "User" },
        process.env.SECRET!
      );
      return res.status(200).json({ token });
    } catch (error) {
      console.log("Error while signin", error);
      return res.sendStatus(501);
    }
  }
}

export default UserService;
