import mongoose, { ConnectOptions } from "mongoose";
import app from "./app";

const port = process.env.PORT ;

mongoose.connect(`mongodb://${process.env.URL_HOST_DB}`, {
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


