import { Router } from "express";
import RoleController from "../controllers/roleController";

const router = Router();

router.post("/roles", RoleController.createRole);
router.get("/roles", RoleController.getRoles);

export default router;
