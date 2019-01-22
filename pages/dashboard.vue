<template>
	<div>
		<section class='section'>
			Hello, you are now logged in
			<hr />
			{{$store.state.auth}}
			<div class='buttons'>
				<a class="button is-primary" @click="addTodo()">Add To-do</a>
				<a class="button is-danger" @click="logout()">Logout</a>
			</div>
		</section>
	</div>
</template>

<script>

export default {
	middleware: 'auth',
	data(){
		return{
			step:0,
		}
	},
	methods:{
		addTodo(){
				this.$axios.post("/api/add-todo", {}).then(r => console.log(r.data))
		},
		logout() {
			this.$axios.setHeader(false)
  			this.$auth.logout();
		}
	}

}
</script>

<style>
</style>
