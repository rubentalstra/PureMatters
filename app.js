require('dotenv').config({ path: `./env/.env` });
const express = require('express');

const spdy = require('spdy');

const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

const fs = require('fs');
const path = require('path');
const getRoutes = require('./router/router');
const mainController = require('./controllers/controller');

const app = express();

Sentry.init({
    dsn: 'https://765aef555b484dfe9ba7376a879757a8@o1355496.ingest.sentry.io/6640081',
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
    ],
    // This is the diffrent environments of the server
    // environment: process.env.NODE_ENV,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.get('/favicon.ico', (req, res) => {
    return res.sendFile(path.join(__dirname + '/public/icon/favicon.png'));
});

// View engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Static files and other configurations
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
// app.use('/WEB/V2/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/umd')));
app.use('/fontawesome', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));
// END

app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, './public')));
app.use('/', express.static(path.join(__dirname, 'public')));

// set up routes with authentication
app.use(getRoutes(mainController, express.Router()));

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + '\n');
});

// set up routes with authentication
// app.use(getRoutes(mainController, authProvider, express.Router()));

// http
// app.listen(process.env.API_PORT || 80, () => {
//     console.log('listening port ' + process.env.API_PORT || 80);
// });

// https
// const options = {
//   key: readFileSync("./cert/server.key"),
//   cert: readFileSync("./cert/server.cert"),
// };

// const server = https.createServer(options, app);
// server.listen(appSettings.host.port, () => {
//   console.log(
//     `Msal Node Auth Code Sample app listening on port ${appSettings.host.port}!`
//   );
// });

// https/2
var options = {
    // Private key
    key: fs.readFileSync('./cert/key.key'),
    cert: fs.readFileSync('./cert/cert.crt'),

    // **optional** SPDY-specific options
    spdy: {
        protocols: ['h2', 'http/1.1'],
        // plain: false,

        // **optional**
        // Parse first incoming X_FORWARDED_FOR frame and put it to the
        // headers of every request.
        // NOTE: Use with care! This should not be used without some proxy that
        // will *always* send X_FORWARDED_FOR
        // 'x-forwarded-for': true,
    },
};

const server = spdy.createServer(options, app);
server.listen(process.env.API_PORT || 80, () => {
    console.log(`Msal Node Auth Code Sample app listening on port ${process.env.API_PORT || 80}!`);
});
