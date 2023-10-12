import { Router } from "express"
import { nuevoPedido, obtenerPedidos, eliminarPedido } from "../controllers/pedidosController.js"

const router = Router()

router.post("/", nuevoPedido)
router.get("/", obtenerPedidos)
router.delete("/:id", eliminarPedido)

export default router

