require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connectDB = require('./config/db')
const userRouter = require('./routers/userRouter')
const postRouter = require('./routers/postRouter')
const path = require('path')
const config = require('config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use('/public/uploads', express.static(path.join('public', 'uploads')))

app.use('/api', userRouter)
app.use('/api', postRouter)

const PORT = process.env.PORT || config.get('port')
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

connectDB()
