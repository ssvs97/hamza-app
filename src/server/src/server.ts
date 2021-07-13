import { parallel } from "async";
import { connect } from "mongoose";
// import os from "os";
// import cluster from "cluster";
import { app } from "./app";

// const numCPUs = os.cpus().length;

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
init.unhandledRejection();

// if (cluster.isMaster) {
//   console.log(`Primary ${process.pid} is running`);

//   for (var i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on("death", function (worker) {
//     console.log("worker " + worker.pid + " died");
//   });
// } else {
parallel([() => init.mongoose(), () => init.express()]);
console.log(`Worker ${process.pid} started`);
// }
