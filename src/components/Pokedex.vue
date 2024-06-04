<template>
  <div class="app-container">
    <div class="title">
      <h1>POKEDEX</h1>
    </div>
        
    <button @click="openInventoryModal" class="inventory-btn">
      <img src="/images/mochila.png" alt="Inventario" class="inventory-icon">
    </button>

    <Modal v-if="showInventoryModal" @close="closeInventoryModal">
      <Inventory :items="inventory" />
    </Modal>

    <button @click="openShopModal" class="shop-btn">
      <img src="/images/store.svg" alt="Tienda" class="shop-icon">
    </button>
    
    <Modal v-if="showShopModal" @close="closeShopModal">
      <Shop :inventory="inventory" @update-inventory="updateInventory" />
    </Modal>

    <button @click="toggleSidebar" class="open-sidebar-btn">
      <img src="/images/equipo.svg" alt="Inventario" class="inventory-icon">
    </button>
    <TeamSidebar v-if="sidebarVisible" :team="team" @remove-from-team="removeFromTeam" @close-sidebar="toggleSidebar" />
    <button @click="toggleFavoriteFilter" class="favorite-filter-btn">
      <font-awesome-icon :icon="[showFavoritesOnly ? 'fas' : 'far', 'heart']" />
    </button>
    <TypeFilter v-if="!showFavoritesOnly" @filterByType="applyTypeFilter" />
    <RangeSlider @updateRange="updateRange" />
 
    <div class="container-fluid" id="pokemon-list">
      <div v-if="filteredPokemonList.length === 0" class="no-favorites-message">
        <p>No tienes Pokémon favoritos.</p>
      </div>
      <div v-else v-for="pokemon in filteredPokemonList" :key="pokemon.id" :class="['pokemon-card', { 'favorite': pokemon.isFavorite, 'in-team': isInTeam(pokemon) }]">
        <img :src="pokemon.imageUrl" :alt="pokemon.name" class="pokemon-image">
        <div class="pokemon-info">
          <h4 class="card-title">{{ pokemon.name.toUpperCase() }}</h4>
          <p class="card-text">NÚMERO: {{ pokemon.id }}</p>
          <p class="card-text">TIPOS: {{ pokemon.types.join(', ') }}</p>
          <button @click="toggleFavorite(pokemon)" class="btn btn-link">
            <font-awesome-icon :icon="[pokemon.isFavorite ? 'fas' : 'far', 'heart']" />
          </button>
        </div>
        <button @click="addToTeam(pokemon)" class="btn btn-primary btn-sm" :disabled="isInTeam(pokemon) || team.length >= 6">
          {{ isInTeam(pokemon) ? 'En Equipo' : 'Añadir al Equipo' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TeamSidebar from '../components/TeamSidebar.vue';
import TypeFilter from '../components/TypeFilter.vue';
import RangeSlider from '../components/RangeSlider.vue';
import Inventory from '../components/Inventory.vue';
import Modal from '../components/Modal.vue';
import Shop from './Shop.vue';

export default {
  name: 'Pokedex',
  components: {
    TeamSidebar,
    TypeFilter,
    RangeSlider,
    Modal,
    Inventory,
    Shop
  },
  data() {
    return {
      pokemonList: [],
      team: [],
      sidebarVisible: false,
      showFavoritesOnly: false,
      selectedTypes: [],
      range: { min: 1, max: 150 },
      showInventoryModal: false,
      showShopModal: false,
      inventory: [
        { name: 'Pokéball', image: 'pokeball.png', quantity: 0 },
        { name: 'Superball', image: 'superball.png', quantity: 0 },
        { name: 'Ultraball', image: 'ultraball.png', quantity: 0 },
        { name: 'Poción', image: 'potion.png', quantity: 0 },
        { name: 'Superpoción', image: 'super-potion.png', quantity: 0 },
        { name: 'Elixir', image: 'elixir.png', quantity: 0 }
      ]
    };
  },
  created() {
    this.fetchPokemonList();
  },
  computed: {
    filteredPokemonList() {
      let list = this.pokemonList;
      if (this.showFavoritesOnly) {
        list = list.filter(pokemon => pokemon.isFavorite);
      }
      if (this.selectedTypes.length > 0) {
        list = list.filter(pokemon =>
          this.selectedTypes.some(type => pokemon.types.includes(type.toUpperCase()))
        );
      }
      list = list.filter(pokemon => pokemon.id >= this.range.min && pokemon.id <= this.range.max);
      return list;
    }
  },
  methods: {
    openInventoryModal() {
      this.showInventoryModal = true;
    },
    closeInventoryModal() {
      this.showInventoryModal = false;
    },
    openShopModal() {
      this.showShopModal = true;
    },
    closeShopModal() {
      this.showShopModal = false;
    },
    updateInventory(purchase) {
      // Actualizacion de inventario 
      const existingItemIndex = this.inventory.findIndex(item => item.name === purchase.name);
      if (existingItemIndex !== -1) {
        this.inventory[existingItemIndex].quantity += purchase.quantity;
      } else {
        this.inventory.push({ name: purchase.name, quantity: purchase.quantity });
      }
    },
    async fetchPokemonList() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const results = response.data.results;
        const pokemonDataList = await Promise.all(results.map(async (pokemon) => {
          const pokemonData = await this.fetchPokemonData(pokemon.url);
          return {
            id: pokemonData.id,
            name: pokemonData.name.toUpperCase(),
            imageUrl: pokemonData.sprites.front_default,
            types: pokemonData.types.map(type => type.type.name.toUpperCase()),
            isFavorite: false
          };
        }));
        this.pokemonList = pokemonDataList;
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    },
    async fetchPokemonData(url) {
      const response = await axios.get(url);
      return response.data;
    },
    toggleFavorite(pokemon) {
      pokemon.isFavorite = !pokemon.isFavorite;
    },
    addToTeam(pokemon) {
      if (!this.isInTeam(pokemon) && this.team.length < 6) {
        this.team.push(pokemon);
      }
    },
    removeFromTeam(pokemon) {
      this.team = this.team.filter(p => p.id !== pokemon.id);
    },
    isInTeam(pokemon) {
      return this.team.some(p => p.id === pokemon.id);
    },
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    toggleFavoriteFilter() {
      this.showFavoritesOnly = !this.showFavoritesOnly;
    },
    applyTypeFilter(selectedTypes) {
      this.selectedTypes = selectedTypes;
    },
    updateRange(range) {
      this.range = range;
    }
  }
}
</script>

  
<style >

.title{
  margin-top: 1rem;
}
.title h1{
  font-weight: 800;
}
#pokemon-list {
  display: grid;
  position: relative;
  grid-template-columns: repeat(6, 1fr);
  gap: 4rem;
  padding: 3rem;
  margin-top: 1rem;
}

