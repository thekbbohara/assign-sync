import mongoose from "mongoose"

type ConnectionObject = {
  isConnected?: number;
}

const connection: ConnectionObject = {};

const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Already Connected to DB")
    return
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!)

    connection.isConnected = db.connections[0].readyState
    console.log("DB Connected Successfully")
  } catch (err) {

    console.log("DB Connection Failed", err)
    process.exit(1)
  }
}
export default dbConnect;
