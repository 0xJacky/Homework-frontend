<template>
    <div>
        <a-row>
            <a-col :md="6" :sm="12" :xs="24">
                <chart-card title="学生总数" :value="data.student_count"/>
            </a-col>

            <a-col :md="6" :sm="12" :xs="24">
                <chart-card title="在岗人数" :value="data.on_job_count"/>
            </a-col>

            <a-col :md="6" :sm="12" :xs="24">
                <chart-card title="待审拜访" :value="data.to_audit_count"/>
            </a-col>

            <a-col :md="6" :sm="12" :xs="24">
                <chart-card title="教师总数" :value="data.teacher_count"/>
            </a-col>
        </a-row>
        <a-row>
            <a-card title="欢迎使用 Homework">
                <p>我们准备了几个链接供您快速开始</p>
                <a-row>
                    <a-col :md="8" :xs="24" style="margin-bottom: 15px">
                        <h1>开始使用</h1>
                        <a-space>
                            <a-button style="margin-top: 20px" type="primary"
                                      @click="$router.push('/user_info')" ghost>设置个人信息
                            </a-button>
                        </a-space>
                        <br/>
                        <a-space>
                            <a-button type="link" @click="$router.push('/info')">设置学院信息</a-button>
                        </a-space>
                    </a-col>
                    <a-col :md="8" :xs="24">
                        <h1>下一步</h1>
                        <p>对学院下的用户进行设置请点击
                            <a-button type="link" @click="$router.push('/student')">学生管理</a-button>
                        </p>
                        <p>添加删除修改专业请点击
                            <a-button type="link" @click="$router.push('/major')">专业管理</a-button>
                        </p>
                        <p>发布一篇公告请点击
                            <a-button type="link" @click="$router.push('/notice')">公告管理</a-button>
                        </p>
                    </a-col>
                    <a-col :md="8" :xs="24">
                        <h1>更多功能</h1>
                        <p>审核教师的拜访日志请点击
                            <a-button type="link" @click="$router.push('/visit_log')">教师拜访</a-button>
                        </p>
                        <p>管理任务请点击
                            <a-button type="link"
                                      @click="$router.push('/info')">学院任务
                            </a-button>
                        </p>
                    </a-col>
                </a-row>
            </a-card>
        </a-row>
    </div>
</template>

<script>
import ChartCard from '@/components/Chart/ChartCard'

export default {
    name: 'CollegeDashboard',
    components: {ChartCard},
    data() {
        return {
            data: {}
        }
    },
    created() {
        this.$api.dashboard.college().then(r => {
            this.data = r
        })
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
