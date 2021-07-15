import { parallel } from "async";
import { connect } from "mongoose";
import { cpus, networkInterfaces } from "os";
// import cluster from "cluster";
import { app } from "./app";

const numCPUs = cpus().length;

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

  express(port: number) {
    this.server = app.listen(port, () =>
      console.log(`Server running on port ${port}...`)
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

console.log(networkInterfaces());

const init = new Init();
init.uncaughtException();
init.unhandledRejection();

// if (cluster.isMaster) {
//   console.log(`Primary ${process.pid} is running`);

//   for (var i = 0; i < numCPUs; i++) {
//     process.env.PORT += i.toString();
//     cluster.fork();
//   }

//   cluster.on("death", function (worker) {
//     console.log("worker " + worker.pid + " died");
//   });
// } else {
//   parallel([() => init.mongoose(), () => init.express()]);
//   console.log(`Worker ${process.pid} started`);
// }

for (var i = 0; i < numCPUs; i++) {
  const port = +process.env.PORT! + i;

  parallel([() => init.mongoose(), () => init.express(port)]);
}
