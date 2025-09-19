<template>
  <div class="flex flex-col min-h-screen">
    <HomePage />
    <AppLanguage />
  </div>
</template>

<script>
import AppLanguage from './components/AppLanguage.vue';
import HomePage from './pages/HomePage.vue';

export default {
  name: 'App',
  components: { AppLanguage, HomePage },
};
</script>
