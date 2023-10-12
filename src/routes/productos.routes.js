import { Router } from "express"
import { subirArchivo, nuevoProducto, obtenerProductos, eliminarProducto, editarProducto, obtenerProducto } from "../controllers/productosController.js"

const router = Router()

router.post("/", subirArchivo, nuevoProducto)
router.get("/", obtenerProductos)
router.get("/:id", obtenerProducto)
router.delete("/eliminar/:id", eliminarProducto)
router.put("/editar/:id", subirArchivo, editarProducto)

export default router