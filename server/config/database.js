import { connect } from 'mongoose';
import 'colors';

const dbConnection = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default dbConnection;

