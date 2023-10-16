import Contacto from "../model/Contacto.js";

const nuevoContacto = async (req, res) => {
    try {
        await Contacto.create(req.body)
    } catch (error) {
        console.log(error);
    }
}

const obtenerContactos = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
    }
}

export {
    nuevoContacto,
    obtenerContactos
}