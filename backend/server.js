import express from 'express'
// import products from './data/products.js' -->iss line ki requirement nhi h ab kyuki humne productRoutes bana diye h aur ab database se product fetch krenge  .............// jab ES16 matlab ye import wala syntax use krenge express mei toh javascript file ka .js extension bhi lagana zruri h ... aur ye syntax use krne ke liye humei package.json mei "type":"module" lagana zruri h 
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/',(req,res) => {
    res.send('API is running...')
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

// npm i -D nodemon concurrently ---> ab ye dono dependency sirf development mei rhengi .. sirf dev mode mei rhengi ..this is the significance of that -D....they are devDependencies