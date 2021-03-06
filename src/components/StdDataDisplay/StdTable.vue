<template>
    <div class="std-table">
        <std-data-entry
            v-if="!disable_search"
            :data-list="searchColumns"
            v-model="params"
            layout="inline"
        >
            <div slot="action">
                <a-form-item :wrapper-col="{span:8}">
                    <a-button type="primary" @click="doSearch">查询
                    </a-button>
                </a-form-item>
                <a-form-item :wrapper-col="{span:8}">
                    <a-button @click="reset_search">重置</a-button>
                </a-form-item>
            </div>
        </std-data-entry>
        <div v-if="soft_delete" style="text-align: right">
            <a v-if="params['trashed']" href="javascript:;"
               @click="params['trashed']=false; get_list()">返回</a>
            <a v-else href="javascript:;" @click="params['trashed']=true; get_list()">回收站</a>
        </div>
        <a-table
            :columns="pithyColumns"
            :customRow="row"
            :data-source="data_source"
            :loading="loading"
            :pagination="false"
            :row-key="'id'"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange,
            onSelect: onSelect, type: selectionType,}"
            @change="stdChange"
            :scroll="{ x: scrollX }"
        >
            <template
                v-for="c in pithyColumns"
                :slot="c.scopedSlots.customRender"
                slot-scope="text, record"
            >
                <div v-if="c.badge" :key="c.dataIndex">
                    <a-badge v-if="text === true || text > 0" status="success"/>
                    <a-badge v-else status="error"/>
                    {{ c.mask ? c.mask[text] : text }}
                </div>
                <span v-else-if="c.datetime"
                      :key="c.dataIndex">{{ text ? moment(text).format('yyyy-MM-DD HH:mm:ss') : '无' }}</span>
                <span v-else-if="c.date" :key="c.dataIndex">{{ text ? moment(text).format('yyyy-MM-DD') : '无' }}</span>
                <div v-else-if="c.click" :key="c.dataIndex">
                    <a href="javascript:;"
                       @click="handleClick(
                           record[c.click.index?c.click.index:c.dataIndex],
                           c.click.index?c.click.index:c.dataIndex,
                           c.click.method, c.click.path)">
                        {{ text != null ? text : c.default }}
                    </a>
                </div>
                <span v-else :key="c.dataIndex">{{ text != null ? (c.mask ? c.mask[text] : text) : c.default }}</span>
            </template>
            <div class="std_action" v-if="!pithy" slot="action" slot-scope="text, record">
                <a v-if="editable" @click="$emit('clickEdit', record.id, record)">
                    <template v-if="edit_text">{{ edit_text }}</template>
                    <template v-else>编辑</template>
                </a>
                <slot name="actions" :record="record"/>
                <template v-if="deletable">
                    <a-divider type="vertical"/>
                    <a-popconfirm
                        v-if="soft_delete&&params.trashed"
                        cancelText="再想想"
                        okText="是的" title="你确定要反删除?"
                        @confirm="restore(record.id)">
                        <a href="javascript:;">反删除</a>
                    </a-popconfirm>
                    <a-popconfirm
                        v-else
                        cancelText="再想想"
                        okText="是的" title="你确定要删除?"
                        @confirm="destroy(record.id)"
                    >
                        <a href="javascript:;">删除</a>
                    </a-popconfirm>
                </template>
            </div>
        </a-table>
        <std-pagination :pagination="pagination" @changePage="get_list"/>
    </div>
</template>

<script>
import StdPagination from './StdPagination'
import moment from 'moment'
import StdDataEntry from '@/components/StdDataEntry/StdDataEntry'

