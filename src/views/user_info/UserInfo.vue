<template>
    <div>
        <a-card title="个人信息">
            <std-data-entry
                v-model="user_info"
                :data-list="editable"
                layout="horizontal"
                :error="errors"
                ref="std_data_entry"
            />
        </a-card>
        <reset-password ref="reset_password"/>
        <footer-tool-bar>
            <a-space>
                <a-button @click="$refs.reset_password.show()">修改密码</a-button>
                <a-button type="primary" @click="save">保存</a-button>
            </a-space>
        </footer-tool-bar>
    </div>

</template>

<script>
import StdDataEntry from '@/components/StdDataEntry/StdDataEntry'
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'
import student_columns from './student_columns'
import teacher_columns from './teacher_columns'
import company_columns from './company_columns'
import ResetPassword from '@/components/ResetPassword/ResetPassword'

export default {
    name: 'Userinfo',
    components: {
        ResetPassword,
        StdDataEntry,
        FooterToolBar
    },
    data() {
        return {
            editable: [],
            user_info: {},
            errors: {},
        }
    },
    created() {
        this.$api.user.info().then(r => {
            this.user_info = r
        })
        const power = this.$store.state.user.info.power
        if (power === 1) {
            this.editable = student_columns
        } else if (power === 3 || power === 4) {
            this.editable = company_columns
        } else if (power === 2 || power === 5) {
            this.editable = teacher_columns
        }
    },
    methods: {
        uploadColumns(columns) {
            return columns.filter((c) => {
                return c.edit && c.edit.type === 'upload'
            })
        },
        save() {
            const refs = this.$refs.std_data_entry.$refs
            this.$nextTick().then(() => {
                this.uploadColumns(this.editable).forEach(c => {
                    const t = refs['std_upload_' + c.dataIndex][0]
                    if (t) {
                        t.upload()
                    }
                })
            }).then(() => {
                this.$api.user.update_user_info(this.user_info).then(r => {
                    this.user_info = r
                    this.$message.success('保存成功')
                    this.errors = {}
                }).catch(r => {
                    console.log(r)
                    if (r.errors) {
                        this.errors = r.errors
                    }
                    this.$message.error('系统错误')
                })
            })
        }
    }

}
</script>

<style scoped>

</style>
