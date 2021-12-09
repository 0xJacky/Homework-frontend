<template>
    <a-row>
        <a-col :lg="8" :md="8" :sm="24">
            <a-card :bordered="false" class="account">
                <div class="account-center-avatarHolder">
                    <div class="avatar">
                        <img v-if="user.avatar" :src="server + '/' + user.avatar"/>
                        <a-avatar v-else :size="104" icon="user"/>
                    </div>
                    <div class="username">
                        {{ user.name }}
                    </div>
                    <div class="level">{{ transformUserType(user.power) }}</div>
                </div>
                <div class="account-center-detail">
                    <p>
                        <a-icon type="phone"/>
                        手机:
                        {{ user.phone ? user.phone : '无' }}
                    </p>
                    <p>
                        <a-icon type="mail"/>
                        邮箱:
                        {{ user.email ? user.email : '无' }}
                    </p>
                    <p>
                        <a-icon type="login"/>
                        上次活跃:
                        {{ user.last_active ? moment(user.last_active).fromNow() : '从未' }}
                    </p>
                    <p>
                        <a-icon type="edit"/>
                        个人描述:
                        {{ user.description ? user.description : '无' }}
                    </p>
                </div>
            </a-card>
        </a-col>
        <a-col :lg="16" :md="16" :sm="24">
            <a-card>
                <std-data-entry v-model="user" :data-list="editable" :error="error" style="max-width: 300px"/>
                <footer-tool-bar>
                    <a-space>
                        <a-button @click="$router.go(-1)">返回</a-button>
                        <a-button :loading="loading" type="primary" @click="save">提交</a-button>
                    </a-space>
                </footer-tool-bar>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'
import StdDataEntry from '@/components/StdDataEntry/StdDataEntry'

import moment from 'moment'

require('moment/locale/zh-cn')
moment.locale('zh-cn')

const editable = [{
    title: '昵称',
    dataIndex: 'name',
    edit: {
        type: 'input'
    }
}, {
    title: 'School ID / 登录名',
    dataIndex: 'school_id',
    edit: {
        type: 'input'
    }
}, {
    title: '用户权限',
    dataIndex: 'power',
    mask: {
        0: '无',
        1: '学生',
        2: '教师'
    },
    edit: {
        type: 'select',
    }
}, {
    title: '超级用户',
    dataIndex: 'super_user',
    mask: {
        '-1': '否',
        1: '是',
    },
    edit: {
        type: 'select',
    }
}, {
    title: '性别',
    dataIndex: 'gender',
    mask: {
        0: '未设置',
        1: '女',
        2: '男'
    },
    edit: {
        type: 'select',
    }
}, {
    title: '邮箱',
    dataIndex: 'email',
    edit: {
        type: 'input'
    }
}, {
    title: '手机',
    dataIndex: 'phone',
    edit: {
        type: 'input'
    }
}, {
    title: '密码',
    dataIndex: 'password',
    edit: {
        type: 'input',
        placeholder: {
            add: '请设置用户初始密码',
            edit: '留空则不修改'
        }
    }
}]

export default {
    name: 'UserEdit',
    components: {
        StdDataEntry,
        FooterToolBar
    },
    data() {
        return {
            server: process.env['VUE_APP_API_UPLOAD_ROOT'],
            loading: false,
            user: {
                id: 0,
                name: '',
                email: '无',
                phone: '无',
                password: '',
            },
            editable,
            visible: false,
            credit: {},
            error: {},
            moment
        }
    },
    created() {
        this.get()
    },
    watch: {
        '$route'() {
            this.user = {
                id: 0,
                name: '',
                email: '无',
                phone: '无',
                password: '',
                description: '无描述',
                last_active: '',
                college: {},
                major: {}
            }
        }
    },
    methods: {
        get() {
            if (this.$route.params.id) {
                this.$api.admin.user.get(this.$route.params.id).then(r => {
                    r.major = r.major ?? {}
                    r.college = r.college ?? {}
                    r.company = r.company ?? {}
                    this.$nextTick(() => {
                        this.user = {
                            ...this.user,
                            ...r,
                        }
                    })
                })
            }
        },
        save() {
            this.loading = true
            this.$api.admin.user.save(this.user.id, this.user).then(r => {
                this.user = r
                this.loading = false
                this.$message.success('更新成功')
                this.error = {}
            }).catch(r => {
                this.loading = false
                this.$message.error('系统错误')
                this.error = r.errors
            })
        }
    }
}
</script>

<style lang="less" scoped>
.account {
    margin: 0 15px 0 0;
    @media (max-width: 512px) {
        margin: 0 0 20px 0;
    }
}

.account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    & > .avatar {
        width: 104px;
        height: 104px;
        margin: 0 auto 20px;
        border-radius: 50%;
        overflow: hidden;

        img {
            height: 100%;
            width: 100%;
        }
    }

    .username {
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        margin-bottom: 4px;
    }
}

.account-center-detail {
    p {
        margin-bottom: 8px;
        padding-left: 26px;
        position: relative;
    }

    .title {
        background-position: 0 0;
    }

    .group {
        background-position: 0 -22px;
    }

    .address {
        background-position: 0 -44px;
    }
}
</style>
