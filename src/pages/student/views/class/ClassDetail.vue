<template>
    <a-card title="数据库周四下午5-8节">
        <std-table
            :columns="columns"
            :api="api"
            :deletable="false"
            edit_text="提交"
            @clickEdit="id => $router.push('/homework/'+id)"
        />

        <footer-tool-bar>
            <a-space>
                <a-button @click="$router.go(-1)">返回</a-button>
            </a-space>
        </footer-tool-bar>
    </a-card>
</template>

<script>
import columns from './homework_list_columns'
import StdTable from '@/components/StdDataDisplay/StdTable'
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'

export default {
    name: 'ClassDetail',
    components: {FooterToolBar, StdTable},
    data() {
        return {
            columns,
            api: this.$api.student_api.homework
        }
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>

</style>
