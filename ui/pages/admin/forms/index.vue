<template>
  <div>
    <b-alert show variant="info" class="m-3">
      All created forms, they are publicly visible if live is true
    </b-alert>

    <fab bg-color="#173e43" />
    <b-table striped hover :items="provider" :fields="fields">
      <template slot="[menu]" slot-scope="data">
        <nuxt-link :to="'/admin/forms/' + data.item.id">Open</nuxt-link>
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
          key: 'title'
        },
        {
          key: 'created'
        },
        {
          key: 'live'
        },
        {
          key: 'responses'
        },
        {
          key: 'menu'
        }
      ]
    }
  },
  methods: {
    provider(ctx) {
      return this.$axios.$get('/api/forms')
    }
  }
}
</script>
