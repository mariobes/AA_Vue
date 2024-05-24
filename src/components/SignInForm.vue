<script setup lang="ts">

</script>

<template>
    <v-sheet class="mx-auto" width="400">
      <v-card-title class="text-center"><h3>Inicio de sesión</h3></v-card-title>
      <v-form fast-fail @submit.prevent>
        <v-text-field
          v-model="email"
          label="Correo electrónico"
          required
        ></v-text-field>
  
        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
          required
        ></v-text-field>
  
        <v-btn class="mt-2" type="submit" block>Iniciar Sesión</v-btn>
      </v-form>
    </v-sheet>
</template>

<style scoped>
    .v-card-title {
        padding: 100px 0 30px 0
    }

    .v-btn {
        background-color: #52a7f7;
    }
</style>
