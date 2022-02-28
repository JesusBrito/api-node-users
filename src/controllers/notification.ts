import NotificationModel from "../models/Notification";
import { Request, Response } from "express";

export async function createNotification(title: string, body: string) {
  try {
    const params = {
      header: title,
      message: body,
    };
    let notification = await NotificationModel.create(params);
    const notificationStored = await notification.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getNotifications(req: Request, res: Response) {
  try {
    const notifications = await NotificationModel.find({});
    res.status(200).send({ notifications: notifications });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}
