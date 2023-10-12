import Producto from "../model/Productos.js";
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


const nuevoProducto = async (req, res) => {
    try {
        const producto = await Producto.create(req.body)
        if (req.file.filename) {
            producto.imagen = req.file.filename
            await producto.save()
        }
        res.json(producto)
    } catch (error) {
        console.log(error);
    }
}

const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll()
        res.json(productos)
    } catch (error) {
        console.log(error);
    }
}

const obtenerProducto = async (req, res) => {
    const { id } = req.params
    try {
        const producto = await Producto.findOne({ where: { id } })
        res.json(producto)
    } catch (error) {
        console.log(error);
    }
}

const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        // Primero, encuentra el producto en la base de datos
        const producto = await Producto.findOne({ where: { id } });
        // Luego, construye la ruta al archivo de imagen
        const rutaImagen = __dirname + "/../uploads/" + producto.imagen;
        // Verifica si el archivo existe
        if (fs.existsSync(rutaImagen)) {
            // Si existe, elimínalo
            fs.unlinkSync(rutaImagen);
        }
        // Finalmente, elimina el producto de la base de datos
        await Producto.destroy({ where: { id } });
    } catch (error) {
        console.log(error);
    }
}

const editarProducto = async (req, res) => {
    const { id } = req.params
    try {
        let nuevoProducto = req.body
        if (req.file) {
            nuevoProducto.imagen = req.file.filename
        }

        let producto = await Producto.update(nuevoProducto, { where: { id } })
        if (!producto[0]) {
            res.json({ mensaje: "El producto no se encontró o no se modificó" })
            return
        }
        producto = await Producto.findByPk(id)
        res.json(producto)
    } catch (error) {
        console.log(error);
    }
}

export {
    nuevoProducto,
    subirArchivo,
    obtenerProductos,
    eliminarProducto,
    editarProducto,
    obtenerProducto
}