<template>
  <v-btn class="position-absolute" icon elevation="0" style="top: 12px; right: 12px">
    <img
      v-if="$i18n.locale == 'en'"
      alt="English flag"
      height="40"
      src="../assets/icons/en.png"
      width="40"
      @click="toggleLangage($i18n.locale)"
    />
    <img
      v-else
      alt="Drapeau francais"
      height="40"
      src="../assets/icons/fr.png"
      width="40"
      @click="toggleLangage($i18n.locale)"
    />
  </v-btn>
</template>

<script>
export default {
  name: 'AppLanguage',
  methods: {
    /**
     * @method to change the current language
     */
    toggleLangage(targetLanguage) {
      console.log(targetLanguage);
      this.$i18n.locale = targetLanguage === 'en' ? 'fr' : 'en';
    },
  },
};
</script>
