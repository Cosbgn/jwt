<template>
	<div>
		<section class='section'>
			<div class='columns is-centered'>
				<div class='column is-6'>
					<h1 class='title'>Hello!</h1>
					<hr />
					<div class='buttons'>
						<!-- <nuxt-link class='button is-link' to="/register/">Register</nuxt-link> -->
						<nuxt-link class='button is-primary' to="/login/">Login</nuxt-link>
						<nuxt-link class='button is-warning' to="/dashboard/">Dashboard</nuxt-link>
						<a class='button is-danger' @click="logout()">Logout</a>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>

export default {
	methods:{
		logout(){
			this.$axios.setHeader(false);
			this.$auth.logout();
		}
	}
}
</script>

<style>
</style>
