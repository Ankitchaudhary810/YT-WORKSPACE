import { prisma } from "../prisma";
import express from "express";
import UserService from "../services/user";
import Auth from "../middleware/auth";

const router = express.Router();

router.route("/signin").post(UserService.handleSignin);
router.route("/signup").post(UserService.handleSignup);

// create editor
router.route("/create-editor").post(Auth.userAuth, UserService.CreateEditor);

export default router;
