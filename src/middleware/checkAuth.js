import Usuario from "../model/usuario.js";
import jwt from "jsonwebtoken"

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.PALABRAMEGASECRETA)
            req.usuario = await Usuario.findOne({
                where: { id: decoded.id },
                attributes: { exclude: ["password", "token"] }
            });
            return next()
        } catch (err) {
            const error = new Error("Token no Valido")
            return res.status(403).json({ msg: error.message })
        }
    }
    if (!token) {
        const error = new Error("Token no Valido o inexistente")
        res.status(403).json({ msg: error.message })
    }
    next()
}

export default checkAuth