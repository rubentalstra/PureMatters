//multer
// var multer = require('multer');
var fs = require('fs');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
// const sanitizeHtml = require('sanitize-html');
// var upload = multer();

const getRoutes = (mainController, router) => {
    // app routes

    router.get('/', (req, res) => {
        // console.log(req.session);
        res.redirect('/home');
    });

    router.get('', (req, res) => {
        // console.log(req.session);
        res.redirect('/home');
    });

    // router.get('/debug-sentry', (req, res) => {
    //     throw new Error('My first Sentry error!');
    // });

    // Pages
    router.get('/home', mainController.getHomePage);
    router.get('/details/:id', mainController.getDetailsPage);
    router.get('/edit-products', mainController.getEditPage);

    // API
    router.get('/api/products', mainController.getAllProducts);

    router.get('/api/products/history/:id', mainController.getProductHistory);

    // router.get('/api/products/:id', mainController.getProductDetails);
    router.post('/api/products/:id', mainController.putProduct);
    router.delete('/api/products/:id', mainController.delProduct);

    // router.post(
    //     '/uploadCSV',

    //     authProvider.isAuthenticated,
    //     upload.single('file'),
    //     mainController.postUploadCSVPage
    // );

    // router.get('/tenant', authProvider.isAuthenticated, authProvider.getToken, mainController.getTenantPage); // get token for this route to call web API

    // The error handler must be before any other error middleware and after all controllers
    router.use(Sentry.Handlers.errorHandler());

    // 404
    // router.get('*', (req, res) => res.status(404).redirect('/404.html'));

    // Optional fallthrough error handler
    router.use(function onError(err, req, res, next) {
        // The error id is attached to `res.sentry` to be returned
        // and optionally displayed to the user for support.
        res.statusCode = 500;
        res.end(res.sentry + '\n');
    });

    return router;
};

module.exports = getRoutes;
