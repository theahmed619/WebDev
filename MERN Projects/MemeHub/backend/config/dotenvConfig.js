import dotenv from 'dotenv';
import path from 'path';

// This finds the .env file in your root 'backend' folder
dotenv.config({ path: path.resolve(process.cwd(), '.env') });