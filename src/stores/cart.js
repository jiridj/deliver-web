import { defineStore } from 'pinia';

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    orderLines: JSON.parse(localStorage.getItem('deliver_cart')) || [],
  }),
  actions: {
    addLine(product, quantity) {
      const index = this.orderLines.findIndex((line) => line.product.number == product.number);
      
      if (index >= 0) 
        this.orderLines[index].quantity += quantity;
      else 
        this.orderLines.push({ product, quantity });

      localStorage.setItem('deliver_cart', JSON.stringify(this.orderLines));
    },
    removeLine(index) {
      this.orderLines.splice(index, 1);
      localStorage.setItem('deliver_cart', JSON.stringify(this.orderLines));
    },
    updateLocalStorage() {
      localStorage.setItem('deliver_cart', JSON.stringify(this.orderLines));
    },
    emptyCart() {
      this.orderLines = [];
      localStorage.removeItem('deliver_cart');
    }
  },
  getters: {
    numLines: (state) => {
      return state.orderLines.length;
    },
  }
});