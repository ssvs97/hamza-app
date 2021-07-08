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

const mongoose = new Mongoose();
mongoose.connect();
