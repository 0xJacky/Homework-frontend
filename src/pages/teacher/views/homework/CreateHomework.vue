<template>
    <a-card title="创建作业">
        <std-data-entry :data-list="columns" :data-source="data" />
        <footer-tool-bar>
            <a-button type="primary">创建</a-button>
        </footer-tool-bar>
    </a-card>
</template>

<script>
import columns from '@/pages/teacher/views/homework/homework_columns'
import StdDataEntry from '@/components/StdDataEntry/StdDataEntry'
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'
export default {
    name: 'CreateHomework',
    components: {FooterToolBar, StdDataEntry},
    data() {
        return {
            data: {},
            columns,
        }
    }
}
</script>

<style scoped>

</style>
