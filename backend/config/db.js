import mongoose from 'mongoose'

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)    
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } 
    catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1) // iske andar 1 pass krne ka matlab ye h ki it is going to exit with failure
    }
}

export default connectDB