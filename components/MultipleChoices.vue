<template>
    <div class="choices container text-center px-0">
        <button v-for="(choice, index) in choices" :key="index" class="button d-inline-block ml-4" @click="$emit('select-choices', choice)">{{ choice }}</button>
    </div>
</template>

<script>
export default {
    props: {
        choices: {
            type: Array,
            default() {
                return ['ha', 'na', 'ca', 'ra', 'ka']
            }
        }
    }
}
</script>

<style>
.choices .button {
    padding: 4px 16px;
    border-radius: 10px;
}

.choices .button:first-child {
    margin-left: 0 !important;
}
</style>