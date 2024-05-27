<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { login, Register, getUserData } from '@/stores/auth'

const emailLogin = ref('')
const passwordLogin = ref('')
const errorMessage = ref('')

const name = ref('')
const birthdate = ref<Date>(new Date());
const email = ref('')
const password = ref('')
const phone = ref<number>()
const dni = ref('')
const nationality = ref('')

const router = useRouter()
const activeTab = ref(0)

onMounted(() => {
    const storedEmail = localStorage.getItem('email')
    const storedPassword = localStorage.getItem('password')
    if (storedEmail && storedPassword) {
        emailLogin.value = storedEmail
        passwordLogin.value = storedPassword
    }
})

const handleLogin = async () => {
    try {
        errorMessage.value = ''
        const loggedIn = await login(emailLogin.value, passwordLogin.value)
        if (loggedIn) {
            const userData = await getUserData(emailLogin.value)
            router.push({ name: userData.role === 'admin' ? 'home' :'privateZoneUser', params: { id: userData.id } })
        } else {
            errorMessage.value = 'Error. Las credenciales son incorrectas'
        }
    } catch (error) {
        console.error('Se ha producido un error al iniciar sesión: ', error)
        throw error
    }
}

const handleRegister = async () => {
    try {
        if (!birthdate.value) {
            console.error('Fecha de nacimiento no válida')
            return
        }

        const registered = await Register(name.value, birthdate.value, email.value, password.value, phone.value, dni.value, nationality.value)
        console.log(name.value);
        console.log(birthdate.value);
        console.log(email.value);
        console.log(password.value);
        console.log(phone.value);
        console.log(dni.value);
        console.log(nationality.value);
        if (registered) {
            await login(email.value, password.value)
            const userData = await getUserData(emailLogin.value)
            router.push({ name: 'privateZoneUser', params: { id: userData.id } })
        }
    } catch (error) {
        console.error('Se ha producido un error al registrar el usuario: ', error)
        throw error
    }
}
</script>

<template>

    <v-tabs
        v-model="activeTab"
        fixed-tabs
        class="tab"
        >
        <v-tab text="Iniciar sesión"></v-tab>

        <v-tab text="Registrarse"></v-tab>
    </v-tabs>

    <v-sheet class="mx-auto" width="400" v-show="activeTab === 0">
        <v-form fast-fail @submit.prevent="handleLogin">
        <v-text-field
            v-model="emailLogin"
            label="Correo electrónico"
            required
        ></v-text-field>

        <v-text-field
            v-model="passwordLogin"
            label="Contraseña"
            type="password"
            required
        ></v-text-field>

        <v-btn class="mt-2 btn-login" type="submit" block>Iniciar Sesión</v-btn>
        <v-alert v-if="errorMessage" type="error" class="mt-2">{{ errorMessage }}</v-alert>
        </v-form>
    </v-sheet>

    <v-sheet class="mx-auto" width="400" v-show="activeTab === 1">
        <v-form fast-fail @submit.prevent="handleRegister">
        <v-text-field
            v-model="name"
            label="Nombre"
            required
        ></v-text-field>

        <v-text-field
            v-model="birthdate"
            label="Fecha de nacimiento"
            required
        ></v-text-field>

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

        <v-text-field
            v-model="phone"
            label="Teléfono"
            type="number"
            required
        ></v-text-field>

        <v-text-field
            v-model="dni"
            label="DNI"
            required
        ></v-text-field>

        <v-text-field
            v-model="nationality"
            label="Nacionalidad"
            required
        ></v-text-field>

        <v-btn class="mt-2 btn-login" type="submit" block>Registrarse</v-btn>
        </v-form>
    </v-sheet>
</template>

<style scoped>
    .btn-login {
        background-color: #52a7f7;
        margin-bottom: 50px
    }

    .tab {
        margin: 60px 0;
        background-color: white;
    }
</style>
