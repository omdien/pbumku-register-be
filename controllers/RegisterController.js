import { response } from "express";
import Tb_r_trader from "../models/tb_r_trader.js";
import Tb_user from "../models/tb_user.js";
import Tb_propinsi from "../models/tb_propinsi.js";
import Tb_kota from "../models/tb_kota.js";
import Tb_r_upt from "../models/tb_r_upt.js";
import { Op } from "sequelize";
// import { Sequelize } from "sequelize";

// Save Registrasi/Trader
export const createRegister = async (req, res) => {
  try {
    await Tb_r_trader.create(req.body);
    res.status(201).json({ msg: "Trader Created" });
  } catch (error) {
    console.log(error.message);
  }
};

// Get Users
export const getUsers = async (req, res) => {
  try {
    const response = await Tb_user.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// Save User
export const createUser = async (req, res) => {
  try {
    await Tb_user.create(req.body);
    res.status(201).json({ msg: "User Created" });
  } catch (error) {
    console.log(error.message);
  }
};

// Get Max Kode_Trader
export const getMaxTrader = async (req, res) => {
  try {
    const response = await Tb_r_trader.max("KODE_TRADER");
    res.status(201).json({ response });
  } catch (error) {
    console.log(error.message);
  }
};

// Get Propinsi
export const getPropinsi = async (req, res) => {
  try {
    const response = await Tb_propinsi.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// Get Kabupaten/Kota
export const getKota = async (req, res) => {
  try {
    const response = await Tb_kota.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getKotaByIdProp = async (req, res) => {
  try {
    const response = await Tb_kota.findAll({
      where: {
        KODE_PROPINSI: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// Get UPT
export const getUPT = async (req, res) => {
  // get query params
  const page = parseInt(req.query.page) || 0; //default page is 0
  const limit = parseInt(req.query.limit) || 10; //default limit is 10
  const search = req.query.search_query || ""; //default search is empty string
  
  const offset = page * limit;
  const totalRows = await Tb_r_upt.count({
    where: {
      [Op.or]: [
        {
          KD_UNIT: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          NM_UNIT: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
  });
  const totalPages = Math.ceil(totalRows / limit);

  const result = await Tb_r_upt.findAll({
    where: {
      [Op.or]: [
        {
          KD_UNIT: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          NM_UNIT: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["KD_UNIT", "ASC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPages: totalPages,
  });

  // try {
  //   const response = await Tb_r_upt.findAll();
  //   res.status(200).json(response);
  // } catch (error) {
  //   console.log(error.message);
  // }
};

export default createRegister;
