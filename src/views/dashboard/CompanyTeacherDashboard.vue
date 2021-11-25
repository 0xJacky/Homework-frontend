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
                            管理实习生请点击
                            <a-button type="link" @click="$router.push('student_list')">实习生管理</a-button>
                        </p>

                    </a-col>
                </a-row>
            </a-card>
        </a-row>
    </div>
</template>

<script>
export default {
    name: 'CompanyTeacherDashboard',
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
