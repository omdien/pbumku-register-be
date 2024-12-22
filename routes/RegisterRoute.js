import express from "express";
import {
    createRegister,
    getUsers,
    createUser,
    getMaxTrader,
    getPropinsi,
    getKota,
    getKotaByIdProp,
    getUPT
} from "../controllers/RegisterController.js";

const router = express.Router();

router.post('/register/register', createRegister);
router.get('/register/register-max', getMaxTrader);
router.get('/register/users', getUsers);
router.post('/register/user', createUser);
router.get('/register/propinsi', getPropinsi);
router.get('/register/kota', getKota);
router.get('/register/kota/:id', getKotaByIdProp);
router.get('/register/upt', getUPT);

export default router;