<template>
    <div class="header">
        <div class="tool">
            <a-icon type="menu-unfold" @click="$emit('clickUnFold')"/>
        </div>
        <div class="user-wrapper">
            <a href="/" target="_blank">
                <a-icon type="home"/>
            </a>
            <notification/>
            <user-avatar-popover/>
        </div>
    </div>
</template>

<script>
import UserAvatarPopover from '@/components/UserAvatar/UserAvatarPopover'
import Notification from '@/components/Notification/Notification'

export default {
    name: 'HeaderComponent',
    components: {
        UserAvatarPopover,
        Notification
    },
    data() {
        return {}
    }
}
</script>

<style lang="less" scoped>
.header {
    height: 64px;
    padding: 0 20px 0 0;
    background: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
    @media (prefers-color-scheme: dark) {
        background: #28292c;
        box-shadow: 1px 1px 0 0 #404040;
    }
    position: fixed;
    width: 100%;
}

.tool {
    position: fixed;
    left: 20px;
    @media (min-width: 512px) {
        display: none;
    }
}

.user-wrapper {
    position: fixed;
    right: 30px;
}
</style>
