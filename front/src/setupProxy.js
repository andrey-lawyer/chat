const { legacyCreateProxyMiddleware: createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
	app.use(
		"/api/*",
		createProxyMiddleware({
			target: process.env.REACT_APP_BACKEND_PATH,
			changeOrigin: true,
		})
	);
};






