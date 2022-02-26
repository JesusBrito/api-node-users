interface User {
    _id: number
    name: string,
    surname: string,
    email: string,
    password: string,
    role: string,
    loginTries: number,
    isLocked: boolean,
    fcmToken: string,
    image: string
  }