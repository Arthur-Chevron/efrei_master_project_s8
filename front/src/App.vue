<template>
  <div id="app">
    <router-view
      @in-loading="inLoading"
      @error="showError"
    />

    <Error
      :open="error.open"
      :msg="error.msg"
    />
  </div>
</template>

<script>

export default {
  name: 'App',

  components: {
    Error: () => import('./components/Error')
  },

  data: () => ({
    loading: false,
    error: {
      open: false,
      msg: ''
    }
  }),

  methods: {
    // when we load data from api
    inLoading(value) {
      this.loading = value
    },

    showError(value) {
      this.error.msg = value
      this.error.open = true
      console.log(this.error)
      setTimeout(() => {this.error.open = false}, 3000)
    }
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    padding: 0;
  }

  :root {
    --black: #1D1D1D;
    --grey: #D1D1D1;
    --grey-dark: #6e6e6e;
    --light-grey: rgba(242,245,245,0.8);
    --blue-google: #1a73e8;
    --red-google: #d93025;
  }

  .hover:hover {
    cursor: pointer;
  }

</style>
