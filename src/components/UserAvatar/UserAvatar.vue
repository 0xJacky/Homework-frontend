<template>
    <span class="avatar">
         <a-avatar :size="size" :src="server + '/' + url" v-if="url"/>
        <a-avatar :size="size" icon="user" v-else/>
    </span>
</template>

<script>
export default {
    name: 'UserAvatar',
    data() {
        return {
            server: process.env['VUE_APP_API_UPLOAD_ROOT'],
        }
    },
    props: {
        size: {
            type: Number,
            default: 32
        }
    },
    computed: {
        url: {
            get() {
                return this.$store.state.user.info.avatar
            }
        }
    }
}
</script>

<style lang="less" scoped>
.avatar {
    margin-right: 10px;
}
</style>
