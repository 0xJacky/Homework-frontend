<template>
    <div class="notice">
        <a-badge :dot="!!unread">
            <a-icon class="notice_icon" type="bell" @click="visible=!visible"/>
        </a-badge>
        <a-modal
            v-model="visible"
            @click="get_list"
            destroyOnClose
            title="我的信箱"
            :footer="null"
        >
            <a-empty v-if="!notifications.length"/>
            <a-list v-else>
                共有 {{ pagination.total }} 条消息，其中 {{ unread }} 条未读
                <a-popconfirm
                    cancelText="再想想"
                    okText="是的" title="确定要删除所有消息吗?"
                    @confirm="destroyAll()">
                    <a-button type="link" size="small">清空信箱</a-button>
                </a-popconfirm>
                <a-list-item v-for="n in notifications" :key="n.id">
                    <a-list-item-meta>
                        <div slot="title">
                            <a @click="read(n)">{{ n.title }}</a>
                        </div>
                        <div slot="description">
                            <p>
                                <span>{{ n.from_user_id ? n.from_username : '系统消息' }}</span>
                                <a-divider type="vertical"/>
                                <span>{{ moment(n.created_at).format('yyyy-MM-DD HH:mm:ss') }}</span>
                                <span v-if="n.flag"><a-badge status="success"/>已读</span>
                                <span v-else><a-badge status="warning"/>未读</span>
                                <a-divider type="vertical"/>
                                <a-popconfirm
                                    cancelText="再想想"
                                    okText="是的" title="确定要删除吗?"
                                    @confirm="destroy(n.id)">
                                    <a>删除</a>
                                </a-popconfirm>
                            </p>
                        </div>
                    </a-list-item-meta>
                </a-list-item>
            </a-list>
            <std-pagination :pagination="pagination" @changePage="get_list"/>
        </a-modal>

        <a-modal
            v-model="view_message"
            :title="message.title"
            :footer="null"
            centered
            destroyOnClose
        >
            <p>{{ message.content }}</p>
            <p>
                <span>{{ message?.from?.name ?? '系统消息' }}</span>
                <a-divider type="vertical"/>
                <span>{{ moment(message.created_at).format('yyyy-MM-DD HH:mm:ss') }}</span>
                <span v-if="message.flag"><a-badge status="success"/>已读</span>
                <span v-else><a-badge status="warning"/>未读</span>
                <a-divider type="vertical"/>
                <a-popconfirm
                    cancelText="再想想"
                    okText="是的" title="确定要删除吗?"
                    @confirm="destroy(message.id);view_message=false">
                    <a>删除</a>
                </a-popconfirm>
            </p>
        </a-modal>
    </div>
</template>

<script>
import StdPagination from '@/components/StdDataDisplay/StdPagination'
import moment from 'moment'
import ReconnectingWebSocket from 'reconnecting-websocket'

export default {
    name: 'HeaderNotice',
    components: {StdPagination},
    props: {
        notice_amount: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            loading: true,
            visible: false,
            notifications: [],
            pagination: {},
            view_message: false,
            message: {},
            moment,
            ws: {}
        }
    },
    watch: {
        visible() {
            if (this.visible === true) {
                this.get_list()
            }
        }
    },
    created() {
        this.initWebsocket()
    },
    methods: {
        initWebsocket() {
            this.ws = new ReconnectingWebSocket(this.getWebSocketRoot() + '/live',
                null, {maxReconnectAttempts: 10})
            this.ws.onopen = () => {
                this.ws.send(JSON.stringify({
                    jwt: this.$store.state.user.token,
                }))
            }
            this.ws.onmessage = (m) => {
                const data = JSON.parse(m.data).data
                this.$notification.open({
                    message: data.title,
                    description: data.content,
                    duration: 0
                })
                this.$store.commit('update_user',
                    {
                        unread_message_num: this.$store.state.user.info.unread_message_num + 1
                    })
            }
        },
        get_list(page = null) {
            if (page == null) {
                this.$api.user.info()
            }
            this.$api.notification.get_list({page: page ?? 1}).then(r => {
                this.notifications = r.data ?? []
                this.pagination = r.pagination
            })
        },
        read(message) {
            this.$api.notification.read(message.id).then(r => {
                this.message = r
                this.view_message = true
                if (!message.flag) {
                    this.unread = this.unread - 1
                    message.flag = 1
                }
            })
        },
        destroy(id) {
            this.$api.notification.destroy(id).then(() => {
                this.get_list()
                this.unread = this.unread - 1
            })
        },
        destroyAll() {
            this.$api.notification.destroyAll().then(() => {
                this.notifications = []
                this.pagination = {}
                this.unread = 0
            })
        }
    },
    computed: {
        unread: {
            get() {
                return this.$store.state.user.info.unread_message_num
            },
            async set(val) {
                if (val < 0) {
                    val = 0
                }
                this.$store.commit('update_user', {unread_message_num: val})
            }
        }
    }
}
</script>

<style lang="less">
.header-notice-wrapper {
    top: 50px !important;
}

@media (max-width: 600px) {
    .ant-notification {
        margin: 0 auto !important;
        left: 0;
    }
}
</style>

<style lang="less" scoped>
.notice {
    display: inline-block;
    transition: all 0.3s;
    margin: 0 20px;

    .notice_icon {
        font-size: 16px;
        padding: 4px;
    }

    span {
        vertical-align: initial;
    }
}

/deep/ .ant-badge-status {
    margin-left: 10px;
}

</style>
