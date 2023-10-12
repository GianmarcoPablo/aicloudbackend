import { Router } from "express"
import { nuevoBlog, obtenerBlogs, subirArchivo, eliminarBlog, obtenerBlog, editarBlog } from "../controllers/blogsController.js"

const router = Router()

router.post("/", subirArchivo, nuevoBlog)
router.get("/", obtenerBlogs)
router.get("/:id", obtenerBlog)
router.put("/editar/:id", subirArchivo, editarBlog)
router.delete("/eliminar/:id", eliminarBlog)


export default router