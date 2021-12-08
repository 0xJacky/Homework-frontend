<template>
    <a-card title="作业详情">
        <h3>提交情况</h3>
        <p>截止时间：{{ formatDateTime(data?.homework?.deadline) }}</p>
        <p>成绩：{{ data.score }}</p>
        <p v-if="data?.homework?.uploads?.length">已上传附件</p>
        <span v-for="upload in data.uploads" :key="upload.id">
            <a-icon type="paper-clip"/>
            <a :href="server +'/'+ upload.path ">{{ getFileName(upload.path) }}</a>
            <a-divider type="vertical"/>
        </span>
        <h3>作业描述</h3>
        <rich-text :html="data?.homework?.description"/>
        <h3>文件上传</h3>
        <div class="upload-container">
            <a-upload-dragger
                name="file"
                :multiple="true"
            >
                <p class="ant-upload-drag-icon">
                    <a-icon type="inbox"/>
                </p>
                <p class="ant-upload-text">
                    点击或拖拽文件到这里即可提交
                </p>
                <p class="ant-upload-hint">
                    支持单个或批量上传。
                </p>
            </a-upload-dragger>
        </div>

        <footer-tool-bar>
            <a-space>
                <a-button @click="$router.go(-1)">返回</a-button>
            </a-space>
        </footer-tool-bar>
    </a-card>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'
import RichText from '@/components/RichText/RichText'

export default {
    name: 'HomeworkDetail',
    components: {RichText, FooterToolBar},
    data() {
        return {
            data: {},
            server: process.env['VUE_APP_API_UPLOAD_ROOT'],
        }
    },
    created() {
        this.$api.student_api.homework.get(this.$route.params.id).then(r => {
            this.data = r
        })
    },
    methods: {
        getFileName(path) {
            // 从15开始找
            const idx = path.lastIndexOf('/')
            return path.substring(idx + 1)
        }
    }
}
</script>

<style lang="less" scoped>
.upload-container {
    padding-top: 15px;
}
h3 {
    position: relative;
    padding: 5px 18px;
    margin: 10px 0;
}

h3:before {
    content: '';
    position: absolute;
    left: 0;
    top: 6px;
    width: 6px;
    height: 23px;
    border-radius: 10px;
    background: #f0494d;
    background: -o-linear-gradient(bottom, #ff843a, #f0494d);
    background: -webkit-gradient(linear, left bottom, left top, from(#ff843a), to(#f0494d));
    background: linear-gradient(to top, #ff843a, #f0494d);
}
</style>
