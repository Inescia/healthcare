import { defineStore } from 'pinia';

export const useDashboard = defineStore('dashboard', {
  state: () => ({
    patientList: [],
  }),

  getters: {
    getFilteredPatientList: (state) => (input) => {
      return state.patientList.filter((item) =>
        (item.firstName + ' ' + item.lastName + ' ' + item.medicalRecordNumber)
          .toLowerCase()
          .includes(input.toLowerCase()),
      );
    },
    getPatientById: (state) => (id) => {
      return state.patientList.find((item) => item.id === id);
    },
    // @TODO: move this logic to a utils file (and improve it)
    getPatientStatus: () => (patient) => {
      var count = 0;
      const { heartRate, bloodPressure, temperature } = patient.vitals;

      // Heart rate
      if (patient.age < 18 && (heartRate < 80 || heartRate > 120)) count++;
      else if (patient.age < 65 && (heartRate < 60 || heartRate > 80)) count++;
      else if (patient.age >= 65 && (heartRate < 70 || heartRate > 90)) count++;

      // Blood pressure
      if (
        patient.age < 18 &&
        (bloodPressure.systolic < 120 ||
          bloodPressure.systolic > 140 ||
          bloodPressure.diastolic < 60 ||
          bloodPressure.diastolic > 80)
      )
        count++;
      else if (
        patient.age >= 18 &&
        (bloodPressure.systolic < 150 ||
          bloodPressure.systolic > 170 ||
          bloodPressure.diastolic != 90)
      )
        count++;

      // Temperature
      if (temperature < 36.3 || temperature > 37.5) count++;
      if (temperature < 29 || temperature > 42.6) count++;

      return count == 0 ? 'stable' : count == 1 ? 'instable' : 'critical';
    },
  },

  actions: {
    fetchPatientList() {
      // Simulate fetching data from an API
      this.patientList = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          age: 14,
          medicalRecordNumber: 'MR123456',
          vitals: {
            heartRate: [190, 75, 72, 78, 77],
            temperature: [46.5, 37.7, 37.0, 36.2, 34.1],
            bloodPressure: [
              { systolic: 120, diastolic: 80 },
              { systolic: 122, diastolic: 82 },
              { systolic: 118, diastolic: 78 },
            ],
            oxygenSaturation: [98, 97, 99, 96, 97],
          },
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          age: 60,
          medicalRecordNumber: 'MR654321',
          vitals: {
            heartRate: [65, 70, 68, 72, 69],
            temperature: [36.8, 36.9, 37.0, 44.9, 36.7],
            bloodPressure: [
              { systolic: 130, diastolic: 85 },
              { systolic: 160, diastolic: 84 },
              { systolic: 132, diastolic: 86 },
            ],
            oxygenSaturation: [97, 96, 95, 97, 98],
          },
        },
        {
          id: 3,
          firstName: 'Alice',
          lastName: 'Brown',
          age: 70,
          medicalRecordNumber: 'MR789012',
          vitals: {
            heartRate: [85, 88, 90, 87, 86],
            temperature: [37.5, 37.6, 37.8, 37.7, 37.6],
            bloodPressure: [
              { systolic: 140, diastolic: 90 },
              { systolic: 138, diastolic: 88 },
              { systolic: 142, diastolic: 92 },
            ],
            oxygenSaturation: [95, 94, 96, 93, 94],
          },
        },
      ];
    },

    updatePatientData(id, newData) {
      const index = this.patientList.findIndex((patient) => patient.id === id);
      if (index !== -1) {
        this.patientList[index] = newData;
      } else {
        console.error(`Patient not found. (id: ${id})`);
      }
    },
  },
});
