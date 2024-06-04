<template>
    <nav class="sidebar">
      <button @click="closeSidebar" class="close-btn">x</button>
      <h4>Mi Equipo</h4>
      <ul class="team-list">
        <li v-for="pokemon in team" :key="pokemon.id" class="team-member">
          <img :src="pokemon.imageUrl" :alt="pokemon.name" class="team-member-image">
          <span>{{ pokemon.name }}</span>
          <button @click="removeFromTeam(pokemon)" class="btn btn-danger btn-sm">x</button>
        </li>
        <hr>
        <li v-if="team.length < 6" class="team-incomplete">
          Equipo Incompleto ({{ team.length }}/6)
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'TeamSidebar',
    props: {
      team: {
        type: Array,
        required: true
      }
    },
    methods: {
      removeFromTeam(pokemon) {
        this.$emit('remove-from-team', pokemon);
      },
      closeSidebar() {
        this.$emit('close-sidebar');
      }
    }
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    padding: 10px;
    background-color: #d0d7e9;
    border-right: 1px solid #ddd;
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000; /* Asegúrate de que la barra lateral tenga un z-index alto */
    transition: transform 0.3s ease;
  }
  
  .close-btn {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  .team-list {
    list-style-type: none;
    padding: 0;
    margin-top: 40px;
  }
  
  .team-member {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }
  
  .team-member-image {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  
  .team-incomplete {
    color: red;
    font-weight: bold;
    margin-top: 10px;
  }
  </style>
  