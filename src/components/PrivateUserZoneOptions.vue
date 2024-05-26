<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { logout, getToken, getUserData } from '@/stores/auth'

const router = useRouter()
const isLoggedIn = !!getToken()

const storedEmail = localStorage.getItem('email')
const userData = ref()

const handleLogout = () => {
  logout()
  router.push('/')
}

const buyCrypto = () => {
  router.push('/')
}

onMounted(async () => {
    try {
        if (storedEmail) {
            userData.value = await getUserData(storedEmail)
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario: ', error)
    }
})
</script>

<template>
    <div class="d-flex justify-center userTitle">
        <h2 v-if="userData">¡Hola, {{ userData.name }}!</h2>
    </div>
    <div class="btn-container">
      <v-dialog max-width="300">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="primary"
            text="Ingresar dinero"
            variant="flat"
            class="userOptions"
          ></v-btn>
          <v-btn 
          class="userOptions" 
          color="primary" 
          @click="buyCrypto"
          text="Comprar criptomoneda"
          ></v-btn>
          <v-btn 
            color="red" 
            @click="handleLogout" 
            v-if="isLoggedIn"
            text="Cerrar sesión"
            class="userOptions"
            ></v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-card-title>
                <div class="title-popup">Ingresar dinero
                <v-btn class="close-btn" size="small" icon @click="isActive.value = false">
                  <v-icon color="grey lighten-1">mdi-close</v-icon>
                </v-btn>
              </div>
            </v-card-title>                      
            <v-card-text>
              <v-text-field
                v-model="amount"
                label="EUROS"
                type="number"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="buy-btn"
                @click="makeDeposit"
              >
                Comprar
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
</template>

<style scoped>
    .userTitle {
      padding: 50px;
    }

    .userOptions {
      margin: 0 20px;
    }

    .btn-container {
      display: flex;
      justify-content: center;
    }

    .buy-btn {
      display: flex;
      margin-left: auto;
      margin-right: auto;
      color: #52a7f7;
      font-weight: bold;
      border: 1px solid #52a7f7;
    }

    .close-btn {
      border: none;
    }
    
    .title-popup {
      display: flex;
      align-items: center;
      margin-left: 10px;
      margin-top: 15px;
    }

    .title-popup .v-btn {
      margin-left: 70px
    }
</style>
