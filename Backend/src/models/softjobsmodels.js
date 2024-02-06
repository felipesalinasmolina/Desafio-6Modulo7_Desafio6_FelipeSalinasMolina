import { pool } from "../../db.js";
import bcrypt from "bcryptjs";

export const getUserModel = async () => {
  try {
    const getUserQuery = await pool.query("SELECT * FROM usuarios");
    console.log(getUserQuery.rows);
    return getUserQuery.rows;
  } catch (error) {
    throw new Error("Error getting usuarios: " + error.message);
  }
};

export const registerUserModel = async (email, password, rol, lenguage) => {
  const hashedPassword = bcrypt.hashSync(password);
  const registerUser = await pool.query(
    "INSERT INTO usuarios (email,password,rol,lenguage) VALUES ($1,$2,$3,$4) RETURNING *",
    [email, hashedPassword, rol, lenguage]
  );
  console.log(registerUser.rows);
  return registerUser.rows[(email, hashedPassword, rol, lenguage)];
};

//VERIFICADOR DE CREDENCIALES

export const verifyCredentialModel = async (email, password) => {
  const queryVerify = "SELECT * FROM usuarios WHERE email=$1";
  const values = [email];

  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(queryVerify, values);
  const { password: passwordscryp } = usuario;

  const passwordIsSame = bcrypt.compareSync(password, passwordscryp);

  if (!passwordIsSame || !rowCount) {
    throw {
      code: 401,
      message: "email o constreña incorrecta",
    };
  }
};
