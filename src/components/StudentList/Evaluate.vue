<template>
    <a-modal
        v-if="record"
        v-model="visible"
        :mask="false"
        :title="record ? record.name + '的评价' : '评价列表'"
        okText="新建评价"
        @ok="handleOk">
        <p>姓名：{{ record.name }}</p>
        <p>学号：{{ record.school_id }}</p>

        <a-list :data-source="comments">
            <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta>
                    <p slot="title">{{ item.content }}</p>
                    <template slot="description">
                        <p>评价人：{{ item.from.name }}</p>
                        <p>评价时间： {{ moment(item.updated_at).format('yyyy-MM-DD HH:mm:ss') }}
                            <a @click="edit_id=item.id;edit_value=item.content"
                               v-if="item.from.id===$store.state.user.info.id">编辑</a>
                        </p>
                        <div v-if="edit_id===item.id">
                            <a-textarea v-model="edit_value"/>
                            <div class="save-btn">
                                <a-button type="primary" @click="save" ghost>
                                    保存
                                </a-button>
                            </div>
                        </div>
                    </template>
                </a-list-item-meta>
            </a-list-item>
        </a-list>
        <std-pagination :pagination="pagination" @changePage="get_list"/>

        <p>新增评价：</p>
        <a-textarea v-model="value"/>
    </a-modal>
</template>

<script>
import moment from 'moment'
import StdPagination from '@/components/StdDataDisplay/StdPagination'

export default {
    name: 'Evaluate',
    components: {
        StdPagination
    },
    props: {
        evaluate_api: Object
    },
    data() {
        return {
            visible: false,
            student_id: null,
            record: null,
            value: '',
            comments: [],
            pagination: {},
            moment,
            id: null,
            edit_id: null,
            edit_value: '',
        }
    },
    methods: {
        get_list(page = 1) {
            this.evaluate_api.get_list(this.student_id, {page}).then(r => {
                this.comments = r.data ?? []
                this.pagination = r.pagination
            })
        },
        async show(id, record) {
            this.student_id = await id
            this.record = await record
            if (this.record) {
                this.get_list()
            }
            this.visible = true
        },
        async handleOk() {
            if (this.value) {
                const data = {
                    to_id: this.student_id,
                    content: this.value
                }
                this.evaluate_api.add(this.student_id, data).then(() => {
                    this.get_list()
                    this.value = ''
                })
            } else {
                this.$message.info('您未填写评价内容')
            }
        },
        save() {
            if (!this.edit_value) {
                this.$message.info('评价内容不能为空')
                return
            }
            const data = {
                to_id: this.student_id,
                content: this.edit_value
            }
            this.evaluate_api.edit(this.student_id, this.edit_id, data).then(() => {
                this.get_list()
                this.edit_id = null
                this.edit_value = ''
                this.$message.success('编辑成功')
            })
        }
    }
}
</script>

<style lang="less" scoped>
.save-btn {
    float: right;
    margin: 10px 0;
}

</style>
