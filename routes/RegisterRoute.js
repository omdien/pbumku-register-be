import express from "express";
import {
    createRegister,
    getUsers,
    createUser
} from "../controllers/RegisterController.js";

const router = express.Router();

router.post('/register', createRegister);
router.get('/users', getUsers);
router.post('/user', createUser);

export default router;