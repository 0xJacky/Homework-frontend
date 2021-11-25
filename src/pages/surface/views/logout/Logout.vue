<template>
    <div></div>
</template>

<script>
export default {
    name: 'Logout',
    beforeCreate() {
        this.$api.authorization.logout().finally(() => {
            this.$router.push('/login')
        })
    }
}
</script>

<style scoped>

</style>
