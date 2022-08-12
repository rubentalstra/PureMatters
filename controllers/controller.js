const { poolPromise } = require('../database/db');

exports.getHomePage = (req, res) => {
    return res.render('home');
};

exports.getDetailsPage = (req, res) => {
    const { id } = req.params;

    try {
        poolPromise.query('SELECT * FROM products WHERE id = ?', [id], function (err, result) {
            if (err) {
                throw err;
            }
            // console.log(result);
            return res.render('details', {
                id: id,
                details: JSON.parse(JSON.stringify(result)),
            });
        });
    } catch (error) {
        return console.log(error);
    }
};

exports.getEditPage = (req, res) => {
    return res.render('edit');
};

exports.getAllProducts = async (req, res) => {
    try {
        poolPromise.query('SELECT * FROM products', function (err, result) {
            if (err) {
                throw err;
            }
            // console.log(result);
            return res.json(result);
        });
    } catch (error) {
        return console.log(error);
    }
};

// exports.getProductDetails = async (req, res) => {
//     const { id } = req.params;

//     try {
//         poolPromise.query('SELECT * FROM products WHERE id = ?', [id], function (err, result) {
//             if (err) {
//                 throw err;
//             }
//             // console.log(result);
//             return res.json(result);
//         });
//     } catch (error) {
//         return console.log(error);
//     }
// };

exports.putProduct = async (req, res) => {
    const { id } = req.params;

    const oldAmount = req.body.oldAmount;
    const diffAmount = req.body.diffAmount;
    // const { test } = req.body;
    console.log(req.body);

    // console.log(req.body.type);

    if (req.body.type == 'sold') {
        console.log('sold');
        let sqlNumber = oldAmount - diffAmount;

        try {
            poolPromise.query(
                'UPDATE products SET amount = ? WHERE  id = ?',
                [sqlNumber, id],
                function (err, result) {
                    if (err) {
                        throw err;
                    }

                    poolPromise.query('SELECT * FROM products WHERE id = ?', [id], function (err, result) {
                        if (err) {
                            throw err;
                        }

                        return res.render('details', {
                            id: id,
                            details: JSON.parse(JSON.stringify(result)),
                        });
                    });
                }
            );
        } catch (error) {
            return console.log(error);
        }
    } else if (req.body.type == 'add') {
        console.log('add');
    }
};

exports.delProduct = async (req, res) => {
    const { id } = req.params;

    try {
        poolPromise.query('DELETE FROM products WHERE id = ?', [id], function (err, result) {
            if (err) {
                throw err;
            }
            if (result.affectedRows == 0) {
                return res.sendStatus(400);
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        return console.log(error);
    }
};

exports.getProductHistory = async (req, res) => {
    const { id } = req.params;

    try {
        poolPromise.query(
            'SELECT * FROM product_history WHERE id = ? ORDER BY last_modified_dt DESC',
            [id],
            function (err, result) {
                if (err) {
                    throw err;
                }
                // console.log(result);
                return res.json(result);
            }
        );
    } catch (error) {
        return console.log(error);
    }
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
