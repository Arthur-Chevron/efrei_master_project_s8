<template>
  <div id="app">
    <router-view
      @in-loading="inLoading"
      @error="showError"
      @on-boarding="showOnBoarding"
    />

    <Error
      :open="error.open"
      :msg="error.msg"
    />

    <OnBoarding
      :open="onBoarding.open"
      @error="showError"
      @on-boarding="showOnBoarding"
    />
  </div>
</template>

<script>

export default {
  name: 'App',

  components: {
    Error: () => import('./components/Error'),
    OnBoarding: () => import('./components/OnBoarding')
  },

  data: () => ({
    loading: false,
    error: {
      open: false,
      msg: ''
    },

    onBoarding: {
      open: false
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
    },

    showOnBoarding(value) {
      this.onBoarding.open = value
    }
  }
}
</script>

<style>

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
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
    --blue: #0049be;
    --red-google: #d93025;
    --green: #2F6C60;
    --border: rgba(29,28,29,.3);
  }

  .hover:hover {
    cursor: pointer;
  }

  .canala-deck {
    font-family: "Canela Deck";
  }

</style>
