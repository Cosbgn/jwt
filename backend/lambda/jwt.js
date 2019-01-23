import axios from "axios"

const jwt = require('jsonwebtoken');
const secretKey = "super_secret"

exports.handler = async (event, context) => {
	if (event.httpMethod !== "POST") {
		return { statusCode: 405, body: "Method Not Allowed" }
	}
	const body = JSON.parse(event.body)
	const email = body.email

	if ("token" in body) { // We convert short lived email token to real one
		const decodedMagicLink = jwt.verify(body['token'], secretKey)
		console.log("DECODED EMAIL: ", decodedMagicLink.email)
		const user = {email: decodedMagicLink.email}
		return {
			statusCode: 200,
			body: JSON.stringify({
				type: 'success',
				message: 'Provided token is valid.',
				user: user,
				token: jwt.sign({data: user}, secretKey, { expiresIn: '180 days' })
			})
		}
	}
	else { // We send a short lived token via Email
		const token = jwt.sign({data: email}, secretKey, { expiresIn: '1h' })
		const tokenUrl = `http://localhost:3000/login/?token=${token}`
		// send email
		console.log("Console log copy paste this url to loggin: ", tokenUrl)
		return { statusCode: 200, body: JSON.stringify({ type: 'success', message: 'Magic link sent' }) }
		// const emailData = {
		// 					"to":email,
		// 					"subject":"Magic Login Link",
		// 					"html": `<p>Hello, use this link to login <br> ${tokenUrl}</p>`,
		// 					"company": "Acme",
		// 					"sendername": "Acme Customer support"
		// 				}
		//mail.post("", emailData)
		// .then(r => {
		// 	return { statusCode: 200, body: JSON.stringify({ type: 'success', message: 'Magic link sent' }) }
		// })
		// .catch(r => {
		// 	return { statusCode: 400, body: JSON.stringify({ type: 'error', message: 'Error sending magic link' }) }
		// })
	}
}
