import "dotenv/config";
console.log("ENV PATH:", process.cwd());

console.log("PORT =", process.env.PORT);

console.log("MONGO =", process.env.MONGODB_URI ? "YES" : "NO");

console.log("JWT =", process.env.JWT_SECRET ? "YES" : "NO");

console.log("GEMINI =", process.env.GEMINI_API_KEY);
import app from './app.js';
import connectDB from './src/config/db.config.js';

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});