import { add, getUnixTime } from "date-fns";
import jsonwebtoken from "jsonwebtoken"

export async function createToken(user: User) {
    const payload = {
        id: user._id,
        exp: getUnixTime(add(new Date(), {
            months: 1,
        }))
    }
    const token =  await jsonwebtoken.sign(payload, process.env.SECRET_TOKEN || "String_Secreto")
    return token
};
