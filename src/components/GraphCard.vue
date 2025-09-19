<template>
  <v-card class="pa-4 mt-4" elevation="3">
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex ga-4 align-center">
        <span
          ><b>{{ data.firstName }} {{ data.lastName }} </b> - {{ data.medicalRecordNumber }} -
          {{ data.age }} {{ $t('FIELDS.age.UNIT') }}</span
        >
      </div>
      <span :class="`text-${getStatusColor} text-bold`">{{ $t(`STATUS.${getStatus}`) }}</span>
    </div>
    <div style="height: 300px">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </v-card>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js';
import { Line } from 'vue-chartjs';
import { getPatientStatus, getValue } from '@/utils.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

export default {
  name: 'GraphCard',
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Line },
  props: {
    data: { type: Object, required: false, default: null },
  },

  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    };
  },

  computed: {
    chartData() {
      return {
        labels: ['00h', '06h', '12h', '18h', '24h'],
        datasets: [
          {
            label: this.$t('FIELDS.vitals.heartRate.LABEL'),
            data: this.data.vitals.heartRate,
            borderColor: 'rgb(66, 135, 245)',
            backgroundColor: 'rgba(66, 135, 245, 0.3)',
            tension: 0.4,
            fill: true,
          },
          {
            label: this.$t('FIELDS.vitals.temperature.LABEL'),
            data: this.data.vitals.temperature,
            borderColor: 'rgb(245, 99, 132)',
            backgroundColor: 'rgba(245, 99, 132, 0.3)',
            tension: 0.4,
            fill: true,
          },
          {
            label: this.$t('FIELDS.vitals.bloodPressure.LABEL') + ' (Systolic)',
            data: this.data.vitals.bloodPressure.map((bp) => bp.systolic),
            borderColor: 'rgb(102, 245, 176)',
            backgroundColor: 'rgba(102, 245, 176, 0.3)',
            tension: 0.4,
            fill: true,
          },
          {
            label: this.$t('FIELDS.vitals.bloodPressure.LABEL') + ' (Diastolic)',
            data: this.data.vitals.bloodPressure.map((bp) => bp.diastolic),
            borderColor: 'rgb(245, 184, 66)',
            backgroundColor: 'rgba(245, 184, 66, 0.3)',
            tension: 0.4,
            fill: true,
          },
          {
            label: this.$t('FIELDS.vitals.oxygenSaturation.LABEL'),
            data: this.data.vitals.oxygenSaturation,
            borderColor: 'rgb(178, 102, 245)',
            backgroundColor: 'rgba(178, 102, 245, 0.3)',
            tension: 0.4,
            fill: true,
          },
        ],
      };
    },

    getStatus() {
      return getPatientStatus(
        this.data.age,
        getValue(this.data.vitals.heartRate),
        getValue(this.data.vitals.bloodPressure),
        getValue(this.data.vitals.temperature),
      );
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

  methods: {
    getValue,
  },
};
</script>
