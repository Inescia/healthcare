<template>
  <div>
    <header class="d-flex align-center ga-4 my-2">
      <img alt="Logo image" height="100" src="../assets/logo.png" />
      <h1 class="">HealthCare</h1>
    </header>

    <main class="d-flex flex-column flex-md-row ma-8 ga-8">
      <!-- PATIENT LIST -->
      <section class="flex-1-1-0 d-flex flex-column col-6">
        <v-autocomplete
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          :label="$t('FIELDS.search.LABEL')"
          bg-color="transparent"
          clearable
          flat
        />
        <PatientCard v-for="patient in filteredPatientList" :key="patient.id" :data="patient" />
      </section>
      <!-- GRAPH -->
      <section class="flex-1-1-0">
        <GraphCard v-if="selectedPatientId" :data="selectedPatient" />
        <p v-else class="ma-8 text-center">{{ $t('TITLES.SELECT_PATIENT') }}</p>
      </section>
    </main>
  </div>
</template>

<script>
import GraphCard from '@/components/GraphCard.vue';
import PatientCard from '@/components/PatientCard.vue';
import { useDashboard } from '@/stores/dashboard';

export default {
  name: 'HomePage',
  components: { GraphCard, PatientCard },
  data() {
    return {
      searchInput: '',
      selectedPatientId: null,
      store: useDashboard(),
    };
  },

  computed: {
    filteredPatientList() {
      return this.searchInput
        ? this.store.getFilteredPatientList(this.searchInput)
        : this.store.patientList;
    },
    selectedPatient() {
      return this.selectedPatientId ? this.store.getPatientById(this.selectedPatientId) : null;
    },
  },

  created() {
    this.store.fetchPatientList();
  },

  methods: {},
};
</script>
