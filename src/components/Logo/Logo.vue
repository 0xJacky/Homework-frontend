<template>
    <div class="logo">
        <img :src="logo"/>
        <div class="text">作业系统</div>
        <div class="clear"></div>
    </div>
</template>

<script>
export default {
    name: 'Logo',
    data() {
        return {
            logo: require('@/assets/img/logo.png')
        }
    }
}
</script>

<style lang="less" scoped>
.logo {
    padding: 8px 20px;
    -webkit-box-shadow: 1px 1px 0 0 #e8e8e8;
    box-shadow: 1px 1px 0 0 #e8e8e8;
    transition: all 0.3s;
    height: 64px;
    width: 100%;
    overflow: hidden;
    display: inline-block;
    background-color: #ffffff;
    @media (prefers-color-scheme: dark) {
        background-color: transparent;
        -webkit-box-shadow: 1px 1px 0 0 #404040;
        box-shadow: 1px 1px 0 0 #404040;
    }

    img {
        height: 46px;
        padding: 12px;
        float: left;
    }

    .text {
        float: left;
        font-size: 22px;
        line-height: 48px;
        height: 48px;
        display: inline-block;
        color: #1890ff;
    }
}
</style>
