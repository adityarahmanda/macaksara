<template>
    <header id="header" class="row navbar navbar-expand-md py-4 mb-4">
        <input id="navbar-toggler" type="checkbox" class="d-none" />
        <div class="navbar-brand"><a href="/">Sinahu Aksara</a></div>
        <label for="navbar-toggler" class="d-md-none" style="font-size: 24px;" data-toggle="collapse" data-target="nav-collapse" aria-controls="nav-collapse" aria-expanded="false" aria-label="Toggle navigation">
            <fa icon="bars"/>
        </label>
        <nav class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
                <li class="menu-item px-3 pr-md-0 pl-md-4"><a class="nav-link" href="/aksara-jawa">Aksara Jawa</a></li>
                <li class="menu-item px-3 pr-md-0 pl-md-4"><a class="nav-link" href="/konverter-aksara">Konverter</a></li>
            </ul>
        </nav>
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
#navbar-toggler:checked ~ .collapse {
    display:block;
}

.navbar-brand {
    text-transform: lowercase;
    font-size: 28px;
}

@media (max-width: 768px) {
    .navbar-nav {
        position: absolute;
        right: 0;
        background-color: #ffffff;
        z-index: 9999;
    }

    .navbar-nav .menu-item {
        font-size: 16px;
        text-align: right;
    }
}
</style>