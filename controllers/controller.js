// const fetchManager = require('../utils/fetchManager');
// const csv1 = require('@fast-csv/parse');
// const { performance } = require('perf_hooks');

exports.getHomePage = (req, res) => {
    return res.render('home');
};

// exports.getTenantPage = async (req, res) => {
//     let tenant;

//     try {
//Getting tenant information requires Admin level
// permission
//         tenant = await fetchManager.callAPI(req.app.locals.appSettings.resources.armAPI.endpoint, req.session['armAPI'].accessToken);
//     } catch (error) {
//         return console.log(error);
//     }

//     return res.render('tenant', { isAuthenticated: req.session.isAuthenticated, tenant: tenant.value[0], configured: isConfigured(req) });
// };
