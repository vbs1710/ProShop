import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function(enteredPassword){  // iss function ko isse const User = mongoose.model('User',userSchema) upar rkhna h ... pehle iss line ke niche tha toh function is not defined aa rha tha pr jab upar rkha toh chal gya 
  return await bcrypt.compare(enteredPassword,this.password)  // this.password ek particular user ka password h jo ki database mei stored h aur encrypted h ... aue enteredPassword vo password h jo hum enter kr rhe h .. ye function inn dono ko compare krega aur batayega ki ye dono same h ya nhi
}

userSchema.pre('save',async function (next) {
  if(!this.isModified('password')){
    next()
  } // sabse pehla ye kaam h ki user ko password ko hash krna ...toh basically yaha pre matlab pehle aUR parenthsis mei save h .. matlab ki user ke save krne se pehle ye sab kaam hoga.... toh hum password ko hash kr rhe h middleware ke andar.... ab jo upar likha h ismodified kuch .. uska significance ye h ki jab bhi password modify na ho toh direct next kr do aur agar password modify ho ya password create hokar hash ho rkha h toh hum usko upate krenge hash krke
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})


const User = mongoose.model('User',userSchema)


export default User