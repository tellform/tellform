<template>
  <div>
    <b-alert show variant="info" class="m-3">
      Available Users, since you are an admin you can edit them
    </b-alert>

    <b-table striped hover :items="provider" :fields="fields">
      <template slot="[menu]" slot-scope="data">
        <nuxt-link :to="'/admin/users/' + data.item.id">Open</nuxt-link>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      fields: [
        {
          key: 'username'
        },
        {
          key: 'email'
        },
        {
          key: 'roles'
        },
        {
          key: 'created'
        },
        {
          key: 'menu'
        }
      ]
    }
  },
  methods: {
    provider(ctx) {
      return this.$axios.$get('/api/users')
    }
  }
}
</script>
