import axios from "axios"

const jwt = require('jsonwebtoken');
const secretKey = "REPLACE_WITH_SUPER_SECRET_KEY_HERE"

exports.handler = async (event, context) => {
	if (event.httpMethod !== "POST") {
		return { statusCode: 405, body: "Method Not Allowed" }
	}
	const body = JSON.parse(event.body)
	const email = body.email

	if ("token" in body) { // We convert short lived email token to real one
		try {
			const decodedMagicLink = jwt.verify(body['token'], secretKey)
		} catch(e) {
			return {
				statusCode: 400,
				body: JSON.stringify({ type: 'error', message: 'Provided token is expired or not valid.'})
			}
		}
		console.log("decodedMagicLink: ", decodedMagicLink)
		console.log("DECODED EMAIL: ", decodedMagicLink.data.email)
		const user = decodedMagicLink.data
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
		console.log("Encoded in the token the email: ", email)
		const user = {email:email}
		const token = jwt.sign({data: user}, secretKey, { expiresIn: '1h' })
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
