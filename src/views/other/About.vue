<template>
    <a-card>
        <div style="text-align: center">
            <img :src="logo" style="width: 256px"/>
        </div>
        <h2 style="text-align: center">Homework</h2>
        <p style="text-align: center">Shenzhen Technology University Enterprise Internship System</p>
        <p style="text-align: center">Version: {{ version }}（{{ build_id }}）</p>
        <h3 style="text-align: center">项目组</h3>
        <div style="text-align: center">
            <p>指导教师：李文贤、杨旭</p>
            <p>项目和文档管理：麦炜欣</p>
            <p>后端数据库开发：余圳曦、林昕泽、林潮林</p>
            <p>Web前端开发：余圳曦、邓崇森</p>
            <p>小程序开发：方钦、麦炜欣</p>
            <div v-if="api_root === 'mock'" class="egg">
                <p>mock 特供彩蛋</p>
                <a-button @click="changeUserPower(0)">我是学生</a-button>
                <a-button @click="changeUserPower(1)">我是企业</a-button>
                <a-button @click="changeUserPower(2)">我是教师</a-button>
                <a-button @click="changeUserPower(3)">我是学院</a-button>
            </div>
            <p>Copyright © 2020 - {{ this_year }} 深圳技术大学 </p>
        </div>
    </a-card>
</template>

<script>
export default {
    name: 'About',
    data() {
        const date = new Date()
        return {
            this_year: date.getFullYear(),
            version: process.env.VUE_APP_VERSION,
            build_id: process.env.VUE_APP_TOTAL_BUILD ? process.env.VUE_APP_TOTAL_BUILD : '开发模式',
            api_root: process.env.VUE_APP_API_ROOT,
            logo: require('@/assets/img/logo.png')
        }
    },
    methods: {
        async changeUserPower(power) {
            await this.$store.dispatch('update_mock_user', {power: power})
            await this.$api.user.info()
            await this.$message.success('修改成功')
        }
    }
}
</script>

<style lang="less" scoped>
h2 {
    padding: 10px;
}

.egg {
    padding: 10px 0;
}

.ant-btn {
    margin: 10px 10px 0 0;
}
</style>
