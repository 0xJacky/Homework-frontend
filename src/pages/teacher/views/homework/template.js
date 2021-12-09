// 单选
const Type = ['单选题', '多选题', '判断题', '填空题', '主观题']
const SingleChoice = {
    type: 0,
    title: '',
    edit: {
        type: 'radio-group',
        key_type: 'int'
    },
    options: {
        1: '',
        2: '',
        3: '',
        4: ''
    },
    ans: '',
}

// 多选
const MultiChoice = {
    type: 1,
    title: '',
    edit: {
        type: 'check-group',
    },
    options: [],
    ans: [],
}

// 对错判断
const TrueOrFalse = {
    type: 2,
    title: '',
    edit: {
        type: 'radio-group',
        key_type: 'int'
    },
    options: {
        0: '错误',
        1: '正确'
    },
    ans: '',
}
// 填空题
const Completion = {
    type: 3,
    title: '',
    edit: {
        type: 'input'
    },
    ans: '',
}

// 主观题
const Subjective = {
    type: 4,
    title: '',
    edit: {
        type: 'textarea'
    },
}

export {Type, SingleChoice, MultiChoice, TrueOrFalse, Completion, Subjective}
