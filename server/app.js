"use strict";
var express = require("express");
var path_1 = require("path");
var body_parser_1 = require("body-parser");
var api_1 = require("./routes/api");
require('./typesext');
var app = express();
exports.app = app;
app.disable("x-powered-by");
app.use(express.static(path_1.join(__dirname, '../public')));
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
// api routes
app.use("/api", api_1.restApi);
app.use('/client', express.static(path_1.join(__dirname, '../client')));
if (app.get("env") === "development") {
    app.use(express.static(path_1.join(__dirname, '../node_modules')));
    app.use(express.static(path_1.join(__dirname, '../tools')));
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}
// Error 404
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    next(err);
});
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});
//# sourceMappingURL=app.js.map