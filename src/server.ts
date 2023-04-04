import express from 'express';
import { routes } from './startup/routes';

const PORT = process.env.PORT;
const app = express();

// CORS access control
app.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy-Report-Only",
        `connect-src https://pokeapi.co`
    );
    return next();
});

// Publish routes
routes(app);

// Start the web server listening on the specified port
app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
);

export const server = app;