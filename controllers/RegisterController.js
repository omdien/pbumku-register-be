import Tr_r_trader from "../models/tb_r_trader.js";
import Tr_user from "../models/tb_user.js";

export const createRegister = async(req, res) =>{
    try {
        await Tr_r_trader.create(req.body);
        res.status(201).json({msg: "Trader Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const getUsers = async(req, res) =>{
    try {
        const response = await Tr_user.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createUser = async(req, res) =>{
    try {
        console.log(req.body)
        await Tr_user.create(req.body);
        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export default createRegister;