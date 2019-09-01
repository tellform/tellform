<template>
  <div>
    <img src="../assets/img/logo_white_small.png" alt="OhMyForm" />

    <b-form class="box" @submit="submit">
      <b-form-group label-for="username">
        <b-form-input
          id="username"
          v-model="name"
          trim
          placeholder="Username or Email"
        ></b-form-input>
      </b-form-group>

      <b-form-group label-for="password">
        <b-form-input
          id="password"
          v-model="name"
          type="password"
          placeholder="Password"
          trim
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" block variant="primary">Login</b-button>
      <nuxt-link to="/recover" class="recover">Forgot your password?</nuxt-link>
    </b-form>
  </div>
</template>

<script>
export default {
  layout: 'screen',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submit() {
      // TODO
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
}
.recover {
  display: block;
  padding-top: 15px;
  color: #fff;
  font-size: 14px;
}
</style>
