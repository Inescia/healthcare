<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="bg-white px-6 pt-2 pb-4 rounded-2xl shadow-lg w-[600px]">
      <div class="flex justify-between items-center mb-2">
        <div class="flex items-center gap-2">
          <img :src="formatImgUrl(category)" :alt="category" class="w-6 h-6" />
          <h3 class="ml-0">{{ categories[category] }}</h3>
        </div>
        <button @click="$emit('close')" class="text-black text-3xl cursor-pointer">&times;</button>
      </div>

      <div class="space-y-2">
        <div class="flex gap-4 mb-2">
          <input
            v-model="localItem.name"
            type="text"
            placeholder="Nom*"
            class="w-3/4 p-2 border rounded-md"
            required
          />
          <input
            v-model="localItem.price"
            placeholder="Prix*"
            class="w-1/4 p-2 border rounded-md"
          />
        </div>
        <textarea
          v-model="localItem.description"
          placeholder="Description"
          class="w-full p-2 border rounded-md h-24"
        />

        <div v-if="category === 'pizza'" class="flex gap-4 text-sm">
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="localItem.isVegetarian" />
            <p class="my-0">Végétarienne</p>
          </label>
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="localItem.isMeat" />
            <p class="my-0">Viande</p>
          </label>
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="localItem.isFish" />
            <p class="my-0">Poisson</p>
          </label>
        </div>
        <div class="flex gap-4 text-sm">
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="localItem.isHidden" />
            <p class="my-0">Caché</p>
          </label>
          <label v-if="category === 'pizza'" class="flex items-center space-x-2">
            <input type="checkbox" v-model="localItem.isFavorite" />
            <p class="my-0">A la une</p>
          </label>
        </div>

        <p v-if="!isValid" class="text-red">Veuillez remplir correctement les champs</p>
        <div class="flex justify-between items-center mt-6">
          <AppButton
            v-if="item"
            label="Supprimer"
            color="red"
            class="py-2 px-8 ml-0"
            @click="deleteItem"
          />
          <AppButton
            v-if="item"
            :is-loading="isLoading"
            label="Valider"
            class="py-2 px-8 mr-0"
            @click="validateItem"
          />
          <AppButton
            v-else
            :is-loading="isLoading"
            label="Ajouter"
            class="py-2 px-8 mr-0 ml-auto"
            @click="validateItem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '../components/AppButton.vue';
import { useMenu } from '@/stores/dashboard.js';

export default {
  name: 'EditModal',
  components: { AppButton },
  props: {
    category: {
      type: String,
      required: false,
    },
    item: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      categories: { pizza: 'Pizza', drink: 'Boisson', dessert: 'Dessert' },
      isLoading: false,
      localItem: {
        name: '',
        price: '',
        description: '',
        isVegetarian: false,
        isMeat: false,
        isFish: false,
        isFavorite: false,
        isHidden: false,
      },
      store: useMenu(),
    };
  },

  computed: {
    isValid() {
      return this.localItem.name.trim().length && parseFloat(this.localItem.price);
    },
  },

  mounted() {
    if (this.item) this.localItem = { ...this.localItem, ...this.item };
  },

  methods: {
    formatImgUrl(name) {
      return new URL(`../assets/icons/${name}.png`, import.meta.url).href;
    },

    async addItem() {
      this.isLoading = true;
      await this.store.addItem(this.category, this.localItem);
      this.$emit('close');
      this.isLoading = false;
    },

    async deleteItem() {
      this.isLoading = true;
      await this.store.deleteItem(this.category, this.item);
      this.$emit('close');
      this.isLoading = false;
    },

    async updateItem() {
      this.isLoading = true;
      await this.store.deleteItem(this.category, this.item);
      await this.store.addItem(this.category, this.localItem);
      this.$emit('close');
      this.isLoading = false;
    },

    validateItem() {
      if (this.isValid) {
        this.localItem.price = parseFloat(this.localItem.price);
        this.item ? this.updateItem() : this.addItem();
      }
    },
  },
};
</script>
