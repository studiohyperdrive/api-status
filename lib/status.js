"use strict";

const getStatus = require("./getStatus");

function statusRoute(app, options) {

	let arrPaths = ["/status"];

	// check if another path is provided
	if (options && options.path) {
		// a single string
		if (typeof options.path === "string") {
			arrPaths.push(options.path);
		}

		// an array of paths
		if (Array.isArray(options.path)) {
			arrPaths = arrPaths.concat(options.path);
		}

	}

	arrPaths.forEach(function(path) {

		app.use(path, function onStatus(req, res) {
			getStatus(options, function handleStatusService(err, statusResponseObject) {
				res.json(statusResponseObject);
			});
		});

	});

}

module.exports = statusRoute;
