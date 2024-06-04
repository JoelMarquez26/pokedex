<template>
  <li class="inventory-item">
    <img :src="`/images/${image}`" :alt="name" class="inventory-image">
    <div class="inventory-info">
      <span class="inventory-name">{{ name }}</span>
      <span class="inventory-quantity">Cantidad: {{ quantity }}</span>
    </div>
  </li>
</template>

<script>
export default {
  name: 'InventoryItem',
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
.inventory-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.inventory-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.inventory-info {
  display: flex;
  flex-direction: column;
}

.inventory-name {
  font-weight: bold;
}

.inventory-quantity {
  color: #555;
}
</style>
