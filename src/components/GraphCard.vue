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
      chartData: {
        labels: ['00h', '06h', '12h', '18h', '24h'],
        datasets: [
          {
            label: 'Mesures',
            data: [120, 135, 128, 140, 132], // tes 5 valeurs
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.3)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Mesures',
            data: [120, 135, 128, 140, 132], // tes 5 valeurs
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.3)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Mesures',
            data: [120, 135, 128, 140, 132], // tes 5 valeurs
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.3)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Mesures',
            data: [10, 135, 12, 140, 132], // tes 5 valeurs
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 12, 0.3)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Mesures',
            data: [120, 135, 128, 140, 132], // tes 5 valeurs
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.3)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
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

  methods: {},
};
</script>