export default {
    name: 'StdTable',
    components: {
        StdDataEntry,
        StdPagination,
    },
    props: {
        columns: Array,
        api: Object,
        data_key: String,
        selectionType: {
            type: String,
            default: 'checkbox',
            validator: function (value) {
                return ['checkbox', 'radio'].indexOf(value) !== -1
            }
        },
        pithy: {
            type: Boolean,
            default: false
        },
        disable_search: {
            type: Boolean,
            default: false
        },
        soft_delete: {
            type: Boolean,
            default: false
        },
        edit_text: String,
        deletable: {
            type: Boolean,
            default: true
        },
        editable: {
            type: Boolean,
            default: true
        },
        get_params: {
            type: Object,
            default() {
                return {}
            }
        },
        disable_query_params: {
            type: Boolean,
            default: false
        },
        scrollX: {
            type: [Number, Boolean],
            default: true
        }
    },
    data() {
        return {
            moment,
            data_source: [],
            loading: true,
            pagination: {
                total: 1,
                per_page: 10,
                current_page: 1,
                total_pages: 1
            },
            params: {
                ...this.get_params
            },
            selectedRowKeys: [],
            rowSelection: {},
            searchColumns: this.get_searchColumns(),
            pithyColumns: this.get_pithyColumns(),
        }
    },
    watch: {
        '$route'() {
            this.get_list()
        }
    },
    created() {
        if (!this.disable_query_params) {
            this.params = Object.assign(this.params, this.$route.query)
        }
        this.$nextTick(() => {
            this.get_list()
        })
    },
    methods: {
        get_list(page_num = null) {
            this.loading = true
            if (page_num) {
                this.params['page'] = page_num
            }
            this.api.get_list(this.params).then(response => {
                if (response[this.data_key] === undefined && response.data !== undefined) {
                    this.data_source = response.data
                } else {
                    this.data_source = response[this.data_key]
                }
                if (response.pagination !== undefined) {
                    this.pagination = response.pagination
                }
                this.loading = false
            }).catch(e => {
                console.log(e)
                this.$message.error('系统错误')
            })
        },
        stdChange(pagination, filters, sorter) {
            if (sorter) {
                this.params['order_by'] = sorter.field
                this.params['sort'] = sorter.order === 'ascend' ? 'asc' : 'desc'
                this.$nextTick(() => {
                    this.get_list()
                })
            }
        },
        destroy(id) {
            this.api.destroy(id).then(() => {
                this.get_list()
                this.$message.success('删除 ID: ' + id + ' 成功')
            }).catch(e => {
                console.log(e)
                if (e.message) {
                    this.$message.error('错误 ' + e.message)
                } else {
                    this.$message.error('系统错误')
                }
            })
        },
        restore(id) {
            this.api.restore(id).then(() => {
                this.get_list()
                this.$message.success('反删除 ID: ' + id + ' 成功')
            }).catch(e => {
                console.log(e)
                if (e.message) {
                    this.$message.error('错误' + e.message)
                } else {
                    this.$message.error('系统错误')
                }
            })
        },
        get_searchColumns() {
            let searchColumns = []
            this.columns.forEach(column => {
                if (column.search) {
                    if (column.edit && column.edit.type !== 'upload'
                        && column.edit.type !== 'transfer') {
                        const tmp = Object.assign({}, column)
                        tmp.edit = Object.assign({}, column.edit)
                        if (typeof column.search === 'string') {
                            tmp.edit.type = column.search
                        } else if (typeof column.search === 'object') {
                            tmp.edit = column.search
                        }
                        searchColumns.push(tmp)
                    }
                    // search 覆盖 edit
                    if (!column.edit) {
                        const tmp = Object.assign({}, column)
                        tmp.edit = Object.assign({}, column.edit)
                        if (typeof column.search === 'object') {
                            tmp.edit = column.search
                        }
                        searchColumns.push(tmp)
                    }
                }
            })
            return searchColumns
        },
        get_pithyColumns() {
            if (this.pithy) {
                return this.columns.filter((c, index, columns) => {
                    let display = c.pithy === true && c.display !== false
                    columns[index]['scopedSlots'] = {}
                    if (c.customRender) {
                        columns[index]['scopedSlots']['customRender'] = c.customRender
                    } else {
                        columns[index]['scopedSlots']['customRender'] =
                            c.dataIndex !== 'title' ? c.dataIndex : '_' + c.dataIndex
                    }
                    return display
                })
            }
            return this.columns.filter((c, index, columns) => {
                let display = c.display !== false
                columns[index]['scopedSlots'] = {}
                columns[index]['scopedSlots']['customRender'] =
                    c.dataIndex !== 'title' ? c.dataIndex : '_' + c.dataIndex
                return display
            })
        },
        checked(c) {
            this.params[c.target.value] = c.target.checked
        },
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys
            this.$emit('selected', selectedRowKeys)
        },
        onSelect(record) {
            this.$emit('selectedRecord', record)
        },
        handleClick(data, index, method = '', path = '') {
            if (method === 'router') {
                this.$router.push(path + '/' + data).then()
            } else {
                this.params[index] = data
                this.get_list()
            }
        },
        row(record) {
            return {
                on: {
                    click: () => {
                        this.$emit('clickRow', record.id)
                    }
                }
            }
        },
        reset_search() {
            // 不加载 query params
            this.params = {
                ...this.get_params,
            }
            this.$nextTick(() => {
                if (this.disable_query_params) {
                    this.get_list()
                } else {
                    // 加载 query params
                    this.$router.push({query: {}}).catch(() => {
                    })
                }

            })
        },
        doSearch() {
            // 不加载 query params
            if (this.disable_query_params) {
                this.get_list()
            } else {
                // 加载 query params
                this.$router.push({
                    query: Object.assign({}, this.params),
                }).catch(() => {
                    this.get_list()
                })
            }
        }
    }
}
</script>

<style lang="less">
.ant-table-scroll {
    .ant-table-body {
        overflow-x: auto !important;
    }
}
</style>

<style lang="less" scoped>
.ant-form {
    margin: 10px 0 20px 0;
}

.ant-slider {
    min-width: 90px;
}

.std-table {
    .ant-table-wrapper {
        // overflow-x: scroll;
    }
}
</style>
