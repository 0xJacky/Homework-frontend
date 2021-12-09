<template>
    <div>
        总分: {{ total }}<br/>
        客观题总分: {{ obj_total }}
        <a-list :data-source="profiles" v-if="profiles" item-layout="horizontal">
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a slot="actions" @click="edit_module(index)">编辑</a>
                <a slot="actions" @click="removeItem(profiles, index)">删除</a>
                <a-list-item-meta>
                    <template slot="title">
                        {{ item.title }}
                        <br/>
                        类型：{{ options[item.type] }}
                        <br/>
                        分值：{{ item.score }}
                        <br/>
                    </template>
                </a-list-item-meta>
            </a-list-item>
        </a-list>

        <a-modal
            :mask="false"
            :title="index >= 0 ? '编辑模块' : '添加模块'"
            :visible="visible"
            cancel-text="取消"
            ok-text="保存"
            @cancel="visible=false"
            @ok="ok"
        >
            <a-form-item label="题目">
                <a-input v-model="profile.title"/>
            </a-form-item>

            <a-form-item label="分值">
                <a-input v-model="profile.score"/>
            </a-form-item>

            <template v-if="profile.type===0">
                <a-form-item :label="'选项'+i" v-for="i in [1,2,3,4]" :key="i">
                    <a-input v-model="profile.options[i]"/>
                </a-form-item>
            </template>
            <template v-if="profile.type===1">
                <a-form-item label="选项以半角逗号分隔">
                    <a-input v-model="profile.options_temp"/>
                </a-form-item>
            </template>
        </a-modal>
    </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid'
import {Type} from './template'

const options = Type

export default {
    name: 'StdDataEntryBuilder',
    components: {},
    props: {
        profiles: Array
    },
    model: {
        prop: 'profiles',
        event: 'changeProfiles'
    },
    data() {
        return {
            Type,
            visible: false,
            index: -1,
            options,
            profile: {
                edit: {
                    type: 'input',
                },
                options: {},
                options_temp: '',
                ans_temp: ''
            },
        }
    },
    created() {

    },
    methods: {
        ok() {
            if (this.index < 0) {
                this.profiles.push({...this.profile})
            }
            this.visible = false
            if (this.profile.type === 1) {
                this.profile.options = this.profile.options_temp.split(',')
            }
            this.profile.dataIndex = this.index
            this.$nextTick(() => {
                this.$emit('changeProfiles', this.profiles)
            })
        },
        edit_module(index = -1) {
            if (index >= 0) {
                this.profile = this.profiles[index]
            } else {
                this.profile = {
                    dataIndex: uuidv4(),
                    edit: {
                        type: 'checkbox'
                    }
                }
            }
            this.index = index
            this.visible = true
        },
        removeItem(array, index) {
            return array.splice(index, 1)
        },
    },
    computed: {
        total: {
            get() {
                let total = 0
                this.profiles.forEach(v => {
                    total += parseInt(v.score??0)
                })
                return total
            }
        },
        obj_total: {
            get() {
                let total = 0
                this.profiles.forEach(v => {
                    if (v.type !== 4)
                        total += parseInt(v.score??0)
                })
                return total
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>
