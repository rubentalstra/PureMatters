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

    router.get('/settings-products', mainController.getSettingsPage);
    router.get('/add-products', mainController.getAddPage);
    router.get('/edit/:id', mainController.getEditPage);
    router.get('/duplicate/:id', mainController.getDuplicatePage);

    // system settings
    router.get('/system-settings', mainController.getSystemSettingsPage);

    // API
    router.get('/api/products', mainController.getAllProducts);
    router.post('/api/products/create', mainController.createProduct);
    router.post('/api/products/edit/:id', mainController.editProduct);
    router.post('/api/products/duplicate/:id', mainController.duplicateProduct);
    router.post('/api/products/delete', mainController.delProduct);

    // export
    router.get('/api/products/export', mainController.exportProducts);
    router.get('/api/products/history/:id', mainController.getProductHistory);
    router.post('/api/products/:id', mainController.putProduct);

    // reserved
    router.get('/api/products/reserved/:id', mainController.getProductReserved);
    router.post('/api/products/reserved/create', mainController.createReserved);
    router.post('/api/products/reserved/edit', mainController.editReserved);
    router.post('/api/products/reserved/delete', mainController.delReserved);
    router.post('/api/products/reserved/soled', mainController.soledReserved);

    // order
    router.get('/api/products/order/:id', mainController.getProductOrder);
    router.post('/api/products/order/create', mainController.createOrder);
    router.post('/api/products/order/edit', mainController.editOrder);
    router.post('/api/products/order/delete', mainController.delOrder);
    router.post('/api/products/order/received', mainController.OrderReceived);

    // system settings
    /// Category
    router.get('/api/settings/categories', mainController.getAllCategories);
    router.post('/api/settings/categories/create', mainController.createCategory);
    router.post('/api/settings/categories/edit', mainController.editCategory);
    router.post('/api/settings/categories/delete', mainController.delCategory);
    /// Manufacturer
    router.get('/api/settings/manufacturers', mainController.getAllManufacturers);
    router.post('/api/settings/manufacturers/create', mainController.createManufacture);
    router.post('/api/settings/manufacturers/edit', mainController.editManufacture);
    router.post('/api/settings/manufacturers/delete', mainController.delManufacture);

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
