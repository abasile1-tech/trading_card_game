const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/cardpresentation",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7282',
        secure: false
    });

    app.use(appProxy);
};
