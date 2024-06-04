<template>
  <div id="pokedex">
    <Pokedex />
  </div>
</template>

<script>
import Pokedex from './components/Pokedex.vue';

export default {
  name: 'App',
  components: {
    Pokedex
  }
}
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50; 
}
</style>
