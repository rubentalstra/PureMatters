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

exports.getSettingsPage = (req, res) => {
    return res.render('settings');
};

exports.getAddPage = (req, res) => {
    return res.render('add');
};

exports.getSystemSettingsPage = (req, res) => {
    return res.render('system-settings');
};

exports.getEditPage = (req, res) => {
    const { id } = req.params;

    try {
        poolPromise.query('SELECT * FROM products WHERE id = ?', [id], function (err, result) {
            if (err) {
                throw err;
            }
            // console.log(result);
            return res.render('edit', {
                id: id,
                product: JSON.parse(JSON.stringify(result)),
            });
        });
    } catch (error) {
        return console.log(error);
    }
};

exports.getDuplicatePage = (req, res) => {
    const { id } = req.params;

    try {
        poolPromise.query('SELECT * FROM products WHERE id = ?', [id], function (err, result) {
            if (err) {
                throw err;
            }
            // console.log(result);
            return res.render('duplicate', {
                id: id,
                product: JSON.parse(JSON.stringify(result)),
            });
        });
    } catch (error) {
        return console.log(error);
    }
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

exports.getAllCategories = async (req, res) => {
    try {
        poolPromise.query('SELECT * FROM category_list', function (err, result) {
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

exports.getAllManufacturers = async (req, res) => {
    try {
        poolPromise.query('SELECT * FROM manufacturers_list', function (err, result) {
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

exports.putProduct = async (req, res) => {
    const { id } = req.params;

    const oldAmount = req.body.oldAmount;
    const diffAmount = req.body.diffAmount;
    // const { test } = req.body;
    console.log(req.body);

    // console.log(req.body.type);

    if (req.body.type == 'sold') {
        console.log('sold');
        let sqlNumber = Number(oldAmount) - Number(diffAmount);

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
        let sqlNumber = Number(diffAmount) + Number(oldAmount);

        console.log(sqlNumber);

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
    }
};

exports.createProduct = async (req, res) => {
    const { name, sex, category, color, size, amount } = req.body;

    // console.log(name);
    // console.log(category);
    // console.log(color);
    // console.log(size);
    // console.log(amount);

    try {
        poolPromise.query(
            'INSERT INTO products(name,sex,category,color,size,amount)VALUES(?,?,?,?,?,?)',
            [name, sex, category, color, size, amount],
            function (err, result) {
                if (err) {
                    throw err;
                }
                if (result.affectedRows == 0) {
                    return res.sendStatus(400);
                }

                return res.render('settings');
            }
        );
    } catch (error) {
        return console.log(error);
    }
};

exports.editProduct = async (req, res) => {
    const { id } = req.params;
    const { name, sex, category, color, size } = req.body;

    // console.log(name);
    // console.log(category);
    // console.log(color);
    // console.log(size);

    try {
        poolPromise.query(
            'UPDATE products SET name = ?, sex = ?, category = ?, color = ?, size = ? WHERE id = ?',
            [name, sex, category, color, size, id],
            function (err, result) {
                if (err) {
                    throw err;
                }
                if (result.affectedRows == 0) {
                    return res.sendStatus(400);
                }

                return res.render('settings');
            }
        );
    } catch (error) {
        return console.log(error);
    }
};

exports.duplicateProduct = async (req, res) => {
    const { name, sex, category, color, size, amount } = req.body;

    // console.log(name);
    // console.log(category);
    // console.log(color);
    // console.log(size);
    // console.log(amount);

    try {
        poolPromise.query(
            'INSERT INTO products(name,sex,category,color,size,amount)VALUES(?,?,?,?,?,?)',
            [name, sex, category, color, size, amount],
            function (err, result) {
                if (err) {
                    throw err;
                }
                if (result.affectedRows == 0) {
                    return res.sendStatus(400);
                }

                return res.render('settings');
            }
        );
    } catch (error) {
        return console.log(error);
    }
};

exports.delProduct = async (req, res) => {
    // console.log(req.body);

    const id = req.body.pid;

    try {
        poolPromise.query('DELETE FROM products WHERE id = ?', [id], function (err, result) {
            if (err) {
                throw err;
            }
            if (result.affectedRows == 0) {
                return res.sendStatus(400);
            }

            poolPromise.query('DELETE FROM product_history WHERE id = ?', [id], function (err, result) {
                if (err) {
                    throw err;
                }

                return res.render('settings');
            });
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

// Category

exports.createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        poolPromise.query('INSERT INTO category_list(name)VALUES(?)', [name], function (err, result) {
            if (err) {
                throw err;
            }
            if (result.affectedRows == 0) {
                return res.sendStatus(400);
            }

            return res.render('system-settings');
        });
    } catch (error) {
        return console.log(error);
    }
};

exports.editCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        poolPromise.query(
            'UPDATE category_list SET name = ? WHERE id = ?',
            [name, id],
            function (err, result) {
                if (err) {
                    throw err;
                }
                if (result.affectedRows == 0) {
                    return res.sendStatus(400);
                }

                return res.render('system-settings');
            }
        );
    } catch (error) {
        return console.log(error);
    }
};

exports.delCategory = async (req, res) => {
    const id = req.body.pid;

    try {
        poolPromise.query('DELETE FROM category_list WHERE id = ?', [id], function (err, result) {
            if (err) {
                throw err;
            }
            if (result.affectedRows == 0) {
                return res.sendStatus(400);
            }

            return res.render('system-settings');
        });
    } catch (error) {
        return console.log(error);
    }
};

// Manufacture

exports.createManufacture = async (req, res) => {
    const { name } = req.body;

    try {
        poolPromise.query('INSERT INTO manufacturers_list(name)VALUES(?)', [name], function (err, result) {
            if (err) {
                throw err;
            }
            if (result.affectedRows == 0) {
                return res.sendStatus(400);
            }

            return res.render('system-settings');
        });
    } catch (error) {
        return console.log(error);
    }
};

exports.editManufacture = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        poolPromise.query(
            'UPDATE manufacturers_list SET name = ? WHERE id = ?',
            [name, id],
            function (err, result) {
                if (err) {
                    throw err;
                }
                if (result.affectedRows == 0) {
                    return res.sendStatus(400);
                }

                return res.render('system-settings');
            }
        );
    } catch (error) {
        return console.log(error);
    }
};

exports.delManufacture = async (req, res) => {
    const id = req.body.idManufacturer;

    console.log(id);

    try {
        poolPromise.query('DELETE FROM manufacturers_list WHERE id = ?', [id], function (err, result) {
            if (err) {
                throw err;
            }
            if (result.affectedRows == 0) {
                return res.sendStatus(400);
            }

            return res.render('system-settings');
        });
    } catch (error) {
        return console.log(error);
    }
};
