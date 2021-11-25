<template>
    <div class="footer center">
        Copyright © 2020 - {{ thisYear }} 深圳技术大学
    </div>
</template>

<script>
export default {
    name: 'FooterComponent',
    data() {
        return {
            thisYear: new Date().getFullYear()
        }
    }
}
</script>

<style scoped>
.footer {

}
</style>
