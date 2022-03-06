import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js";

const protect = asyncHandler( async (req, res, next) => {
  // console.log(req.headers.authorization) for testing purpose
    let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
      try {
          token = req.headers.authorization.split(' ')[1]

          const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //   console.log(decoded)

          req.user = await User.findById(decoded.id).select('-password') // password ko chorrkar baaki sab chize select ho jayengi .. password ko minus kr dia humne
          next()
      } catch (error) {
          console.log(error)
          res.status(401);
          throw new Error("Not authorised,no token");

      }
  } 
  if(!token){
    res.status(401);
    throw new Error("Not authorised,no token");
  }
});

export { protect };
