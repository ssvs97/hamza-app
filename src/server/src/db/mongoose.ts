import { connect } from "mongoose";

class Mongoose {
  async connect() {
    await connect(process.env.MONGODB_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("MongoDB connected...");
  }
}

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log(`UNCAUGHT REJECTION! Shutting down...`);
  process.exit(1); // 0 success, 1 failure
});

const mongoose = new Mongoose();
mongoose.connect();
