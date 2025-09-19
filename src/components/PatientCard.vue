<template>
  <v-card
    class="my-3 px-4 py-3 cursor-pointer"
    elevation="3"
    @click="$emit('selectPatient', data.id)"
  >
    <div class="d-flex flex-column ga-4">
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex ga-4 align-center">
          <span
            ><b>{{ data.firstName }} {{ data.lastName }} </b> - {{ data.medicalRecordNumber }} -
            {{ data.age }} {{ $t('FIELDS.age.UNIT') }}</span
          >
          <img
            alt="edit icon"
            height="15"
            src="../assets/icons/edit.png"
            @click="$emit('editPatient', data.id)"
          />
        </div>
        <span :class="`text-${getStatusColor} text-bold`">{{ $t(`STATUS.${getStatus}`) }}</span>
      </div>
      <div class="d-flex justify-space-around">
        <!-- @TODO: factorize with a v-for -->
        <div class="d-flex align-center mr-2 ga-1">
          <img alt="heartRate icon" height="40" src="../assets/icons/heartRate.png" />
          <span>{{ data.vitals.heartRate[0] }}</span>
          <span>{{ $t(`FIELDS.vitals.heartRate.UNIT`) }}</span>
        </div>
        <div class="d-flex align-center mr-2 ga-1">
          <img alt="bloodPressure icon" height="35" src="../assets/icons/bloodPressure.png" />
          <span>{{ Object.values(data.vitals.bloodPressure[0]).join('/') }}</span>
          <span>{{ $t(`FIELDS.vitals.bloodPressure.UNIT`) }}</span>
        </div>
        <div class="d-flex align-center mr-2 ga-1">
          <img alt="temperature icon" height="35" src="../assets/icons/temperature.png" />
          <span>{{ data.vitals.temperature[0] }}</span>
          <span>{{ $t(`FIELDS.vitals.temperature.UNIT`) }}</span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import { useDashboard } from '@/stores/dashboard';

export default {
  name: 'PatientCard',
  props: {
    data: { type: Object, required: true },
  },
  data() {
    return {
      store: useDashboard(),
    };
  },

  computed: {
    getStatus() {
      return this.store.getPatientStatus(this.data);
    },
    getStatusColor() {
      switch (this.getStatus) {
        case 'critical':
          return 'red';
        case 'instable':
          return 'orange';
        default:
          return 'green';
      }
    },
  },
};
</script>
