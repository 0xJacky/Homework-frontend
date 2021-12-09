<template>
    <a-card title="导入学生">
        <p>请先下载模板，填入数据，点击选择文件按钮选择要上传的 Excel，
            再点击解析文件，系统将会验证您的表单是否合法，验证通过后可点击导入。</p>
        <p>用户初始密码与登录名相同</p>
        <a-upload :before-upload="beforeUpload" :file-list="fileList">
            <a-button>
                <a-icon type="upload"/>
                选择文件
            </a-button>
        </a-upload>
        <a-button
            type="primary"
            :disabled="fileList.length===0"
            :loading="loading"
            style="margin: 16px 0"
            @click="upload"
        >
            {{ loading ? '处理中' : '解析文件' }}
        </a-button>
        <a-button type="link" @click="downloadTemplate">下载模板</a-button>
        <a-alert type="error" message="禁止导入，表格不合法" banner v-if="unknown_excel"/>
        <br/>
        <a-alert type="error" message="禁止导入，存在未创建的学院" banner v-if="unknown_college"/>
        <br/>
        <a-alert type="error" message="禁止导入，存在未创建的专业" banner v-if="unknown_major"/>
        <br/>
        <div>
            <a-table :columns="columns" :data-source="data" row-key="school_id">
                <template slot="college" slot-scope="text,record">
                    {{ text }}
                    <template v-if="record.college_id>0">
                        <a-badge status="success"/>
                    </template>
                    <template v-else>
                        <a-badge status="error"/>
                    </template>
                </template>
                <template slot="major" slot-scope="text,record">
                    {{ text }}
                    <template v-if="record.major_id>0">
                        <a-badge status="success"/>
                    </template>
                    <template v-else>
                        <a-badge status="error"/>
                    </template>
                </template>
                <template slot="class" slot-scope="text,record">
                    {{ text }}
                    <template v-if="record.class_id>0">
                        <a-badge status="success"/>
                        已导入
                    </template>
                    <template v-else>
                        <a-badge status="warning"/>
                        未导入
                    </template>
                </template>
                <template slot="status" slot-scope="text">
                    <template v-if="text>0">
                        <a-badge status="success"/>
                        已导入
                    </template>
                    <template v-else>
                        <a-badge status="warning"/>
                        未导入
                    </template>
                </template>
                <a slot="name" slot-scope="text">{{ text }}</a>
            </a-table>
        </div>
        <footer-tool-bar>
            <a-button
                type="primary"
                @click="showConfirm"
                :loading="loading"
                :disabled="unknown_college||unknown_major||unknown_excel"
            >导入</a-button>
        </footer-tool-bar>
    </a-card>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'

export default {
    name: 'SystemDataImportStudent',
    components: {FooterToolBar},
    data() {
        return {
            fileList: [],
            data: [],
            unknown_college: false,
            unknown_major: false,
            unknown_excel: false,
            loading: false,
            columns: [
                {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'School ID',
                    dataIndex: 'school_id',
                    key: 'school_id',
                },
                {
                    title: '状态',
                    key: 'status',
                    dataIndex: 'user_id',
                    scopedSlots: {customRender: 'status'},
                }
            ]
        }
    },
    methods: {
        beforeUpload(file) {
            this.fileList = [file]
            return false
        },
        async upload() {
            this.data = []
            this.loading = true
            let formData = new FormData()
            formData.append('file', this.fileList[0])

            await this.$api.admin.data_import.parse_student_excel(formData).then(r => {
                this.data = r.data
                this.unknown_college = r.unknown_college
                this.unknown_major = r.unknown_major
                this.unknown_excel = r.unknown_excel
            })

            this.loading = false
        },
        showConfirm() {
            const that = this
            this.$confirm({
                title: '确定要导入吗',
                content: '请注意导入结果不可逆，请仔细检查导入的内容是否正确',
                onOk() {
                    that.import_data()
                },
                onCancel() {
                },
            })
        },
        async import_data() {
            this.loading = true
            let formData = new FormData()
            formData.append('file', this.fileList[0])

            await this.$api.admin.data_import.import_excel_student(formData).then(r => {
                this.data = r.data
                this.unknown_college = r.unknown_college
                this.unknown_major = r.unknown_major
            })

            this.loading = false
        },
        downloadTemplate() {
            const a = document.createElement('a')
            a.href = process.env['VUE_APP_API_STATIC_ROOT']+'/admin/data_import/teacher_template?token='
                +btoa(this.$store.state.user.token)
            a.click()
        }
    }
}
</script>

<style scoped>

</style>
