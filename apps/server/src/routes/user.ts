import { prisma } from "../prisma";
import express from "express";
import UserService from "../services/user";

const router = express.Router();

router.route("/signin").post(UserService.handleSignup);

export default router;
