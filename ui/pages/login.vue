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

      <b-form-group label-for="password">
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          placeholder="Password"
          trim
        ></b-form-input>
      </b-form-group>

      <b-form-group label-for="session">
        <b-form-checkbox id="session" v-model="session">
          Login only for current Tab
        </b-form-checkbox>
      </b-form-group>

      <b-button type="submit" block variant="primary">Login</b-button>
      <nuxt-link to="/recover" class="recover">Forgot your password?</nuxt-link>
    </b-form>
  </div>
</template>

<script>
export default {
  layout: 'screen',
  auth: 'guest',
  data() {
    return {
      username: '',
      password: '',
      session: true
    }
  },
  methods: {
    async submit() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })

        this.$router.push('/admin')
      } catch (e) {
        // TODO failed login
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
