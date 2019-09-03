<template>
  <div>
    <img src="../assets/img/logo_white_small.png" alt="OhMyForm" />

    <b-form class="box" @submit.prevent="submit">
      <b-form-group label-for="username">
        <b-form-input
          id="username"
          v-model="username"
          trim
          placeholder="Username or Email"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" block variant="primary">Request Reset</b-button>
      <nuxt-link to="/login" class="recover">
        Just remembered your password? Sign in here
      </nuxt-link>
    </b-form>
  </div>
</template>

<script>
export default {
  layout: 'screen',
  auth: 'guest',
  data() {
    return {
      username: ''
    }
  },
  methods: {
    async submit() {
      try {
        await this.$axios.$post('/auth/recover', {
          username: this.username
        })

        // TODO success
      } catch (e) {
        // TODO show error
      }
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 80%;
  width: 300px;
}
.box {
  margin-top: 60px;
  height: 400px;
  padding-left: 8px;
  padding-right: 8px;

  /deep/ .custom-checkbox {
    .custom-control-label {
      color: #fff;
    }
  }
}
.recover {
  display: block;
  padding-top: 15px;
  color: #fff;
  font-size: 14px;
}
</style>
