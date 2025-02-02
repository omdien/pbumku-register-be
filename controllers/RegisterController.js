// import { response } from "express";
import Tb_r_trader from "../models/tb_r_trader.js";
import Tb_user from "../models/tb_user.js";
import Tb_propinsi from "../models/tb_propinsi.js";
import Tb_kota from "../models/tb_kota.js";
import Tb_r_upt from "../models/tb_r_upt.js";
import Tb_r_layanan from "../models/tb_r_layanan.js";
import { Op } from "sequelize";
// import path from "path";
// import { Sequelize } from "sequelize";

// Get All Trader
export const getTraders = async (req, res) => {
  try {
    const response = await Tb_r_trader.findAll(
      {
        attributes: ["KODE_TRADER", "NAMA", "NPWP", "EMAIL", "TELEPON"],
        // limit: 100,
        include: { model: Tb_user, where: { ROLE: 4 } },
      },
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// Save Registrasi/Trader
export const createRegister = async (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
  // const name = req.body.title;
  // const file = req.files.FILE_ID;
  // const fileSize = file.data.length;
  // const ext = path.extname(file.name);
  // const fileName = file.md5 + ext;
  // const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  // const allowedType = ['.png', '.jpg', '.jpeg'];

  // if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
  // if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

  // file.mv(`./public/images/${fileName}`, async (err) => {
  // if (err) return res.status(500).json({ msg: err.message });
  // try {
  //   await Tb_r_trader.create({
  //     JENIS_USAHA: req.body.JENIS_USAHA,
  //     NOMOR_KUSUKA: req.body.NOMOR_KUSUKA,
  //     NAMA: req.body.NAMA,
  //     NPWP: req.body.NPWP,
  //     NO_IZIN: req.body.NO_IZIN,
  //     ALAMAT: req.body.ALAMAT,
  //     PROPINSI: req.body.PROPINSI,
  //     KOTA: req.body.KOTA,
  //     KODEPOS: req.body.KODEPOS,
  //     TELEPON: req.body.TELEPON,
  //     EMAIL: req.body.EMAIL,
  //     EMAIL_PNBP: req.body.EMAIL_PNBP,
  //     KETERANGAN: req.body.KETERANGAN,
  //     TGL_DAFTAR: req.body.TGL_DAFTAR,
  //     FILE_ID: fileName,
  //     STATUS: req.body.STATUS,
  //     LAST_UPDATE: req.body.LAST_UPDATE,
  //   });
  //   res.status(201).json({ msg: "Trader Created Successfully" });
  // } catch (error) {
  //   console.log(error.message);
  // }
  try {
    await Tb_r_trader.create(req.body);
    res.status(201).json({ msg: "User Created" });
  } catch (error) {
    console.log(error.message);
  }
  // );
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

// Get Users
export const getUserName = async (req, res) => {
  try {
    const response = await Tb_user.findOne(
      {
        where: {
          USERNAME: req.params.username
        }
      }
    );
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

// Get Kabupaten/Kota
export const getUptAll = async (req, res) => {
  try {
    const response = await Tb_r_upt.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUPTById = async (req, res) => {
  try {
    const response = await Tb_r_upt.findOne({
      where: {
        KD_UNIT: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getTraderByNPWP = async (req, res) => {
  try {
    const response = await Tb_r_trader.findOne({
      where: {
        NPWP: req.params.npwp
      }
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

export const getUser = async (req, res) => {
  try {
    const response = await Tb_user.findOne({
      where: {
        [Op.and]: [
          {
            KODE_TRADER: req.params.kdtrader
          },
          {
            ROLE: 4
          }
        ]
      }
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}
// Get Trader Layanan
export const getLayananAll = async (req, res) => {
  try {
    const response = await Tb_r_layanan.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};


// Save Layanan
export const createLayanan = async (req, res) => {
  try {
    await Tb_r_layanan.create(req.body);
    res.status(201).json({ msg: "Layanan Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getLayananByTrader = async (req, res) => {
  try {
    const response = await Tb_r_layanan.findOne({
      where: {
        KODE_TRADER: req.params.kdtrader,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// Update Trader
export const updateTrader = async (req, res) => {
  try {
    await Tb_r_trader.update(req.body, {
      where: {
        KODE_TRADER: req.params.kdtrader,
      },  
    });
    res.status(200).json({ msg: "Trader Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    await Tb_user.update(req.body, {
      where: {
        USER_ID: req.params.userid,
      },
    });
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

// Save Layanan
export const updateLayanan = async (req, res) => {
  try {
    await Tb_r_layanan.update(req.body, {
      where: {
        KODE: req.params.kode,
      },  
    });
    res.status(200).json({ msg: "Layanan Updated" });
  } catch (error) {
    console.log(error.message);
  }
};


export default createRegister;
