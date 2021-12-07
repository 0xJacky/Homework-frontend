<template>
    <span>
        <a-popover
            placement="bottomRight"
            trigger="hover"
            :visible="hovered"
            @visibleChange="handleHoverChange"
            style="cursor: pointer"
        >
            <div slot="content">
                <div class="user-pop-card">
                    <table>
                        <tr>
                            <td>学工号</td>
                            <td style="text-align: right">{{ user.school_id }}</td>
                        </tr>
                        <tr>
                            <td>用户类型</td>
                            <td style="text-align: right">{{ transform_user_type(user.power) }}</td>
                        </tr>
                    </table>
                    <div style="margin:8px 0 0 0;float: right" v-if="$store.state.user.info.super_user===1">
                        <a href="/admin" target="_blank">管理系统</a>
                    </div>
                     <div class="clear"></div>
                    <div style="margin:8px 0 0 0;float: left">
                        <a @click="$refs.reset_password.show()">修改密码</a>
                    </div>
                    <div style="margin:8px 0 0 0;float: right">
                        <a @click="logout">注销</a>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <span class="avatar">
            <user-avatar/>
            <span>{{ user.name }}</span>
        </span>
        </a-popover>
        <reset-password ref="reset_password"/>
    </span>
</template>

<script>
import UserAvatar from './UserAvatar'
import ResetPassword from '@/components/ResetPassword/ResetPassword'

export default {
    name: 'UserAvatarPopover',
    components: {
        ResetPassword,
        UserAvatar
    },
    data() {
        return {
            hovered: false,
            lastHovered: 0,
        }
    },
    computed: {
        user: {
            get() {
                return this.$store.state.user.info
            }
        },
    },
    methods: {
        handleHoverChange(visible) {
            this.hovered = visible
            const now = Math.floor(Date.now() / 1000)
            if (visible && now - this.lastHovered > 10) {
                this.lastHovered = Math.floor(Date.now() / 1000)
                this.$api.user.info()
            }
        },
        transform_user_type(power) {
            return this.transformUserType(power)
        },
        logout() {
            window.location = '/logout'
        }
    }
}
</script>

<style lang="less" scoped>
.user-pop-card {
    min-width: 200px;

    table {
        width: 100%;
    }

    tr {
        line-height: 2;
    }
}

.ant-popover-inner-content .ant-divider-horizontal {
    margin: 12px 0;
}

.avatar {
    height: 100%;

    .ant-avatar {
        margin: 18px 8px;
    }
}
</style>
