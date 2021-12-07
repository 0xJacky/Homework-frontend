<template>
    <div>
        <a-row>
            <a-col :xs="24">
                <a-card>
                    <a-card-meta :title="auto_welcome + ', ' + user.name">
                        <user-avatar :size="48" slot="avatar"/>
                        <div slot="description">欢迎来到 Homework！</div>
                    </a-card-meta>
                </a-card>
            </a-col>
        </a-row>

        <student-dashboard v-if="user.power === 1"/>
        <teacher-dashboard v-if="user.power === 2"/>
    </div>
</template>

<script>
import moment from 'moment'
import UserAvatar from '@/components/UserAvatar/UserAvatar'
import TeacherDashboard from '@/views/dashboard/TeacherDashBoard'
import StudentDashboard from '@/views/dashboard/StudentDashboard'

export default {
    name: 'Dashboard',
    components: {
        UserAvatar,
        StudentDashboard, TeacherDashboard
    },
    data() {
        return {
            loading: true,
            server: process.env['VUE_APP_API_UPLOAD_ROOT'],
            moment,
            myLoading: false,
            uploads: []
        }
    },
    created() {
        this.loading = false
    },
    computed: {
        user: {
            get() {
                return this.$store.state.user.info
            }
        },
        auto_welcome: {
            get() {
                const hours = new Date().getHours()
                if (hours >= 5 && hours <= 9) {
                    return '早上好'
                } else if (hours > 9 && hours < 12) {
                    return '上午好'
                } else if (hours >= 12 && hours < 14) {
                    return '中午好'
                } else if (hours >= 14 && hours <= 17) {
                    return '下午好'
                } else {
                    return '晚上好'
                }
            }
        }
    },
    methods: {
    },
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

    /deep/ .ant-input-group {
        width: 20rem;
    }
}

/deep/ .ant-modal {
    width: 100% !important;
    max-width: 800px !important;
}

.row-two {
    .ant-card-body {
        min-height: 255px;
    }
}
</style>
