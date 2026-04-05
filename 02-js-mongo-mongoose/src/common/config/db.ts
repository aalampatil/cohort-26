import mongoose from "mongoose";

export const connecDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/test`,
    );
    console.log(`connected to db !!! ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("db connection failed", error);
  }
};
