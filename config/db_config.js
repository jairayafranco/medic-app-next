import mongoose from "mongoose";

const MONGOUSER = process.env.MONGOUSER;
const MONGOPASSWORD = process.env.MONGOPASSWORD;
const MONGOHOST = process.env.MONGOHOST;

mongoose.connect(`mongodb+srv://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const conn = mongoose.connection.useDb('medicapp');

export default conn;