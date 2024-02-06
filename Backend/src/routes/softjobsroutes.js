import { Router } from "express";
import { deleteUserController, getUserController, registerUserController, verifyCredentialController } from "../controllers/softjobscontroller.js";
import { validateParametersUser } from "../middlewares/validateParametersUser.js";

const router = Router();

router.post("/usuarios",validateParametersUser,registerUserController)
router.get("/usuarios",getUserController)
router.post("/login",verifyCredentialController)
router.delete("/usuario/:id",deleteUserController)

export default router;