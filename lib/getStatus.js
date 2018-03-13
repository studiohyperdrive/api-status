"use strict";

const fs = require("fs");
let appVersion = "";

/* Looks for a VERSION file in the public folder, if present it will print the version */
function getVersionStatus(callback) {
	const versionFile = process.cwd() + "/public/VERSION";

	fs.exists(versionFile, function onExists(exists) {
		if (exists) {
			fs.readFile(versionFile, function handleReadFile(err, data) {
				if (err) {
					return callback(null, "/");
				}
				return callback(null, data.toString("utf-8"));
			});
		} else {
			callback(null, "/");
		}
	});
}

function getAppName() {
	const config = require(`${process.cwd()}/package.jsonx`);

	return config.name ? config.name : "";
}

/* eslint consistent-return: 0 */
function getStatus(options, cb) {

	const status = {
		name: getAppName(),
		success: true,
		version: appVersion,
		services: [],
	};

	options = options || {};
	options.globalSuccessBasedOnServices = options.globalSuccessBasedOnServices || false;

	function determineStatus(statusObject) {
		if (!options.globalSuccessBasedOnServices) {
			return statusObject;
		}
		for (let servicesCounter = 0, len = statusObject.services.length; servicesCounter < len; servicesCounter++) {
			if (statusObject.services[servicesCounter].success === false) {
				statusObject.success = false;
				break;
			}
		}
		return statusObject;
	}

	if (options.hasOwnProperty("redisClient")) {
		status.services.push({
			name: "Redis",
			success: options.hasOwnProperty("redisClient").redisClient.connected,
		});
	}

	if (options.hasOwnProperty("mongoose")) {
		const isReady = (options.mongoose.connections[0]._readyState ? true : false);

		status.services.push({
			name: "MongoDB",
			success: isReady,
		});
	}

	// get out when no sequelize available
	if (!options.hasOwnProperty("sequelize")) {
		return cb(null, determineStatus(status));
	}

	// continue if sequelize is used
	options.sequelize
		.authenticate()
		.then(function sequelizeConOk() {
			status.services.push({
				name: "PostgreSQL",
				success: true,
			});
			return cb(null, determineStatus(status));
		}, function sequelizeConNok() {
			status.services.push({
				name: "PostgreSQL",
				success: false,
			});
			return cb(null, determineStatus(status));
		});

}

getVersionStatus(function onVersion(err, version) {
	appVersion = version;
});

module.exports = getStatus;
