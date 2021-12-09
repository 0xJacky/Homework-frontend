<template>
    <div>

        <h3>试题编辑</h3>
        <std-data-entry-builder v-model="template"/>
        <a-space>
            <a-button @click="addSingleChoice">添加单选题</a-button>
            <a-button @click="addMultiChoice">添加多选题</a-button>
            <a-button @click="addTrueOrFalse">添加判断题</a-button>
            <a-button @click="addCompletion">添加填空题</a-button>
            <a-button @click="addSubjective">添加主观题</a-button>
        </a-space>


    </div>
</template>

<script>
import {
    SingleChoice,
    MultiChoice,
    TrueOrFalse,
    Completion,
    Subjective
} from './template'

import StdDataEntryBuilder from '@/pages/teacher/views/homework/StdDataEntryBuilder'

export default {
    name: 'BuildHomeworkTemplate',
    components: {StdDataEntryBuilder},
    props: {
        profiles: Array
    },
    data() {
        return {
            data: {},
            template: [],
        }
    },
    model: {
        prop: 'profiles',
        event: 'changeProfiles'
    },
    watch: {
        profiles() {
            this.template = this.profiles ?? []
        },
        template() {
            this.$nextTick(() => {
                this.$emit('changeProfiles', this.template)
            })
        }
    },
    created() {
        this.template = this.profiles ?? []
    },
    methods: {
        addSingleChoice() {
            this.template.push({...SingleChoice})
        },
        addMultiChoice() {
            this.template.push({...MultiChoice})
        },
        addTrueOrFalse() {
            this.template.push({...TrueOrFalse})
        },
        addCompletion() {
            this.template.push({...Completion})
        },
        addSubjective() {
            this.template.push({...Subjective})
        }
    }
}
</script>

<style scoped>

</style>
