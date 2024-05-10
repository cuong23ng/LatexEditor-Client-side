<template>
  <div>
    <div class="form-wrap">
      <form class="register">
        <p class="login-register">
          Already have an account?
          <router-link class="router-link" :to="{name: 'register'}">Login</router-link>
        </p>
        <h2>Create your HUS<span style="color: red;">Tex</span> account</h2>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="First Name" v-model="firstName">
          </div>
          <div class="input">
            <input type="text" placeholder="Last Name" v-model="lastName">
          </div>
          <div class="input">
            <input type="text" placeholder="Email" v-model="email">
          </div>
          <div class="input">
            <input type="text" placeholder="Username" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="Password" v-model="password">
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import "firebase/auth"
import { addDoc } from "firebase/firestore"; 
import { auth, colRef } from "../firebase/firebaseInit.js";

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
      if ( this.email !== "" && this.password !== "" && this.firstName !== "" && this.lastName !== "" && this.username !== "") {
        this.error = false;
        this.errorMsg = "";
        
        await createUserWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
          const firstName = userCredential.firstName;
          const lastName = userCredential.lastName;
          const username = userCredential.username;
          const email = userCredential.email;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
        
        addDoc(colRef, {
          firstName: this.firstName,
          lastName: this.firstName,
          username: this.username,
          email: this.email,
        });

        this.$router.push({ name: "home" });
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