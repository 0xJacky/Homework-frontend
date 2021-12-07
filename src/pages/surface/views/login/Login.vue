<template>
    <a-row
        align="middle"
        type="flex"
        class="container center"
    >
        <a-col
            :lg="12"
            :md="12"
            :sm="12"
            :xl="8"
            :xs="0"
        >
            <a-card :bordered="false" class="left-card">
                <div class="welcome">
                    <h1>欢迎登录</h1>
                    <h2>Homework</h2>
                </div>
<!--                <div class="footer">Copyright © 2020 - {{ thisYear }} 深圳技术大学</div>-->
            </a-card>
        </a-col>
        <a-col
            :lg="8"
            :md="9"
            :sm="12"
            :xl="8"
            :xs="24"
        >
            <a-card :bordered="false" class="form-card">
                <a-form :form="form" @submit="handleSubmit">
                    <div class="logo">
                        <img :src="logo"/>
                    </div>
                    <p class="title">
                        {{ options.title }}
                    </p>
                    <a-form-item
                        v-for="item in options.items"
                        :key="item.label"
                        :help="errors[item.decorator[0]] ? errors[item.decorator[0]] : null"
                        :label="item.label"
                        :validate-status="errors[item.decorator[0]] ? 'error' :'success'"
                    >
                        <a-input
                            v-decorator="item.decorator"
                            :placeholder="item.placeholder"
                            :type="item.type"
                        >
                            <a-icon slot="prefix" :type="item.icon" style="color: rgba(0,0,0,.25)"/>
                        </a-input>
                    </a-form-item>
                    <div class="action">
                        <div class="center">
                            <a-button
                                :loading="loading"
                                class="std-border-radius"
                                html-type="submit"
                                type="primary"
                            >
                                {{ options.button_text }}
                            </a-button>
                        </div>
                        <div class="small-link center">
                            <slot name="small-link"/>
                        </div>
                    </div>
                </a-form>
            </a-card>
            <vue-particles
                :click-effect="false"
                :hover-effect="false"
                :move-speed="3"
                :particlesNumber="60"
                class="particles"
                color="#dedede"/>
        </a-col>
    </a-row>
</template>

<script>
import Vue from 'vue'
import VueParticles from 'vue-particles'
import './gt'
import {UserType} from '@/constant'

Vue.use(VueParticles)

const options = {
    title: '用户登录',
    button_text: '登录',
    items: [
        {
            label: '用户名',
            placeholder: '请输入学工号或登录名',
            icon: 'user',
            decorator: ['school_id', {
                rules: [{
                    required: true,
                    message: '请输入账号!'
                }]
            }]
        },
        {
            label: '密码',
            placeholder: '请输入',
            icon: 'key',
            type: 'password',
            decorator: ['password', {
                rules: [{
                    required: true,
                    message: '请输入密码!'
                }]
            }]
        },
    ]
}

export default {
    name: 'Login',
    props: {
        redirect: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            loading: false,
            logo: require('@/assets/img/logo.png'),
            thisYear: new Date().getFullYear(),
            options,
            errors: {
                school_id: null,
                password: null
            },
            form: this.$form.createForm(this),
            ok: false,
            captchaObj: null,
            data: {},
            debug: process.env.NODE_ENV !== 'production'
        }
    },
    created() {
        if (this.$store.state.user.token) {
            this.jump()
        } else {
            this.form = this.$form.createForm(this)
            const that = this
            this.$api.authorization.geetest_first_register().then(r => {
                window.initGeetest({
                    ...r,
                    product: 'bind',
                }, (captchaObj) => {
                    captchaObj.onReady(function () {
                        // 验证码ready之后才能调用verify方法显示验证码
                    }).onSuccess(function () {
                        that.login()
                    }).onError(function () {

                    })
                    this.captchaObj = captchaObj
                })
            })
        }
    },
    methods: {
        jump() {
            switch (this.$store.state.user.power) {
                case UserType.Student:
                    window.location = '/student/dashboard'
                    break
                case UserType.Teacher:
                    window.location = '/teacher/dashboard'
                    break
            }
        },
        async login() {
            let captcha = {}
            if (!this.debug) {
                captcha = await this.captchaObj.getValidate()
            }
            this.$api.authorization.login(this.data.school_id, this.data.password, captcha)
                .then(async () => {
                    await this.$api.user.info()
                    // 防止手速过快重复登录
                    this.ok = true
                    this.errors = {}
                    await this.$message.success('登录成功', 1)
                    this.jump()
                })
                .catch(r => {
                    this.$message.error(r.message)
                    this.errors = {...r.errors}
                    this.captchaObj.reset()
                    this.loading = false
                    if (r.code === 4032) {
                        this.debug = false
                        this.captchaObj.verify()
                    }
                })
        },
        handleSubmit: async function (e) {
            e.preventDefault()
            this.loading = true
            this.form.validateFields(async (err, data) => {
                // 防止手速过快重复登录
                if (!err && !this.ok) {
                    this.data = data
                    if (this.debug) {
                        await this.login()
                        return
                    }
                    if (!this.captchaObj.getValidate()) {
                        this.captchaObj.verify()
                        this.loading = false
                        return
                    }
                }
                this.loading = false
            })
        }
    }
}
</script>

<style lang="less">
.left-card {
    .ant-card-body {
        height: 360px;
        position: relative;
    }

}


.form-card {
    .ant-form-item {
        input {
            border-radius: 20px;
        }
    }

    @media (prefers-color-scheme: dark) {
        .anticon {
            color: #a8a5a5 !important;
        }
    }
}

#captcha {
    margin-bottom: 20px;
    min-height: 45px;
    line-height: 45px;

    .geetest_holder.geetest_wind {
        min-width: 250px !important;
    }
}
</style>

<style lang="less" scoped>
.particles {
    position: fixed;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #f5f5f5;
    @media (prefers-color-scheme: dark) {
        background-color: #1e1f20;
    }

    .ant-card, .left-card {
        width: 100%;
        border-radius: 10px;
        box-shadow: 0 0 30px rgba(200, 200, 200, 0.25);
    }

    .form-card {
        transform: translateX(-5%);
        max-width: 360px;
        box-shadow: 0 0 30px rgba(200, 200, 200, 0.25);

        .ant-form {
            max-width: 250px;
            margin: 0 auto;

            .title {
                text-align: center;
                font-size: 17px;
                margin: 10px 0;
            }
        }

        .logo {
            display: grid;
            padding: 10px;

            img {
                height: 80px;
                margin: 0 auto;
            }
        }

        .action {
            .small-link {
                font-size: 13px;
                padding: 15px 0 0 0;
            }
        }

        @media (max-width: 575px) {
            transform: translateX(0);
            margin: 0 auto;
            max-width: 320px;
        }
        @media (max-width: 320px) {
            border-radius: 0;
        }
    }

    .left-card {
        transform: translateX(5%);
        @media (max-width: 575px) {
            display: none;
        }

        .footer {
            position: absolute;
            bottom: -30px;
            font-size: 13px;
            @media (max-width: 680px) {
                display: none;
            }
        }

        .welcome {
            display: inline-table;
            margin: 0 auto;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-40%, -50%);
            width: 300px;

            h1, h2 {
                font-weight: 300;
                text-align: center;
            }
        }
    }
}
</style>
