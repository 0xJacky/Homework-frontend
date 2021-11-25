import {InstanceRouter} from '@/router'
import teacher from './teacher'
import {UserType} from '@/constant'

const instanceRouter = new InstanceRouter('/teacher', teacher, UserType.Teacher)

export const routes = instanceRouter.routes

const router = instanceRouter.router

export {router}
