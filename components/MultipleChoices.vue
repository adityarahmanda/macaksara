<template>
    <div>
        <button v-for="choice in choices" :key="choice" class="btn mx-2" @click="$emit('select-choices', choice)">
            {{ choice }}
        </button>
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