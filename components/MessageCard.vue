<template>
    <div class="message-card d-none d-lg-flex flex-row justify-content-between align-items-center mb-4">
        {{message}} <nuxt-link :to="to">{{buttonText}}</nuxt-link>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: '',
        },
        buttonText: {
            type: String,
            default: '',
        },
        to: {
            type: String,
            default: '',
        }
    }
}
</script>

<style>
.message-card {
  position: relative;
  font-weight: 900;
  color: #fff;
  padding: 17px 35px;
  background-color: var(--dark-brown);
  border-radius: 20px;
}

.message-card a {
  padding: 8px 32px;
  background-color: #fff;
  border-radius: 50px;
}
</style>
