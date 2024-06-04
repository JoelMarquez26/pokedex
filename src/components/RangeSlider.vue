<template>
    <div>
      <label for="range-slider">Filtrar por rango de número:</label>
      <div>
        <input type="range" id="min-number" v-model="minNumber" :min="1" :max="151" @input="emitRange">
        <span>{{ minNumber }}</span>
        <input type="range" id="max-number" v-model="maxNumber" :min="1" :max="151" @input="emitRange">
        <span>{{ maxNumber }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RangeSlider',
    data() {
      return {
        minNumber: 1,
        maxNumber: 151
      };
    },
    methods: {
      emitRange() {
        this.$emit('updateRange', { min: this.minNumber, max: this.maxNumber });
      }
    }
  };
  </script>
  
  <style scoped>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input[type="range"] {
    margin: 0 10px;
  }
  span {
    margin: 5px 5px;
    font-weight: bold;
  }
  </style>
  