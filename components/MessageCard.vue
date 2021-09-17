<template>
    <div class="d-none d-lg-flex justify-content-between align-items-center px-4 py-3 mb-4" style="background-color: var(--dark-brown); border-radius: 9999px;">
        <span style="color: #ffffff; font-weight: 900">{{ message }}</span>
        <a :href="to" class="px-4 py-2" style="background-color: #ffffff; border-radius: 9999px;">
            {{buttonText}}
        </a>
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