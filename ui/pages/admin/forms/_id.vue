<template>
  <div>Form: {{ form }}</div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      form: null
    }
  },
  created() {
    this.load()
  },
  methods: {
    async load() {
      this.form = await this.$axios.$get(`/api/forms/${this.$route.params.id}`)
    }
  }
}
</script>
