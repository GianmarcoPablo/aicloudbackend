import Blog from "../model/Blog.js";
import multer from "multer"
import generarShortId from "../helpers/generarShortId.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/../uploads/")
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1]
        cb(null, `${generarShortId()}.${extension}`)
    }
})

const configuracionMulter = {
    storage: fileStorage,
    fileFilter(req, file, cb) {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/webp") {
            cb(null, true)
        } else {
            cb(new Error("Formato no válido"))
        }
    }
}

const upload = multer(configuracionMulter).single("imagen")

const subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error.message })
        }
        return next()
    })
}


const nuevoBlog = async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        if (req.file.filename) {
            blog.imagen = req.file.filename
            await blog.save()
        }
        res.json(blog)
    } catch (error) {
        console.log(error);
    }
}

const obtenerBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll()
        res.json(blogs)
    } catch (error) {
        console.log(error);
    }
}

const eliminarBlog = async (req, res) => {
    const { id } = req.params
    try {
        // Primero, encuentra el blog en la base de datos
        const blog = await Blog.findOne({ where: { id } });
        // Luego, construye la ruta al archivo de imagen
        const rutaImagen = __dirname + "/../uploads/" + blog.imagen;
        // Verifica si el archivo existe
        if (fs.existsSync(rutaImagen)) {
            // Si existe, elimínalo
            fs.unlinkSync(rutaImagen);
        }
        await Blog.destroy({ where: { id } })
    } catch (error) {
        console.log(error);
    }
}

const editarBlog = async (req, res) => {
    const { id } = req.params
    try {
        let nuevoBlog = req.body
        if (req.file) {
            nuevoBlog.imagen = req.file.filename
        }

        let blog = await Blog.update(nuevoBlog, { where: { id } })
        if (!blog[0]) {
            res.json({ mensaje: "El blog no se encontró o no se modificó" })
            return
        }
        blog = await Blog.findByPk(id)
        res.json(blog)
    } catch (error) {
        console.log(error);
    }
}

const obtenerBlog = async (req, res) => {
    const { id } = req.params
    try {
        const blog = await Blog.findOne({ where: { id } })
        res.json(blog)
    } catch (error) {
        console.log(error);
    }
}

export {
    nuevoBlog,
    obtenerBlogs,
    subirArchivo,
    eliminarBlog,
    editarBlog,
    obtenerBlog
}