<template>
    <div>
        <button v-for="(choice, i) in choices" :key="i" class="btn mx-2" @click="$emit('select-choices', choice)">
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