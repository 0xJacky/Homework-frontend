<template>
    <a-card title="班级列表" class="class-list">
        <a-row :gutter="[16,16]">
            <a-col :xs="12" :sm="12" :md="8" :lg="8" :xl="6" :xxl="4">
                <a @click="$router.push('class/'+1)">
                    <a-card title="数据库周四下午5-8节">
                        <div class="class_content">
                            <a-avatar icon="user" size="large"/>
                            <div class="info">
                                <p>李菊老师</p>
                                <p>协作老师：李菊、龙梓老师</p>
                            </div>
                        </div>
                    </a-card>
                </a>

            </a-col>

            <a-col :xs="12" :sm="12" :md="8" :lg="8" :xl="6" :xxl="4">
                <a @click="visible=true">
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
        >
            <a-form-item label="请输入班级ID">
                <a-input-search enter-button/>
            </a-form-item>
            <p>找到以下班级信息</p>
            <a-divider/>
            <div class="search-class">
                <div class="info">
                    <p>数据库</p>
                    <p>创建人：李菊老师</p>
                    <p>协作老师：李菊、龙梓老师</p>
                </div>
                <div class="join">
                    <a-button type="primary">加入</a-button>
                </div>
                <div class="clear"></div>
            </div>
            <a-empty/>
        </a-modal>
    </a-card>
</template>

<script>
export default {
    name: 'ClassList',
    data() {
        return {
            visible: false
        }
    },
    methods: {
        ok() {

        }
    }
}
</script>

<style lang="less" scoped>
.class-list {
    .ant-card {
        height: 223px;
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
        padding-top: 45px;
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
