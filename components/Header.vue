<template>
    <header id="header" class="navbar navbar-expand-lg mb-4">
        <input id="navbar-toggle" v-model="show" class="d-none" type="checkbox">
        <div class="navbar-brand brand"><nuxt-link to="/">Sinahu Aksara</nuxt-link></div>
        <nav :class="show ? 'collapse navbar-collapse justify-content-end' : 'collapse navbar-collapse justify-content-end show'">
            <ul class="navbar-nav">
                <li class="menu-item px-2"><nuxt-link class="nav-link" to="/aksara-jawa">Aksara Jawa</nuxt-link></li>
                <li class="menu-item px-2"><nuxt-link class="nav-link" to="/konverter-aksara">Konverter</nuxt-link></li>
            </ul>
        </nav>
        <label id="navbar-toggler" aria-label="Toggle navigation" class="p-1 d-lg-none" for="navbar-toggle">
            <fa icon="bars"/>
        </label>
      </header>
</template>

<script>
export default {
    data() {
      return {
        show: {
            type: Boolean,
            default: false
          }
      }; 
    }
}
</script>

<style>
#header {
  height: 100px;
  padding: 0;
}

#navbar-toggler {
  font-size: 24px;
}

.brand {
  text-transform: lowercase;
  font-size: 28px;
  font-weight: 900;
}
</style>