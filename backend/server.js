// Backend startup file.
// Starts the shared Express server and listens for incoming requests from all frontend apps.
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`E-commerce backend running on port ${PORT}`);
});
