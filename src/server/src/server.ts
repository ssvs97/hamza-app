import { parallel } from "async";
import { connect } from "mongoose";
import { app } from "./app";

class Init {
  server;

  async mongoose() {
    await connect(process.env.MONGODB_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("MongoDB connected...");
  }
  express() {
    this.server = app.listen(process.env.PORT, () =>
      console.log("Server Running...")
    );
  }

  uncaughtException() {
    process.on("uncaughtException", (err) => {
      console.log(err);
      console.log(`UNCAUGHT REJECTION! Shutting down...`);
      process.exit(1); // 0 success, 1 failure
    });
  }

  unhandledRejection() {
    process.on("unhandledRejection", (err) => {
      console.log(err);
      console.log(`UNHANDLED REJECTION! Shutting down...`);
      this.server.close(() => {
        process.exit(1); // 0 success, 1 failure
      });
    });
  }
}

const init = new Init();

init.uncaughtException();

parallel([() => init.mongoose(), () => init.express()]);

init.unhandledRejection();
