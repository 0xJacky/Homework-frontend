<template>
    <a-card title="班级列表" class="class-list">
        <a-row :gutter="[16,16]">
            <a-col :xs="12" :sm="12" :md="8" :lg="8" :xl="6" :xxl="4" :key="c.id" v-for="c in classes">
                <a @click="$router.push('class/'+c.id)">
                    <a-card :title="c.name">
                        <div class="class_content">
                            <a-avatar icon="user" size="large"/>
                            <div class="info">
                                <p>{{ c.user?.name }}</p>
                            </div>
                        </div>
                    </a-card>
                </a>

            </a-col>

            <a-col :xs="12" :sm="12" :md="8" :lg="8" :xl="6" :xxl="4">
                <a @click="joinClass">
                    <a-card class="join">
                        <div class="class_content">
                            <a-avatar icon="plus" size="large"/>
                            <div class="info">
                                <p>加入班级</p>
                            </div>
                        </div>
                    </a-card>
                </a>
            </a-col>
        </a-row>
        <a-modal
            :mask="false"
            title="加入班级"
            :visible="visible"
            @cancel="visible=false"
            :footer="null"
            destroyOnClose
        >
            <a-form-item label="请输入班级ID">
                <a-input-search enter-button @search="onSearch"/>
            </a-form-item>
            <div class="search-class" v-if="search.code === 200">
                <div class="info">
                    <p>ID: {{ search?.data.id }}</p>
                    <p>班级名称: {{ search?.data?.name }}</p>
                    <p>创建人: {{ search?.data?.user?.name }}老师</p>
                </div>
                <div class="join">
                    <a-button v-if="search?.join" disabled>已加入</a-button>
                    <a-button type="primary" @click="ok" v-else>加入</a-button>
                </div>
                <div class="clear"></div>
            </div>
            <a-empty v-else/>
        </a-modal>
    </a-card>
</template>

<script>
export default {
    name: 'ClassList',
    data() {
        return {
            visible: false,
            classes: [],
            search: {}
        }
    },
    created() {
        this.get_list()
    },
    methods: {
        get_list() {
            this.$api.student_api._class.get_list().then(r => {
                this.classes = r.data
            })
        },
        joinClass() {
            this.visible = true
            this.search = {}
        },
        onSearch(id) {
            this.search = {}
            this.$nextTick(() => {
                this.$api.student_api._class.get(id).then(r => {
                    this.search = r
                })
            })
        },
        ok() {
            this.$api.student_api._class.join(this.search.data.id).then(() => {
                this.visible = false
                this.$message.success('加入成功')
                this.get_list()
            })
        }
    }
}
</script>

<style lang="less" scoped>
.class-list {
    .ant-card {
        height: 191px;
    }

    .class_content {
        text-align: center;

        .info {
            padding-top: 15px;
        }
    }

    .ant-card-bordered {
        border: 1px solid #e8e8e8;
        box-shadow: unset;
    }

    .join {
        padding-top: 30px;
    }
}

.search-class {
    position: relative;

    .info {
        float: left;
    }

    .join {
        float: right;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
    }
}
</style>
