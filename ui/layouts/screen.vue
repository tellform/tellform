<template>
  <div class="screen bg-primary dark">
    <div class="content">
      <nuxt />
    </div>

    <div class="footer">
      <nuxt-link to="/login">Login</nuxt-link>
      <nuxt-link to="/register">Register</nuxt-link>
      <nuxt-link to="/admin">Manage</nuxt-link>
      <a href="https://ohmyform.com">OhMyForm</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .footer {
    height: 40px;
    text-align: center;

    a {
      padding-right: 16px;
      padding-left: 16px;
    }
  }
}
</style>
