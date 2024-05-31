<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { login, Register, getUserData } from '@/stores/auth'
import { useI18n } from 'vue-i18n'

const emailLogin = ref('')
const passwordLogin = ref('')
const errorMessageLogin = ref('')
const errorMessageRegister = ref('')

const name = ref('')
const birthdate = ref<Date>(new Date())
const email = ref('')
const password = ref('')
const phone = ref('')
const dni = ref('')
const nationality = ref('')

const router = useRouter()
const activeTab = ref(0)

const { t } = useI18n()

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
        errorMessageLogin.value = ''
        const loggedIn = await login(emailLogin.value, passwordLogin.value)
        if (loggedIn) {
            const userData = await getUserData(emailLogin.value)
            router.push({ name: userData.role === 'admin' ? 'home' :'privateZoneUser', params: { id: userData.id } })
        } else {
            errorMessageLogin.value = 'Error. Las credenciales son incorrectas'
        }
    } catch (error) {
        console.error('Se ha producido un error al iniciar sesión: ', error)
        throw error
    }
}

const handleRegister = async () => {
    try {
        errorMessageRegister.value = ''
        const registered = await Register('ggggg', new Date('2001-01-01'), 'a@gmail.comm', 'stringst', '234', 'string', 'string')
        //const registered = await Register(name.value, new Date('2001-01-01'), email.value, password.value, phone.value, dni.value, nationality.value)
        console.log(name.value);
        console.log(birthdate.value);
        console.log(email.value);
        console.log(password.value);
        console.log(phone.value);
        console.log(dni.value);
        console.log(nationality.value);
        if (registered) {
            await login('a@gmail.comm', 'stringst')
            const userData = await getUserData('a@gmail.comm')
            //await login(email.value, password.value)
            //const userData = await getUserData(email.value)
            router.push({ name: 'privateZoneUser', params: { id: userData.id } })
        } else {
            errorMessageRegister.value = 'Error. Alguno de los parámetros es incorrecto o el email introducido ya se encuentra registrado.'
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
        <v-tab :text="t('IniciarSesion')"></v-tab>
        <v-tab :text="t('Registrarse')"></v-tab>
    </v-tabs>

    <v-sheet class="mx-auto" width="400" v-show="activeTab === 0">
        <v-form fast-fail @submit.prevent="handleLogin">
        <v-text-field
            v-model="emailLogin"
            :label="t('Email')"
            required
        ></v-text-field>

        <v-text-field
            v-model="passwordLogin"
            :label="t('Contraseña')"
            type="password"
            required
        ></v-text-field>

        <v-btn class="mt-2 btn-login" type="submit" block>{{ t('IniciarSesion') }}</v-btn>
        <v-alert v-if="errorMessageLogin" type="error" class="mt-2">{{ errorMessageLogin }}</v-alert>
        </v-form>
    </v-sheet>

    <v-sheet class="mx-auto" width="400" v-show="activeTab === 1">
        <v-form fast-fail @submit.prevent="handleRegister">
        <v-text-field
            v-model="name"
            :label="t('Nombre')"
            required
        ></v-text-field>

        <v-text-field
            v-model="birthdate"
            :label="t('FechaNacimiento')"
            required
        ></v-text-field>

        <v-text-field
            v-model="email"
            :label="t('Email')"
            required
        ></v-text-field>

        <v-text-field
            v-model="password"
            :label="t('Contraseña')"
            type="password"
            required
        ></v-text-field>

        <v-text-field
            v-model="phone"
            :label="t('Telefono')"
            type="number"
            required
        ></v-text-field>

        <v-text-field
            v-model="dni"
            :label="t('DNI')"
            required
        ></v-text-field>

        <v-text-field
            v-model="nationality"
            :label="t('Nacionalidad')"
            required
        ></v-text-field>

        <v-btn class="mt-2 btn-login" type="submit" block>{{ t('Registrarse') }}</v-btn>
        <v-alert v-if="errorMessageRegister" type="error" class="mt-2">{{ errorMessageRegister }}</v-alert>
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

    .v-alert {
        margin-bottom: 30px;
    }
</style>
