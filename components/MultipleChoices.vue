<template>
    <div class="choices container text-center px-0">
        <button v-for="(choice, index) in choices" :key="index" class="button d-inline-block mx-1 mx-md-2" @click="$emit('select-choices', choice)">{{ choice }}</button>
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