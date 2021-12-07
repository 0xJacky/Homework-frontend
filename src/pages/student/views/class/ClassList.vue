<template>
    <div class="class-list">
        <a-row :gutter="[16,16]">
            <a-col :xs="12" :sm="12" :md="8">
                <a-card title="数据库周四下午5-8节">
                    <a-avatar icon="user" size="large"/>
                    <div class="info">
                        <p>李菊老师</p>
                        <p>协作老师：李菊、龙梓老师</p>
                    </div>
                </a-card>
            </a-col>
            <a-col :xs="12" :sm="12" :md="8">
                <a-card style="max-height:221px">
                    <a-avatar icon="plus" size="large"/>
                    <div class="info">
                        <p>加入班级</p>
                    </div>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
export default {
    name: 'ClassList'
}
</script>

<style lang="less" scoped>
.class-list {
    /deep/.ant-card-body {
        text-align: center;
        .info {
            padding-top: 15px;
        }
    }
}
</style>
