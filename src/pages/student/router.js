import {InstanceRouter} from '@/router'
import student from './student'
import {UserType} from '@/constant'

const instanceRouter = new InstanceRouter('/student', student, UserType.Student)

export const routes = instanceRouter.routes

const router = instanceRouter.router

export {router}
