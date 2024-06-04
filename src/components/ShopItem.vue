<template>
  <div class="shop-item">
    <img :src="`/images/${image}`" :alt="name" class="shop-image">
    <div class="shop-info">
      <span class="shop-name">{{ name }}</span>
      <div class="quantity-selector">
        <button @click="decrementQuantity">-</button>
        <span>{{ quantity }}</span>
        <button @click="incrementQuantity">+</button>
      </div>
     
    </div>
    <button @click="buyItem" class="buy-button">Comprar</button>
  </div>
</template>

<script>
export default {
  name: 'ShopItem',
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    maxQuantity: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      quantity: 0
    };
  },
  methods: {
    incrementQuantity() {
      if (this.quantity < this.maxQuantity) {
        this.quantity += 1;
      }
    },
    decrementQuantity() {
      if (this.quantity > 0) {
        this.quantity -= 1;
      }
    },
    buyItem() {
      if (this.quantity > 0) {
        this.$emit('buy-item', { name: this.name, quantity: this.quantity });
        this.quantity = 0;
      }
    }
  }
};
</script>

<style scoped>
.shop-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.shop-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.shop-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 800;
  margin: 10px;
}

.quantity-selector {
  display: flex;
  align-items: center;
}

.shop-name{
  font-weight: 700;
}

.quantity-selector button {
  background: transparent;
  border: none;
  padding: 5px;
  cursor: pointer;
  margin: 0px 5px 0px 5px;
  font-weight: 500;
}
.quantity-selector button:hover{
  font-weight: 600;
}

.buy-button {
  margin-top: 5px;
  margin-left: 50px;
  background: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.buy-button:hover{
  background: #3f8d42;
  font-weight: 600;
}

.quantity-selector span{
  font-weight: 600;
}
</style>
