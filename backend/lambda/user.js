import axios from "axios";
const jwt = require('jsonwebtoken');
const secretKey = "REPLACE_WITH_SUPER_SECRET_KEY_HERE"

exports.handler = async (event, context) => {

		if (event.httpMethod !== "GET") {
			return { statusCode: 405, body: "Method Not Allowed" }
		}

		const token = event['headers']['authorization']

	    if (!token) {
			return {
				statusCode: 400,
				body: JSON.stringify({type: 'error', message: 'authorization header not found.'})
			}
		}
		return jwt.verify(token.substr(7), secretKey, (error, result) => {
			if (error) {
				return {
					statusCode: 400,
					body: JSON.stringify({
						type: 'error',
						message: 'Provided token is invalid.',
						error:error
					})
				}
			}
			return {
				statusCode: 200,
				body: JSON.stringify({
					type: 'success',
					message: 'Provided token is valid.',
					result:result
				})
			}
		})

}
