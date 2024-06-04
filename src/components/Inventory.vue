<template>
  <div class="inventory-container">
    <h3>Inventario</h3>
    <ul class="inventory-list">
      <InventoryItem
        v-for="item in items"
        :key="item.name"
        :name="item.name"
        :image="item.image"
        :quantity="item.quantity"
      />
    </ul>
  </div>
</template>

<script>
import InventoryItem from './InventoryItem.vue';

export default {
  name: 'Inventory',
  components: {
    InventoryItem
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.inventory-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.inventory-list {
  list-style: none;
  padding: 0;
}
</style>
