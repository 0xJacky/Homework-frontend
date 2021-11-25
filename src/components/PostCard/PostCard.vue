<template>
    <a-card :bordered="false" class="post-card">
        <a-tag v-if="post.topic" color="orange">{{ post.topic }}</a-tag>
        <a-tag v-if="post.category" color="blue">{{ post.category }}</a-tag>
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <p class="meta">
            <span>{{ post.author }}</span>
            <span>{{ moment(post.created_at).fromNow() }}</span>
            <span><a-icon type="eye"/> {{ post.visits }}</span>
            <span><a-icon type="message"/> {{ post.comments }}</span>
            <span><a-icon type="like"/> {{ post.likes }}</span>
        </p>
    </a-card>
</template>

<script>
const moment = require('moment')

require('moment/locale/zh-cn')
moment.locale('zh-cn')

export default {
    name: 'PostCard',
    props: {
        post: Object
    },
    data() {
        return {
            moment
        }
    }
}
</script>

<style lang="less" scoped>
.post-card.ant-card {
    margin-bottom: 30px !important;

    h2 {
        margin: 10px 0;
    }

    .meta {

        font-size: 13px;

        span {
            margin: 0 13px 0 0;
        }
    }
}
</style>
