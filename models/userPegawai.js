import Tb_pegawai from "./tb_pegawai.js";
import Tb_user from "./tb_user.js";

// Tb_pegawai.js
Tb_pegawai.hasOne(Tb_user, {
  foreignKey: "USERNAME",  // kolom di tb_user yang berelasi
  sourceKey: "NIP",        // kolom di tb_pegawai yang dicocokkan
  as: "userData",          // harus sama dengan `as` di include
});

// Tb_user.js
Tb_user.belongsTo(Tb_pegawai, {
  foreignKey: "USERNAME",
  targetKey: "NIP",
});

export default function setupUserPegawai() {
 }
