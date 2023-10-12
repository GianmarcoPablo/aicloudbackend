import Pedidos from "../model/Pedidos.js"

const nuevoPedido = async (req, res) => {
    try {
        await Pedidos.create(req.body)

    } catch (error) {
        console.log(error);
    }
}

const obtenerPedidos = async (req, res) => {
    try {
        const pediddos = await Pedidos.findAll()
        res.json(pediddos)
    } catch (error) {
        console.log(error);
    }
}

const eliminarPedido = async (req, res) => {
    const { id } = req.params
    try {
        const respuesta = await Pedidos.destroy({ where: { id } })
        res.json(respuesta)
    } catch (error) {
        console.log(error);
    }
}

export {
    nuevoPedido,
    obtenerPedidos,
    eliminarPedido
}