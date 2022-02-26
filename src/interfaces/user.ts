interface User {
    _id: number
    name: string,
    surname: string,
    email: string,
    password: string,
    role: string,
    loginTries: Number,
    isLocked: Number,
    fcmToken: String,
    image: string
  }