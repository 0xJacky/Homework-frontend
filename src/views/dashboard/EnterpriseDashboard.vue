<template>
    <div>
        <a-row>
            <a-col :md="6" :sm="12" :xs="24">
                <chart-card title="学生总数" :value="data.student_count"/>
            </a-col>

            <a-col :md="6" :sm="12" :xs="24">
                <chart-card title="岗位总数" :value="data['position_count']"/>
            </a-col>

            <a-col :md="6" :sm="12" :xs="24">
                <chart-card title="老师人数" :value="data['company_teacher_count']"/>
            </a-col>

            <a-col :md="6" :sm="12" :xs="24">
                <chart-card title="计划录用" :value="data['plan_count']"/>
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
                            对岗位进行设置请点击
                            <a-button type="link" @click="$router.push('positions')">岗位管理</a-button>
                        </p>
                        <p>3.
                            <a-divider type="vertical"/>
                            添加删除实习生请点击
                            <a-button type="link" @click="$router.push('student_list')">实习生管理</a-button>
                        </p>
                        <p>4.
                            <a-divider type="vertical"/>
                            查看收到的简历请点击
                            <a-button type="link" @click="$router.push('resumes')">简历管理</a-button>
                        </p>
                    </a-col>
                    <a-col :md="8" :xs="24">
                        <h1>更多功能</h1>
                        <p>5.
                            <a-divider type="vertical"/>
                            修改企业的基本信息请点击
                            <a-button type="link" @click="$router.push('company_info')">企业基本信息</a-button>
                        </p>
                        <p>6.
                            <a-divider type="vertical"/>
                            添加删除企业负责老师请点击
                            <a-button type="link"
                                      @click="$router.push('teachers')">指导老师管理
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
    name: 'EnterpriseDashboard',
    components: {ChartCard},
    data() {
        return {
            data: {
            }
        }
    },
    created() {
        this.$api.dashboard.enterprise().then(r => {
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
