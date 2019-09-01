<template>
  <div class="screen">
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
  background: #173e43;
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
      color: #dddfd4;
      padding-right: 16px;
      padding-left: 16px;

      &:hover {
        color: #fae596;
      }
    }
  }
}
</style>
