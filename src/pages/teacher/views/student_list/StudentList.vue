<template>
    <div>
        <student-list
            :api="api"
            :evaluate_api="evaluate_api"
            :columns="columns"
        >
            <template v-slot:actions="slotProps">
                <a-divider type="vertical"/>
                <a @click="$router.push({
                    path: '/overall_evaluate',
                    query: {
                        student_id: slotProps.actions.id
                    }
                })">综合评价</a>
            </template>
        </student-list>
    </div>
</template>

<script>
import columns from '@/pages/teacher/views/student_list/columns'
import StudentList from '@/components/StudentList/StudentList'

export default {
    name: 'TeacherStudentListView',
    components: {
        StudentList

    },
    data() {
        return {
            columns,
            api: this.$api.teacher_api.student,
            evaluate_api: this.$api.teacher_api.evaluate
        }
    },
    created() {

    },
    methods: {},
}
</script>

<style lang="less" scoped>
.save-btn {
    float: right;
    margin: 10px 0;
}

</style>
