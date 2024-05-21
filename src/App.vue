<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <div>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/signIn">Sign In</RouterLink>
        <RouterLink to="/cryptoDetails">Crypto Details</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
