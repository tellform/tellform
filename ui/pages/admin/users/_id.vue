<template>
  <div>User: {{ user }}</div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      user: null
    }
  },
  created() {
    this.load()
  },
  methods: {
    async load() {
      this.user = await this.$axios.$get(`/api/users/${this.$route.params.id}`)
    }
  }
}
</script>
