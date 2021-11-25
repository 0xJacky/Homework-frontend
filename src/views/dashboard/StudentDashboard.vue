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
                            写下一篇简历请点击
                            <a-button type="link" @click="$router.push('/resume/add')">新建简历</a-button>
                        </p>
                        <p>3.
                            <a-divider type="vertical"/>
                            查看所有岗位戳这里
                            <a-button type="link" @click="$router.push('/positions')">岗位列表</a-button>
                        </p>
                        <p>4.
                            <a-divider type="vertical"/>
                            了解今年参与招聘的公司看这里
                            <a-button type="link" @click="$router.push('/company_list')">企业列表</a-button>
                        </p>
                    </a-col>
                    <a-col :md="8" :xs="24">
                        <h1>更多功能</h1>
                        <p>5.
                            <a-divider type="vertical"/>
                            完成学校安排的任务请点击
                            <a-button type="link" @click="$router.push('/task')">我的任务</a-button>
                        </p>
                        <p>6.
                            <a-divider type="vertical"/>
                            需要请假请访问
                            <a-button type="link"
                                      @click="$router.push('/leave')">请假信息
                            </a-button>
                        </p>
                        <p>7.
                            <a-divider type="vertical"/>
                            撰写实习周记请点击
                            <a-button type="link"
                                      @click="$router.push('/report/edit')">添加周记
                            </a-button>
                        </p>
                    </a-col>
                </a-row>
            </a-card>
        </a-row>
    </div>
</template>

<script>

export default {
    name: 'StudentDashboard',
    components: {

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
