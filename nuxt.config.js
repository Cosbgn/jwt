const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	head: {
		title: 'Nuxt Netlify Login',
			meta: [
			  { charset: 'utf-8' },
			  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
			  { hid: 'description', name: 'description', content: 'Nuxt Login Test' }
			],
			link: [ { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' } ],
	},

	generate: {fallback: true},

	modules: ["@nuxtjs/bulma", '@nuxtjs/proxy', '@nuxtjs/axios', '@nuxtjs/auth'],

	css: [],

	loading: { color: '#FFE4B5' },

	proxy: { // For Localhost, on Production is done by Netlify Redirects
		'/api': {
			target: 'http://localhost:9000',
			pathRewrite: { '^/api': 'http://localhost:9000' }

		}
	},

	auth: {
		cookie: true, // We can't use cookies because we are serverless
		strategies: {
			local: { // If magicLink works we should use local:false
				endpoints: {
					//login: { url: 'api/login', method: 'post', propertyName: 'data.token' },
					login: { url: 'api/jwt', method: 'post', propertyName: 'token' },
					//register: { url: 'api/register', method: 'post', propertyName: 'data.token' },
					user: { url: 'api/user', method: 'get', propertyName: false },
					logout: false // Since we are stateless we simply remove the user from Localhost
				}
			},
		}
	},

	build: {
		html: {minify: {removeOptionalTags: false}},
		extend (config, { isDev }) {
		  if (isDev && process.client) {
		    config.module.rules.push({
		      enforce: 'pre',
		      test: /\.(js|vue)$/,
		      loader: 'eslint-loader',
		      exclude: /(node_modules)/
		    })
		  }
		}
	}
}
