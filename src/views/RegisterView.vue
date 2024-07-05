<template>
  <div>
    <div class="form-wrap">
      <form class="register">
        <p class="login-register">
          Already have an account?
          <router-link class="router-link" :to="{name: 'login'}">Login</router-link>
        </p>
        <h2>Create your HUS<span style="color: red;">Tex</span> account</h2>
        <div class="inputs">
          <div class="input">
            <input name="firstname" type="text" placeholder="First Name" v-model="firstName">
          </div>
          <div class="input">
            <input name="lastname" type="text" placeholder="Last Name" v-model="lastName">
          </div>
          <div class="input">
            <input name="email" type="text" placeholder="Email" v-model="email">
          </div>
          <div class="input">
            <input name="username" type="text" placeholder="Username" v-model="username">
          </div>
          <div class="input">
            <input name="password" type="password" placeholder="Password" v-model="password">
          </div>
          <div v-show="error" class="error">{{ this.errorMsg }}</div>
        </div>
        <button @click.prevent="register">Sign Up</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'register',
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      error: null,
      errorMsg: "",
    }
  },
  methods: {
    async register() {
      const formEl = document.querySelector('.register');
      if ( this.email !== "" && this.password !== "" && this.firstName !== "" && this.lastName !== "" && this.username !== "") {
        this.error = false;
        this.errorMsg = "";

        const formData = new FormData(formEl);
        const data = new URLSearchParams(formData);

        await fetch('http://localhost:5237/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: data
        }).then(res=> {
          if (!res.ok) {
            console.log('Problem');
            return;
          }
          return res.json();
        }).then(data => {
          console.log(data);
        }).catch(error => {
          console.log(error);
        });

        // this.$router.push({ name: "home" });
        return;
      }
      this.error = true;
      this.errorMsg = "Please fill out all the fields";
      return;
    },
  }
}
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>