import UserModel from "../models/User";
import { Request, Response } from "express";
import { generateHash, validateHash } from "../services/hash";
import { createToken } from "../services/jwt";
import { sendNotifications } from "../services/notifications";
import { createNotification } from "./notification";
export async function createUser(req: Request, res: Response) {
  try {
    let user = await UserModel.create(req.body);
    const hash = await generateHash(user.password!);
    user.password = hash;
    const userStored = await user.save();
    res.status(200).send({ user: userStored });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    let users = await UserModel.find();
    res.status(200).send({ users: users });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

export async function unlockUser(req: Request, res: Response) {
  if (req.body.id) {
    try {
      let user = await UserModel.findById(req.body.id);
      if (user) {
        user.loginTries = 0;
        user.isLocked = false;
        const userUpdated = await user.save();
        res.status(200).send({ user: userUpdated });
      } else {
        res.status(500).send({ message: "El usuario no existe" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  }else{
    return res.status(500).send({ message: "Ingrese el id" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const params = req.body;
    let email = params.email;
    let password = params.password;
    let fcmToken = params.token;
    let user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user) {
      if (user.isLocked === false) {
        const validationHash = await validateHash(user.password!, password);
        if (validationHash) {
          user.fcmToken = fcmToken;
          await user.save();
          const token = await createToken(user);
          res.status(200).send({ user: user, token: token });
        } else {
          user.loginTries = user.loginTries + 1;
          if (user.loginTries === 3) {
            user.isLocked = true;
            const tokens = await getTokensOfAdmins();
            const title = "Usuario bloqueado";
            const message = `El usuario ${user.name} ${user.surname} fue bloqueado por contraseña incorrecta`;
            sendNotifications(tokens, title, message);
            createNotification(title, message);
          }
          await user.save();
          res
            .status(500)
            .send({
              message:
                "No se pudo iniciar sesión, usuario o contraseña incorrectos",
            });
        }
      } else {
        res.status(500).send({
          message: "El usuario está bloquedo, contacte a su administrador",
        });
      }
    } else {
      res.status(500).send({ message: "El usuario no existe" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

async function getTokensOfAdmins() {
  let admins = await UserModel.find({ role: "Admin" });
  let rol = admins.map((admin) => admin.fcmToken);
  return rol;
}
