const express = require('express');
const { scrapeCricbuzz } = require('./scraper');

const app = express();

// Middleware
app.use(express.json());

// Root endpoint for API info
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Cricbuzz News API",
        creator: "@Raviya",
        endpoints: {
            news: "/api/news"
        }
    });
});

// Cricbuzz News API
app.get('/api/news', async (req, res) => {
    const result = await scrapeCricbuzz();
    res.json(result);
});

// Local testing (Vercel එක මේක ගණන් ගන්නේ නෑ)
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log(`✅ Server is running on http://localhost:3000`);
    });
}

// Vercel එකට අනිවාර්යයි
module.exports = app;
