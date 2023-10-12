import generarJWT from "../helpers/generarJWT.js"
import Usuario from "../model/usuario.js"

const registrarUsuario = async (req, res) => {

    const { email } = req.body

    const usuarioExiste = await Usuario.findOne({ where: { email } })
    if (usuarioExiste) {
        const error = new Error("El usuario ya existe")
        return res.status(400).json({ msg: error.message })
    }
    try {
        await Usuario.create(req.body)
        res.json({ msg: "Usuario Creado Correctamente" })
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    const usuario = await Usuario.findOne({ where: { email } })
    if (!usuario) {
        const error = new Error("El usuario no existe")
        return res.status(404).json({ msg: error.message })
    }
    if (password === usuario.password) {
        res.json({
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id)
        })
    } else {
        return res.status(401).json({ msg: "Contraseña incorrecta" });
    }
}

const perfil = async (req, res) => {
    const { usuario } = req
    res.json(usuario)
}

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll()
        res.json(usuarios)
    } catch (error) {
        console.log(error);
    }
}

const eliminarUsuario = async (req, res) => {
    const { id } = req.params
    try {
        const respuesta = await Usuario.destroy({ where: { id } })
        res.json(respuesta)
    } catch (error) {
        console.log(error);
    }
}


export {
    registrarUsuario,
    login,
    perfil,
    obtenerUsuarios,
    eliminarUsuario
}