<template>
    <a-card>
        <a-statistic
            :title="title"
            :value="value"
        />
    </a-card>
</template>

<script>
export default {
    name: 'ChartCard',
    props: ['title', 'value']
}
</script>

<style scoped>

</style>
