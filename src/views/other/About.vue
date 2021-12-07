<template>
    <a-card>
        <h2>Homework!</h2>
        <p>作业提交系统</p>
        <p>Version: {{ version }}（{{ build_id }}）</p>
        <h3>项目组</h3>
        <div>
            <p>余圳曦：系统架构设计，前端与后端开发</p>
            <p>孙运滨：后端开发</p>
            <p>陈致海：组长，测试开发</p>
            <p>Copyright © 2020 - {{ this_year }} Homework! </p>
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

    }
}
</script>

<style lang="less" scoped>
h2 {
    padding-bottom: 10px;
}

.egg {
    padding: 10px 0;
}

.ant-btn {
    margin: 10px 10px 0 0;
}
</style>
