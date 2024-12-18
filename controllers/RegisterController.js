import Tr_r_trader from "../models/tb_r_trader.js";

export const createRegister = async(req, res) =>{
    try {
        await Tr_r_trader.create(req.body);
        res.status(201).json({msg: "Trader Created"});
    } catch (error) {
        console.log(error.message);
    }
}