import bcrypt from "bcrypt"
const saltRounds = 10;

export async function generateHash(text: string){
    const hash = await bcrypt.hash(text, saltRounds)
    return hash
}

export async function validateHash(passwordHash:string, password:string) {
    const match = await bcrypt.compare(password, passwordHash);
    return match
}