<template>
  <div id="app">
    <main-app></main-app>
  </div>
</template>

<script>
import MainApp from "./views/MainApp";
export default {
  name: "App",
  components: {
    MainApp
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css');
:root {
  --blue: #0275d8;
  --dark: #212121;
  --light: #f5f5f5;
  --gray: #e5e5e5;
  --white: #ffffff;
  --font: 'Roboto', sans-serif;
  --transit: 0.2s;
}
.container {
  width: 800px;
  max-width: 92%;
  margin: 0 auto;
  &-fluid {
    width: 92%;
    max-width: 92%;
    margin: 0 auto;
  }
}
#app {
  font-family: var(--font);
  color: var(--dark);
  background-color: var(--white);
  min-height: 100vh;
  a {font-family: var(--font);}
}
</style>
