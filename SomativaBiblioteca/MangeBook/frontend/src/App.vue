<template>
  <div id="app">

    <router-view></router-view> <!-- This is where routed components will be displayed -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
/* Optional styling */
#app {
  text-align: center;
}
</style>
