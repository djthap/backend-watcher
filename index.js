import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'
import videoRoutes from './routes/videos.js'
import commentRoutes from './routes/comments.js'
import authRoutes from './routes/auth.js'
import paymentRoutes from './routes/payment.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// Load environment variables from .env file
dotenv.config()

// Create Express app
const app = express()

// Middleware
app.use(
	cors({
		origin: 'https://watcher-front.vercel.app/',
		optionsSuccessStatus: 200,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	})
)
app.use(cookieParser())
app.use(express.json())

// Connect to MongoDB
const connectToDB = async () => {
	try {
		await mongoose.connect(
			'mongodb+srv://tarunkc22ca:27tkcMongoDB@cluster0.muk3ggm.mongodb.net/?retryWrites=true&w=majority',
			{ useNewUrlParser: true, useUnifiedTopology: true }
		)
		console.log('Connected to MongoDB')
	} catch (error) {
		console.error('Error connecting to MongoDB:', error.message)
		process.exit(1) // Exit process with failure
	}
}
connectToDB()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/videos', videoRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/payments', paymentRoutes)

// Error handler
app.use((err, req, res, next) => {
	const status = err.status || 500
	const message = err.message || 'Something went wrong!'
	return res.status(status).json({ success: false, status, message })
})

// Start server
const PORT = process.env.PORT || 5002
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
