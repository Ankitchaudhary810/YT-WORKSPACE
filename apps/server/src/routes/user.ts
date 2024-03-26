import { prisma } from "../prisma";
import express from "express";
import UserService from "../services/user";
import Auth from "../middleware/auth";

const router = express.Router();

// usre logic
router.route("/signin").post(UserService.handleSignin);
router.route("/signup").post(UserService.handleSignup);

// editor logic
router.route("/create-editor").post(Auth.userAuth, UserService.CreateEditor);
router.route("/editor-login").post(UserService.LoginEditor);

export default router;
