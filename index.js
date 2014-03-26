'use strict';
var request = require('request');

module.exports = function (email, token, cb) {
	if (typeof email !== 'string' && emai.indexOf('@') !== -1) {
		throw new Error('`email` required');
	}

	if (typeof token === 'function') {
		cb = token;
		token = null;
	}

	var headers = {
		'User-Agent': 'github-username node module'
	};

	if (token) {
		headers['Authorization'] = 'token ' + token;
	}

	request.get({
		url: 'https://api.github.com/search/users',
		json: true,
		qs: {
			q: email + ' in:email'
		},
		headers: headers
	}, function (err, res, body) {
		if (err || res.statusCode !== 200) {
			return cb(err || new Error('Status code: ' + res.statusCode));
		}

		if (body.total_count === 0) {
			return cb(new Error('Couldn\'t find a username for the supplied email'));
		}

		cb(null, body.items[0].login);
	});
};