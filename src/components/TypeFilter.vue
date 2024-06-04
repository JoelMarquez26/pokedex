<template>
    <div class="tipo-filtrar">
        <ul class="type-list">
          <li v-for="type in filteredTypes" :key="type.name">
            <input class="form-check-input"  type="checkbox" :id="type.name" :value="type.name" v-model="selectedTypes" @change="emitSelectedTypes">
            <label class="form-check-label" :for="type.name">{{ type.name }}</label>
          </li>
        </ul>
      </div>
      
  </template>
  
  <script>
  export default {
    name: 'TypeFilter',
    data() {
      return {
        searchType: '',
        selectedTypes: [],
        types: []
      };
    },
    computed: {
      filteredTypes() {
        return this.types.filter(type => type.name.toLowerCase().includes(this.searchType.toLowerCase()));
      }
    },
    mounted() {
      this.fetchTypes();
    },
    methods: {
      async fetchTypes() {
        try {
          const response = await fetch('https://pokeapi.co/api/v2/type');
          const data = await response.json();
          this.types = data.results;
        } catch (error) {
          console.error('Error fetching types:', error);
        }
      },
      emitSelectedTypes() {
        this.$emit('filterByType', this.selectedTypes);
      }
    }
  };
  </script>
  
  <style scoped>

  .tipo-filtrar{
    padding: 10px;
  }
  .type-list {
    margin-top: 3rem;
  }
  
  .type-list li {
    display: inline-flex;
    margin-right: 15px;
  }
  .type-list li input {
    cursor: pointer;
    margin-right: 5px;
  }
  </style>
  