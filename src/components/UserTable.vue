<script setup lang="ts">
    import { useUsersStore } from '@/stores/users'
    import { getToken } from '@/stores/auth'

    const store = useUsersStore()
    const token = getToken()
    if (token) {
      store.GetAllUsers(token) 
    }

    const deleteUser = async (userId: number) => {
    const success = await store.DeleteUser(userId, token)
    if (success) {
      console.log('Usuario eliminado con éxito')
      store.GetAllUsers(token)
    } else {
      console.error('Error al eliminar el usuario')
    }
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
          v-for="user, index in store.users"
          :key="user.id"
          :class="{ 'background-gray': index % 2 === 1 }"
        >
          <td>{{ user.name }}</td>
          <td>{{ user.birthdate }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.dni }}</td>
          <td>{{ user.nationality }}</td>
          <td>{{ user.cash }} €</td>
          <td>{{ user.wallet }} €</td>
          <td>{{ user.role }}</td>
          <td>
            <v-btn @click="deleteUser(user.id)">Eliminar</v-btn></td>
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
      width: 85%;
      text-align: center;
  }

  .v-table > .v-table__wrapper > table > tbody > tr > th, 
  .v-table > .v-table__wrapper > table > thead > tr > th {
      text-align: center !important;
  }

  .v-btn {
      display: flex;
      margin-left: auto;
      margin-right: auto;
      color: #ff0000;
      font-weight: bold;
      border: 1px solid #ff0000;
  }

  .background-gray {
    background-color: #ddd
  }
</style>
