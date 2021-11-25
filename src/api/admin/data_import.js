import http from '@/lib/http'

const data_import = {
    parse_student_excel(form, config) {
        return http.post('/admin/data_import/parse_student_excel', form,
            {headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}, ...config})
    },
    import_excel_student(form, config) {
        return http.post('/admin/data_import/import_excel_student', form,
            {headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}, ...config})
    },
    parse_company_excel(form, config) {
        return http.post('/admin/data_import/parse_company_excel', form,
            {headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}, ...config})
    },
    import_excel_company(form, config) {
        return http.post('/admin/data_import/import_excel_company', form,
            {headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}, ...config})
    },
    parse_teacher_excel(form, config) {
        return http.post('/admin/data_import/parse_teacher_excel', form,
            {headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}, ...config})
    },
    import_excel_teacher(form, config) {
        return http.post('/admin/data_import/import_excel_teacher', form,
            {headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}, ...config})
    },
}

export default data_import
