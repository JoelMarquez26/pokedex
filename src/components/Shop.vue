<template>
  <div class="shop-container">
    <h3>Tienda</h3>
    <ul class="shop-list">
      <ShopItem
        v-for="item in items"
        :key="item.name"
        :name="item.name"
        :image="item.image"
        :maxQuantity="item.maxQuantity"
        @buy-item="buyItem"
      />
    </ul>
  </div>
</template>

<script>
import ShopItem from './ShopItem.vue';

export default {
  name: 'Shop',
  components: {
    ShopItem
  },
  props: {
    inventory: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      items: [
        { name: 'Pokéball', image: 'pokeball.png', maxQuantity: 15 },
        { name: 'Superball', image: 'superball.png', maxQuantity: 15 },
        { name: 'Ultraball', image: 'ultraball.png', maxQuantity: 15 },
        { name: 'Poción', image: 'potion.png', maxQuantity: 5 },
        { name: 'Superpoción', image: 'super-potion.png', maxQuantity: 5 },
        { name: 'Elixir', image: 'elixir.png', maxQuantity: 5 }
      ]
    };
  },
  methods: {
    buyItem(purchase) {
      this.$emit('update-inventory', purchase);
    }
  }
};
</script>

  
  
  <style >
h3{
  font-weight: 700;
}
  </style>
  