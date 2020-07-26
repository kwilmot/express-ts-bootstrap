import app from './app';
import dotenv from 'dotenv';

// initialize configuration
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});
