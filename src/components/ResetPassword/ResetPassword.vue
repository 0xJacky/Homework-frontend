<template>
    <a-modal
        :mask="false"
        :visible="visible"
        cancel-text="取消"
        ok-text="修改"
        title="修改密码"
        @cancel="visible=false"
        @ok="reset_password"
    >
        <a-form-item label="原密码">
            <a-input-password v-model="password.orig_password"/>
        </a-form-item>
        <a-form-item label="新密码">
            <a-input-password v-model="password.new_password"/>
        </a-form-item>
        <a-form-item label="再次输入密码">
            <a-input-password v-model="password.re_new_password"/>
        </a-form-item>
    </a-modal>
</template>

<script>
export default {
    name: 'ResetPassword',
    data() {
        return {
            visible: false,
            password: {}
        }
    },
    methods: {
        show() {
            this.visible = true
            this.password = {
                orig_password: '',
                new_password: '',
                re_new_password: ''
            }
        },
        reset_password() {
            if (this.password.new_password.length < 6) {
                return this.$message.warning('请确保新密码的长度大于6位')
            }
            if (this.password.new_password !== this.password.re_new_password) {
                this.$message.error('两次输入的新密码不一致')
                return
            }
            this.$api.user.reset_password(this.password).then(() => {
                this.$message.success('密码修改成功，请妥善保管')
            }).catch(e => {
                this.$message.error(e.message ?? '无法修改')
            })
        }
    }
}
</script>

<style scoped>

</style>
