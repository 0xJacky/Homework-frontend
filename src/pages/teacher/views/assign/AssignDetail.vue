<template>
    <a-card title="提交详情">
        <h3>提交</h3>
        <p>提交人：{{ data?.user?.name }}</p>
        <p>学号：{{ data?.user?.school_id }}</p>
        <h3>批改</h3>
        <a-form-item label="分数">
            <a-input-number v-model="data.score" :min="1" :max="100" :step="1"/>
        </a-form-item>
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

export default {
    name: 'AssignDetail',
    components: {FooterToolBar},
    data() {
        return {
            data: {
                score: null
            }
        }
    },
    created() {
        this.$api.teacher_api.assign.get(this.$route.params.id).then(r => {
            this.data = r
        })
    },
    methods: {
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
