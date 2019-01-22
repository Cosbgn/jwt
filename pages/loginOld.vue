<template>
	<section class="section">
	<div class="container">
		<div class="columns">
		<div class="column is-4 is-offset-4">
			<h2 class="title has-text-centered">Welcome back!</h2>

			<div class='notification is-danger'v-if="error"> {{error}} </div>

			<form method="post" @submit.prevent="login">
			<div class="field">
				<label class="label">Email</label>
				<div class="control">
					<input type="email" class="input" name="email" v-model="email" >
				</div>
			</div>
			<div class="field">
				<label class="label">Password</label>
				<div class="control">
					<input type="password" class="input" name="password" v-model="password" >
				</div>
			</div>
			<div class="control">
				<button type="submit" class="button is-dark is-fullwidth">Log In</button>
			</div>
			</form>
			<div class="has-text-centered" style="margin-top: 20px">
			<p>
				Don't have an account? <nuxt-link to="/register">Register</nuxt-link>
			</p>
			</div>
		</div>
		</div>
	</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			password: '',
			error: null
		}
	},

	methods: {
		async login() {
			try {
			const res = await this.$auth.loginWith('local', {
				data: {
					email: this.email,
					password: this.password
				}
			})
			const token = localStorage.getItem('auth._token.local')
			console.log('token', token)
			if (token) {
				this.$axios.setHeader('Authorization', token)
				this.$router.push('/dashboard/')
			} else {this.error = "Error loggin in. Please try again"}
			//this.$router.push('/dashboard/')
			} catch (e) {
				console.log(e)
				this.error = e.response.data.message
			}
		}
	}
}
</script>
