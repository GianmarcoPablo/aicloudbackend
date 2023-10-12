import { Router } from "express";
import { registrarUsuario, login, perfil, obtenerUsuarios, eliminarUsuario } from "../controllers/usuariosController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = Router()

router.post("/", registrarUsuario)
router.post("/login", login)
router.get("/", obtenerUsuarios)
router.delete("/eliminar/:id", eliminarUsuario)

router.get("/perfil", checkAuth, perfil)


export default router