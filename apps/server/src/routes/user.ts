import { prisma } from "../prisma";
import express from "express";
import UserService from "../services/user";

const router = express.Router();

router.route("/signin").post(UserService.handleSignin);
router.route("/signup").post(UserService.handleSignup);

export default router;
