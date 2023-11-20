import { generateCaptcha } from "../controller/captchaController.js";
import { Router } from "express";
const router = Router();

router.get("/",generateCaptcha);

export default router;