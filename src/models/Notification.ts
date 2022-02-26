import mongoose from "mongoose";
var Schema = mongoose.Schema;

var NotificationSchema = new Schema<Notification>({
    header: { type: String, required: true },
    message: { type: String, required: true },
    date_time: { type: Date, default: new Date() },
});

const NotificationModel = mongoose.model<Notification>('Notification', NotificationSchema);
export default NotificationModel;