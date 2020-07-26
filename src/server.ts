import app from './app';
import dotenv from 'dotenv';
import chalk from 'chalk';

// initialize configuration
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Express server listening on port ${chalk.green(`${PORT}`)}`);
});
