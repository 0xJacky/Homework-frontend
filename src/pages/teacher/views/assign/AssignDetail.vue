<template>
    <a-card title="提交详情">
        <h3>提交</h3>
        <p>提交人：{{ data?.user?.name }}</p>
        <p>学号：{{ data?.user?.school_id }}</p>
        <h3>附件</h3>
        <a-empty v-if="!data?.uploads?.length"/>
        <p style="margin: 5px 0" v-for="file in data?.uploads" :key="file.id">
            <a-icon type="paper-clip" style="margin-right: 5px"/>
            <a :href="server + '/' + file.path" target="_blank" @click="()=>{}">{{ getFileName(file.path) }}</a>
        </p>
        <h3>批改</h3>
        <a-form-item label="分数">
            <a-input-number v-model="data.score" :min="1" :max="100" :step="1"/>
        </a-form-item>
        <template v-if="data?.homework?.template">
            <h3>答题</h3>
            客观题分数：<span style="color:red">{{ data.objective_score }}</span>
            <std-data-entry :data-list="data?.homework?.template??[]" :data-source="data?.answer" />
        </template>
        <footer-tool-bar>
            <a-space>
                <a-button type="primary" @click="save">批阅</a-button>
                <a-button @click="$router.go(-1)">返回</a-button>
            </a-space>
        </footer-tool-bar>
    </a-card>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'
import StdDataEntry from '@/components/StdDataEntry/StdDataEntry'

export default {
    name: 'AssignDetail',
    components: {StdDataEntry, FooterToolBar},
    data() {
        return {
            data: {
                score: null
            },
            server: process.env['VUE_APP_API_UPLOAD_ROOT'],
        }
    },
    created() {
        this.$api.teacher_api.assign.get(this.$route.params.id).then(r => {
            this.data = r
        })
    },
    methods: {
        getFileName(path) {
            // 从15开始找
            const idx = path.lastIndexOf('/')
            return path.substring(idx + 1)
        },
        save() {
            this.$api.teacher_api.assign.save(this.$route.params.id, this.data).then(r => {
                this.$message.success('保存成功')
                this.data = r
            })
        }
    }
}
</script>

<style lang="less" scoped>
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
