import mongoose from "mongoose";

const MONGOUSER = process.env.MONGOUSER;
const MONGOPASSWORD = process.env.MONGOPASSWORD;
const MONGOHOST = process.env.MONGOHOST;

(async () => {
    try {
        await mongoose.connect(`mongodb+srv://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}`, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB...');
    } catch (error) {
        console.log('Could not connect to MongoDB...', error);
    }
})();

const conn = mongoose.connection.useDb('medicapp');

export default conn;