<template>
	<div>
		<div class='middle-page'>
			<div class='columns is-centered is-vcentered'>
				<div class='column is-8'>

					<div class='paper'>
						<div v-if="showBuyAgency">
							This email address has not been white-listed.
							To whitelist your email address you need to purchase an Agency plan
							<hr />
							<nuxt-link class='button is-fullwidth is-primary' to="/price/">Buy Agency Plan</nuxt-link>
							<a class='help' @click="showBuyAgency=false">Enter another email</a>
						</div>
						<div v-else>
							<h1 class='title'>Agency Login</h1>
							<form method="post" @submit.prevent="sendMagicLink">
								<div class="field">
									<label class="label">Email</label>
									<div class="control">
										<input type="email" class="input" name="email" placeholder="you@company.com" v-model="email" >
									</div>
								</div>
								<div class="control">
									<button type="submit" class="button is-link is-fullwidth">Send Magic Link</button>
								</div>
							</form>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
export default {
	layout:'page',
	data() {
		return {
			email: '',
			password: '',
			error: null,
			showBuyAgency:false,
			action:"login",
			loggingIn:false,
		}
	},

	mounted(){
		const magicToken = this.$route.query.token
		if(magicToken) {
			this.loggingIn = true
			this.convertToken(magicToken)
		}
	},

	methods: {
		sendMagicLink(){
			this.$axios.post("/api/jwt", {email:this.email})
		},

		async convertToken(magicToken){
			try {
				const res = await this.$auth.loginWith('magicLink', {
					data: { token: magicToken}
				})
				// const res = await this.$auth.loginWith('local', {
				// 	data: { token: magicToken, email:null, password:null }
				// })
				const token = localStorage.getItem('auth._token.local')
				if (token) {
					this.$axios.setHeader('Authorization', token)
					this.$router.push('/dashboard/')
				} else {this.error = "Error loggin in. Please try again"}
				//this.$router.push('/dashboard/')
			} catch (e) {
				console.log("ERRRRROR")
				console.log(e)
				this.error = JSON.stringify(e)
				this.error = e.response.data.message
			}
		},

		async login() {
			try {
				const res = await this.$auth.loginWith('local', {
					data: {
						email: this.email,
						password: this.password,
						action:"login"
					}
				})
				const token = localStorage.getItem('auth._token.local')
				if (token) {
					this.$axios.setHeader('Authorization', token)
					this.$router.push('/dashboard/')
				} else {this.error = "Error loggin in. Please try again"}
				//this.$router.push('/dashboard/')
			} catch (e) {
				this.error = e.response.data.message
			}
		}
	}
}
</script>
