import { add, getUnixTime } from "date-fns";
import jsonwebtoken from "jsonwebtoken"

export async function createToken(user: User) {
    const payload = {
        id: user._id
    }
    const token = jsonwebtoken.sign(payload, process.env.SECRET_TOKEN || "String_Secreto", {
        expiresIn: "2h",
      })
    return token
};
