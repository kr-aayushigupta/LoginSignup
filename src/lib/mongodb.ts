import mongoose from 'mongoose';

// use non-null assertion operator ! it tells ts that something that looks like it coulld be null ,it can trust you that its not null
const MONGODB_URI=process.env.MONGO!;

if(!MONGODB_URI){
    throw new Error ("Please define mongo environment variable")
}

async function connectToDatabase(){
    if(mongoose.connection.readyState===1){
        return mongoose;
    }
    const opts={
        bufferCommands:false,
    }
    await mongoose.connect(MONGODB_URI,opts);
    return mongoose;

}
export default connectToDatabase;