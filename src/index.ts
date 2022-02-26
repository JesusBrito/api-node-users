import mongoose, { ConnectOptions } from "mongoose";
import app from "./app";

const port = process.env.PORT ;

mongoose.connect('mongodb://localhost:27017/bdUsers', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
} as ConnectOptions)
   .then(() => {
      // start the Express server
      app.listen(port, async () => {
         console.log(`App is running at http://localhost:${port}`);
      });
   })
   .catch(error => {
      console.log(error)
   })


