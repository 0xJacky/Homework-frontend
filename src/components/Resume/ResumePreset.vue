<template>
    <a-descriptions
        :column="{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }"
        bordered
    >
        <a-descriptions-item label="姓名">
            {{ post.user.name }}
        </a-descriptions-item>
        <a-descriptions-item label="性别">
            {{ trans_gender[post.user.gender] }}
        </a-descriptions-item>
        <a-descriptions-item label="个人照片">
            <img v-if="post.user.real_photo" :src="server + '/' + post.user.real_photo" style="max-width: 128px"/>
        </a-descriptions-item>
        <a-descriptions-item label="电话">
            {{ post.user.phone }}
        </a-descriptions-item>
        <a-descriptions-item label="邮箱">
            {{ post.user.email }}
        </a-descriptions-item>
        <a-descriptions-item label="学院">
            {{ post.user.college?.name }}
        </a-descriptions-item>
        <a-descriptions-item label="专业" :span="3">
            {{ post.user.major?.name }}
        </a-descriptions-item>
        <a-descriptions-item :span="3" label="个人介绍">
            <rich-text :html="post.content"/>
        </a-descriptions-item>
        <a-descriptions-item :span="3" label="获奖记录" v-if="post?.attachments?.length">
            <a-list :data-source="post.attachments" item-layout="horizontal">
                <a-list-item slot="renderItem" slot-scope="item">
                    <a slot="actions" :href="server + '/' + item.path" target="_blank" v-if="item.path">下载证书</a>
                    <a-list-item-meta>
                        <template slot="title">{{ item.name }}</template>
                        <div slot="description">
                            {{ get_attachment_desc(item) }}
                            <div v-if="!item.path" style="padding-top: 15px">
                                <a-alert message="证书文件未上传" banner/>
                            </div>
                        </div>
                    </a-list-item-meta>
                </a-list-item>
            </a-list>
        </a-descriptions-item>
    </a-descriptions>
</template>

<script>
import moment from 'moment'
import RichText from '@/components/RichText/RichText'

export default {
    name: 'ResumePreset',
    components: {RichText},
    props: {
        post: Object,
    },
    data() {
        return {
            trans_gender: ['', '女', '男'],
            server: process.env['VUE_APP_API_UPLOAD_ROOT']
        }
    },
    methods: {
        get_attachment_desc(item) {
            const trans_level = ['其他级别', '其他级别', '院级', '校级', '市级', '省级', '国家级', '世界级']
            return trans_level[item.level] + ' · 颁发机构: ' + item.ca + ' · 获奖日期: ' +
                moment(item.date).format('yyyy-MM-DD')
        },
    }
}
</script>

<style scoped>

</style>
