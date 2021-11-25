<template>
    <a-card title="用户管理" :key="update">
        <std-table
            :api="api"
            :columns="columns"
            data_key="users"
            @clickEdit="id => {
          $router.push('/user/'+id)
       }"
            @selected="onSelect"
            ref="table"
        />
        <footer-tool-bar v-show="selected.length">
            <a-space>
                当前已选中{{ selected.length }}条数据，支持跨页选择
                <a-button v-show="selected.length"
                          @click="selected=[];update++">清空选中
                </a-button>
                <a-button type="primary"
                          v-show="selected.length"
                          @click="visible=true" ghost>批量修改
                </a-button>
            </a-space>
        </footer-tool-bar>
        <a-modal
            :mask="false"
            title="批量修改"
            :visible="visible"
            cancel-text="取消"
            ok-text="保存"
            @cancel="visible=false"
            @ok="ok"
        >
            留空则不修改
            <std-data-entry :data-list="batchColumns(columns)" :data-source="data"/>
        </a-modal>
    </a-card>
</template>

<script>
import StdTable from '@/components/StdDataDisplay/StdTable'
import user_columns from './user_colums'
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'
import StdDataEntry from '@/components/StdDataEntry/StdDataEntry'

export default {
    name: 'UserList',
    components: {
        StdDataEntry,
        FooterToolBar,
        StdTable
    },
    data() {
        return {
            api: this.$api.admin.user,
            columns: user_columns,
            selected: [],
            visible: false,
            data: {},
            update: 0,
        }
    },
    methods: {
        onSelect(keys) {
            this.selected = keys
        },
        batchColumns(columns) {
            return columns.filter((column) => {
                return column.batch
                    && column.edit && column.edit.type !== 'upload'
                    && column.edit.type !== 'transfer'
            })
        },
        ok() {
            this.$api.user.batchSave(this.selected, this.$refs.table.params, this.data)
                .then(() => {
                    this.$message.success('批量修改成功')
                    this.$refs.table.get_list()
                }).catch(e => {
                this.$message.error(e.message)
            })
        }
    }
}
</script>

<style scoped>

</style>
