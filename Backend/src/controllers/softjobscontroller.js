import {
  getUserModel,
  registerUserModel,
  verifyCredentialModel,
  deleteUserModel
} from "../models/softjobsmodels.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config.js";

export const getUserController = async (req, res) => {
  try {
    const result = await getUserModel();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const registerUserController = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;
  try {
    const result = registerUserModel(email, password, rol, lenguage);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//VERIFICADOR DE CREDENCIALES

export const verifyCredentialController = async (req, res) => {
  try {
    const { email} = req.body;
    await verifyCredentialModel(email,password);
  
    const token = jwt.sign({ email }, SECRET_KEY)
    console.log(token);
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

//

export const deleteUserController=async(req,res)=>{
  try {
    const {id}= req.params
    //recibe el token desde la cabecera
    const Authorization=req.header("Authorization")
    //eliminamos el texto que no interesa
    const token=Authorization.split(" ")[1]
    // verica que el token sea valido y vigente
    jwt.verify(token,SECRET_KEY)
    // decodifica el token para obtener el payload
    const{email}=jwt.decode(token)
    await deleteUserModel(id)

  } catch (error) {
   // console.log(error);
    res.status(error.code || 500).send(error);
  }
}