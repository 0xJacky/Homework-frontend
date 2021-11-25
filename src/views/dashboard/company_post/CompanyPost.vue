<template>
    <div>
        <a-input-search placeholder="可以输入关键字进行搜索哦" enter-button @search="onSearch"
                        id="search"/>

        <a-list :data-source="posts" item-layout="horizontal">
            <a-list-item slot="renderItem" slot-scope="item">
                <a class="view_notice" slot="actions" @click="get_post(item.id)">查看详情</a>
                <a-list-item-meta
                    :description="'发布时间 ' + moment(item.created_at).format('yyyy-MM-DD HH:mm:ss')"
                >
                    <div slot="title">
                        <a-tag color="blue" v-if="item.is_public === 2">
                            公开
                        </a-tag>
                        <a-tag color="purple" v-else>
                            内部
                        </a-tag>
                        <span>{{ item.title }}</span>
                    </div>
                </a-list-item-meta>
            </a-list-item>
        </a-list>
        <std-pagination :pagination="pagination" @changePage="get_list"/>
        <a-modal
            :footer="null"
            :title="post.title"
            :visible="visible"
            width="80%"
            @cancel="visible=false"
        >
            <rich-text :html="post.content"/>
            <a-divider/>
            <p>发布人： {{ post.user.name }}</p>
            <p>发布时间：{{ moment(post.created_at).format('yyyy-MM-DD HH:mm:ss') }}</p>
        </a-modal>
    </div>
</template>

<script>
import moment from 'moment'
import StdPagination from '@/components/StdDataDisplay/StdPagination'
import RichText from '@/components/RichText/RichText'

export default {
    name: 'DashboardCompanyPost',
    components: {
        StdPagination, RichText
    },
    data() {
        return {
            moment,
            posts: [],
            post: {
                user: {}
            },
            pagination: {},
            visible: false
        }
    },
    created() {
        this.get_list()
    },
    methods: {
        get_post(id) {
            this.visible = true
            this.$api.company_post.get(this.$store.state.user.info.company_id, id).then(r => {
                this.post = r
            })
        },
        get_list(page = 1, search = null) {
            this.$api.company_post.get_list(this.$store.state.user.info.company_id,{page: page, title: search})
                .then(r => {
                    this.posts = r.data
                    this.pagination = r.pagination
                })
        },
        onSearch(val) {
            this.get_list(1, val)
        }
    }
}
</script>

<style lang="less" scoped>

</style>
