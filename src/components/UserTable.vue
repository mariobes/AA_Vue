<script setup lang="ts">
    import { useUsersStore } from '@/stores/users'
    import { getToken } from '@/stores/auth'

    const store = useUsersStore()
    const token = getToken()
    if (token) {
      store.GetAllUsers(token) 
    }
</script>

<template>
  <div class="table-container">
    <v-table>
      <thead>
        <tr>
          <th>
            <h2>Nombre</h2>
          </th>
          <th>
            <h2>Fecha de nacimiento</h2>
          </th>
          <th>
            <h2>Email</h2>
          </th>
          <th>
            <h2>Teléfono</h2>
          </th>
          <th>
            <h2>DNI</h2>
          </th>
          <th>
            <h2>Nacionalidad</h2>
          </th>
          <th>
            <h2>Efectivo</h2>
          </th>
          <th>
            <h2>Cartera</h2>
          </th>
          <th>
            <h2>Rol</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in store.users"
          :key="user.id"
        >
          <td>{{ user.name }}</td>
          <td>{{ user.birthdate }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.dni }}</td>
          <td>{{ user.nationality }}</td>
          <td>{{ user.cash }}</td>
          <td>{{ user.wallet }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  </template>

<style scoped>
  .table-container {
      display: flex;
      justify-content: center;
      margin-top: 60px;
  }

  .v-table {
      width: 80%;
      text-align: center;
  }

  .v-table > .v-table__wrapper > table > tbody > tr > th, 
  .v-table > .v-table__wrapper > table > thead > tr > th {
      text-align: center !important;
  }
</style>
