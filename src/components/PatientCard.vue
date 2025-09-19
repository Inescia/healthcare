<template>
  <v-card class="mx-auto my-8" elevation="4">
    <div class="d-flex flex-column">
      <div></div>
      <div class="d-flex">
        <div v-for="value in vitalList" :key="value"></div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'PatientCard',
  props: {
    data: { type: Object, required: true },
  },
  data() {
    return {
      vitalList: ['heartRate', 'bloodPressure', 'temperature', 'oxygenSaturation'],
    };
  },
  methods: {},
};
</script>
