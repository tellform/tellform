<template>
  <div>
    <b-navbar variant="primary" toggleable="sm" type="dark">
      <b-navbar-brand href="https://ohmyform.com">
        <img src="../assets/img/logo_white_small.png" style="height: 27px" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            :active="/\/admin\/forms/.test($route.fullPath)"
            to="/admin/forms"
          >
            Forms
          </b-nav-item>
          <b-nav-item
            :active="/\/admin\/users/.test($route.fullPath)"
            to="/admin/users"
          >
            Users
          </b-nav-item>
          <b-nav-item
            :active="/\/admin\/configuration/.test($route.fullPath)"
            to="/admin/configuration"
          >
            Configuration
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <font-awesome-icon icon="user-circle" />
            </template>
            <b-dropdown-item to="/admin/me">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <nuxt />
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()

      this.$router.push('/login')
    }
  }
}
</script>
