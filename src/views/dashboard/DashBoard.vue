<template>
    <div>
        <a-row>
            <a-col :xs="24">
                <a-card>
                    <a-card-meta :title="auto_welcome + ', ' + user.name">
                        <user-avatar :size="48" slot="avatar"/>
                        <div slot="description" v-if="user.power === 1">
                            {{ user.college?.name }} ·
                            {{ user.major?.name }}
                        </div>
                        <div slot="description" v-else-if="user.power === 3 || user.power === 4">
                            {{ user.company?.name }}
                        </div>
                        <div slot="description" v-else>
                            {{ user.college?.name }}
                        </div>
                    </a-card-meta>
                </a-card>
            </a-col>
        </a-row>

        <student-dashboard v-if="user.power === 1"/>
        <teacher-dashboard v-if="user.power === 2"/>
        <company-teacher-dashboard v-if="user.power === 3"/>
        <enterprise-dashboard v-if="user.power === 4"/>
        <college-dashboard v-if="user.power === 5"/>


        <!-- v-if="user.power === 2 " -->

        <a-row class="row-two">
            <a-col :sm="24" v-if="user.power === 1 && (user.teacher || user.company_teacher)">
                <a-card title="常用联系方式">
                    <template v-if="user.teacher">
                        <p>我的校内指导老师：{{ user.teacher.name }}</p>
                        <p>电话：{{ user.teacher.phone }}</p>
                        <p>邮箱： {{ user.teacher.email }}</p>
                        <a-divider/>
                    </template>
                    <template v-if="user.company_teacher">
                        <p>我的企业指导老师：{{ user.company_teacher.name }}</p>
                        <p>电话：{{ user.company_teacher.phone }}</p>
                        <p>邮箱： {{ user.company_teacher.email }}</p>
                    </template>
                </a-card>
            </a-col>
            <a-col :sm="24">
                <a-card>
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" tab="学院公告">
                            <a-input-search placeholder="可以输入关键字进行搜索哦" :loading="myLoading" enter-button
                                            @search="onSearch"
                                            id="search"/>
                            <a-list :data-source="data.notices" item-layout="horizontal">
                                <a-list-item slot="renderItem" slot-scope="item">
                                    <a class="view_notice" slot="actions" @click="showNotice(item.id)">查看详情</a>
                                    <a-list-item-meta
                                        :description="'发布时间 ' + moment(item.created_at).format('yyyy-MM-DD HH:mm:ss')"
                                    >
                                        <div slot="title">
                                            <span style="padding-right: 10px">{{ item.title }}</span>
                                            <a-tag color="pink" v-if="item.can_student_visit===1">
                                                学生
                                            </a-tag>
                                            <a-tag color="orange" v-if="item.can_teacher_visit===1">
                                                校内教师
                                            </a-tag>
                                            <a-tag color="blue" v-if="item.can_company_visit===1">
                                                企业与企业教师
                                            </a-tag>
                                        </div>
                                    </a-list-item-meta>
                                </a-list-item>
                            </a-list>
                            <std-pagination :pagination="data.notices_pagination" @changePage="getNotices"/>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="企业公告"
                                    v-if="(user.power===1||user.power===3||user.power===4)&&user.company_id">
                            <dashboard-company-post/>
                        </a-tab-pane>
                    </a-tabs>
                </a-card>
            </a-col>
        </a-row>
        <a-modal
            :footer="null"
            :title="notice.title"
            :visible="noticeVisible"
            @cancel="noticeVisible=false"
        >
            <rich-text :html="notice.content"/>
            <a-divider/>
            <p v-if="uploads.length !== 0 ">
                附件：
                <span v-for="upload in uploads" :key="upload.id">
                    <a-icon type="paper-clip"/>
                    <a :href="server +'/'+ upload.path ">{{ getFileName(upload.path) }}</a>
                    <a-divider type="vertical"/>
                </span>
            </p>
            <p>发布人： {{ notice.user.name }}</p>
            <p>发布时间：{{ moment(notice.created_at).format('yyyy-MM-DD HH:mm:ss') }}</p>
        </a-modal>
    </div>
</template>

<script>
import moment from 'moment'
import StdPagination from '@/components/StdDataDisplay/StdPagination'
import UserAvatar from '@/components/UserAvatar/UserAvatar'
import CollegeDashboard from '@/views/dashboard/CollegeDashboard'
import TeacherDashboard from '@/views/dashboard/TeacherDashBoard'
import StudentDashboard from '@/views/dashboard/StudentDashboard'
import EnterpriseDashboard from '@/views/dashboard/EnterpriseDashboard'
import CompanyTeacherDashboard from '@/views/dashboard/CompanyTeacherDashboard'
import RichText from '@/components/RichText/RichText'
import DashboardCompanyPost from '@/views/dashboard/company_post/CompanyPost'

export default {
    name: 'Dashboard',
    components: {
        DashboardCompanyPost,
        RichText,
        CompanyTeacherDashboard,
        StudentDashboard, TeacherDashboard, CollegeDashboard, UserAvatar, StdPagination, EnterpriseDashboard
    },
    data() {
        return {
            loading: true,
            noticeVisible: false,
            data: {
                notices: [],
                notices_pagination: {}
            },
            notice: {
                user: {}
            },
            server: process.env['VUE_APP_API_UPLOAD_ROOT'],
            moment,
            myLoading: false,
            uploads: []
        }
    },
    created() {
        this.loading = false
        this.$api.notice.get_list().then(r => {
            this.data['notices'] = r.notices ? r.notices : r.data
            this.data['notices_pagination'] = r.pagination
        })
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
        showNotice(id) {
            this.$api.notice.get(id).then(r => {
                this.noticeVisible = true
                this.notice = r
                this.uploads = r.uploads
            })
        },
        getNotices(page = 1) {
            this.$api.notice.get_list({page: page}).then(r => {
                this.data['notices'] = r.notices ? r.notices : r.data
                this.data['notices_pagination'] = r.pagination
            })
        },
        onSearch(val) {
            this.myLoading = true
            this.$api.notice.get_list({title: val}).then(r => {
                this.data['notices'] = r.notices ? r.notices : r.data
                this.data['notices_pagination'] = r.pagination
            })
            this.myLoading = false
        },
        getFileName(path) {
            // 从15开始找
            const idx = path.indexOf('/', 15)
            return path.substring(idx + 1)
        }
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
