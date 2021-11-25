<template>
    <p v-if="url">
        附件：
        <a-button @click="download">下载</a-button>
    </p>
</template>

<script>
export default {
    name: 'FormatDownload',
    props: ['url', 'name'],
    data() {
        return {}
    },
    methods: {
        download() {

        }
    }
}
</script>

<style lang="less" scoped>

</style>
