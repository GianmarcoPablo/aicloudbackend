import { Router } from "express"
import { nuevoContacto, obtenerContactos } from "../controllers/contactoController.js"

const router = Router()

router.post("/", nuevoContacto)
router.get("/", obtenerContactos)

export default router