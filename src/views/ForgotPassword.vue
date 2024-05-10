<template>
  <div class="reset-password">
    <Modal v-if="modalActive" v-on:close-modal="closeModal"/>
    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <h2>Reset Password</h2>
        <p>Forgot your passowrd? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/ModalView";
import Loading from "../components/LoadingView.vue"
export default {
  name: 'forgot-password',
  data() {
    return {
      email: null,
      modalActive: false,
      modalMessage: "",
      loading: null,
    }
  },
  components: {
    Modal,
    Loading,
  },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
    }
  }

}
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>