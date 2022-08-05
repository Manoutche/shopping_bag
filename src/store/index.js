import { createStore } from 'vuex'
import  axios from "axios";

export default createStore({
  state: {
    products: [], 
    productsInBag : []
  },
  mutations: {
    loaddProducts(state,products){
      state.products = products
    },

    loadBag(state,products){
      state.productsInBag = products
    },

    addToBag(state,product){
      state.productsInBag.push(product)
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag))
    },
    removeFromBag(state,productId){
      var updatedBag = state.productsInBag.filter(item => productId != item.id)
      state.productsInBag = updatedBag;
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag))
    }
  },
  actions: {
    loaddProducts({ commit }){
      axios
      .get('https://fakestoreapi.com/products')
      .then(response =>{
        commit('loaddProducts',response.data)
      });
    },
    loadBag({ commit }){
      
      if (localStorage.getItem('productsInBag')) {
        
        commit('loadBag', JSON.parse(localStorage.getItem('productsInBag')) )
      }
      
    },

    addToBag ({commit},product){
      commit('addToBag',product);
    },
    removeFromBag ({commit},productId){
      if (confirm('Are you sure, you want to remove the item form bag ?')) {
        
        commit('removeFromBag',productId);
      }
    },

  },
  modules: {
  }
})
