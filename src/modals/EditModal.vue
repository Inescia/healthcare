<template>
  <v-dialog max-width="500">
    <v-card>
      <v-card-title>{{ $t('TITLES.EDIT_PATIENT') }}</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isValid">
          <!-- @TODO: factorize with a v-for -->
          <v-text-field
            v-model="localItem.firstName"
            :label="$t('FIELDS.firstName.LABEL')"
            :rules="[(v) => !!v || $t('RULES.REQUIRED')]"
            bg-color="transparent"
            flat
            required
          />
          <v-text-field
            v-model="localItem.lastName"
            :label="$t('FIELDS.lastName.LABEL')"
            :rules="[(v) => !!v || $t('RULES.REQUIRED')]"
            bg-color="transparent"
            flat
            required
          />
          <v-text-field
            v-model="localItem.medicalRecordNumber"
            :label="$t('FIELDS.medicalRecordNumber.LABEL')"
            :rules="[(v) => !!v || $t('RULES.REQUIRED')]"
            bg-color="transparent"
            flat
            required
          />
          <v-text-field
            v-model="localItem.age"
            :label="$t('FIELDS.age.LABEL')"
            :rules="[
              (v) => !!v || $t('RULES.REQUIRED'),
              (v) => (v && !isNaN(parseFloat(v))) || $t('RULES.NUMBER'),
            ]"
            bg-color="transparent"
            flat
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="$emit('close')">{{ $t('BUTTONS.CANCEL') }}</v-btn>
        <v-spacer />
        <v-btn @click="update">{{ $t('BUTTONS.VALIDATE') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useDashboard } from '@/stores/dashboard.js';

export default {
  name: 'EditModal',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isValid: false,
      localItem: {},
      store: useDashboard(),
    };
  },

  mounted() {
    console.log(this.item);
    this.localItem = { ...this.item };
  },

  methods: {
    update() {
      if (!this.isValid) return;
      this.store.updatePatientData(this.item.id, this.localItem);
      this.$emit('close');
    },
  },
};
</script>
