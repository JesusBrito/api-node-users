import mongoose from "mongoose";
const Schema = mongoose.Schema;

let UserSchema = new Schema<User>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    loginTries: {type: Number, default: 0},
    isLocked: {type: Boolean, default: false},
    fcmToken: String,
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject: User) => {
        delete returnedObject.password
    }
})

const UserModel = mongoose.model<User>('User', UserSchema);
export default UserModel;