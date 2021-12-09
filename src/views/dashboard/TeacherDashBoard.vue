<template>
    <div>
        <a-row>
            <a-card title="欢迎使用 Homework">
                <p>我们准备了几个链接供您快速开始</p>
                <a-row>
                    <a-col :md="8" :xs="24" style="margin-bottom: 15px">
                        <h1>开始使用</h1>
                        <a-space>
                            <a-button style="margin-top: 20px" type="primary"
                                      @click="$router.push('/user_info')" ghost>1.
                                <a-divider type="vertical"/>
                                设置个人信息
                            </a-button>
                        </a-space>
                    </a-col>
                    <a-col :md="8" :xs="24">
                        <h1>下一步</h1>
                        <p>2.
                            <a-divider type="vertical"/>
                            查看班级请点击
                            <a-button type="link" @click="$router.push('class_list')">班级列表</a-button>
                        </p>
                        <p>3.
                            <a-divider type="vertical"/>
                            创建作业请点击
                            <a-button type="link" @click="$router.push('homework/create')">创建班级</a-button>
                        </p>
                    </a-col>
<!--                    <a-col :md="8" :xs="24">-->
<!--                        <h1>更多功能</h1>-->
<!--                        <p>5.-->
<!--                            <a-divider type="vertical"/>-->
<!--                            审核学生的当前阶段任务-->
<!--                            <a-button type="link" @click="$router.push('task/checkout')">学生任务验收</a-button>-->
<!--                        </p>-->
<!--                        <p>6.-->
<!--                            <a-divider type="vertical"/>-->
<!--                            批阅学生请假情况请点击-->
<!--                            <a-button type="link"-->
<!--                                      @click="$router.push('leave')">学生请假-->
<!--                            </a-button>-->
<!--                        </p>-->
<!--                    </a-col>-->
                </a-row>
            </a-card>
        </a-row>
    </div>
</template>

<script>

export default {
    name: 'TeacherDashboard',

    data() {
        return {
            data: {
            }
        }
    },
    created() {

    }
}
</script>

<style lang="less" scoped>
.ant-card {
    margin: 15px;
    @media (max-width: 512px) {
        margin: 15px 0;
    }

    .chart-card-content, .chart-wrapper, .chart {
        overflow: hidden;
    }
}
</style>
