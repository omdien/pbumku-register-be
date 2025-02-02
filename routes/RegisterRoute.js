import express from "express";
import {
    createRegister,
    getUsers,
    createUser,
    getMaxTrader,
    getPropinsi,
    getKota,
    getKotaByIdProp,
    getUPT,
    getUptAll,
    getTraderByNPWP,
    getTraders,
    getUserName,
    getUser,
    getLayananAll,
    createLayanan,
    getUPTById,
    getLayananByTrader,
    updateTrader,
    updateUser,
    updateLayanan
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
router.get('/register/allupt', getUptAll);
router.get('/register/uptbyid/:id', getUPTById);
router.get('/register/traders', getTraders);
router.get('/register/:npwp', getTraderByNPWP);  // warning (pakai sub)
router.get('/register/username/:username', getUserName);
router.get('/register/user/:kdtrader', getUser);
router.get('/register/layanan/alllayanan', getLayananAll);
router.post('/register/crlayanan', createLayanan);
router.get('/register/getlayanan/:kdtrader', getLayananByTrader);
router.patch('/register/register/:kdtrader', updateTrader);
router.patch('/register/user/:userid', updateUser);
router.patch('/register/crlayanan/:kode', updateLayanan);

export default router;