.pokemon-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #000dfc;
  border-radius: 10px;
  background-image: linear-gradient(to right, #eea2a270 0%, #bbc1bf6d 19%, #57c5e169 42%, #b49fda74 79%, #7ac5d8a5 100%);
  transition: transform 0.2s;
  z-index: 1;
}

.pokemon-card:hover {
  transform: scale(1.05);
}

.pokemon-image {
  width: 120px;
  height: 120px;
}

.pokemon-info {
  text-align: center;
  margin-top: 10px;
}

.pokemon-name {
  font-size: 1.2em;
  margin-bottom: 5px;
}

.pokemon-number,
.pokemon-types {
  margin-bottom: 5px;
}

.btn.btn-link {
  color: #ff0000; 
  font-size: 1.5rem; 
  position: relative;
}
.btn.btn-link:hover {
  color: #b20202; 
}

.open-sidebar-btn {
  position: fixed;
  top: 20px;
  left: 10px;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 700;
  transition: transform 0.2s;
}
.open-sidebar-btn:hover{
  color: #365EAB;
  transform: scale(1.3);
}
.in-team {
  border: 2px solid gold;
}
.btn-primary.btn-sm {
  position: relative;
  margin-top: 10px;
  background-color: #365EAB;
  border: #365EAB;
}

.btn-primary.btn-sm:hover {
  border: 2px solid #f05000
}

.favorite-filter-btn {
  position: fixed;
  top: 20px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #ff0000;
  transition: transform 0.2s;
}
.favorite-filter-btn:hover{
  transform: scale(1.3);
}

.no-favorites-message {
  position: relative;
  padding: 5px;
  width: 100%;
  border-radius: 10px;
  position: absolute;
  border: 5px outset gold;
  font-size: 2rem;
  margin-bottom: 10px;

}

.inventory-btn {
  position: fixed;
  top: 70px;
  right: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 999;
}

.inventory-icon {
  width: 30px;
  height: 30px;
  transition: transform 0.2s;
}
.inventory-icon:hover{
  transform: scale(1.3);
}

.shop-btn {
  position: fixed;
  top: 200px;
  right: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 999;
}


.shop-icon {
  width: 28px;
  height: 28px;
  transition: transform 0.2s;
}

.shop-icon:hover{
  transform: scale(1.3);
}
</style>
  