<template>
    <div>
        <button v-for="(choice, i) in choices" ref="choices" :key="i" class="btn mx-2" @click="$emit('select-choices', $refs.choices[i], choice)">
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
                return ['ha', 'na', 'ca', 'ra']
            }
        }
    }
}
</script>