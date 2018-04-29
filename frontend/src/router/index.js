import Vue from 'vue'
import Router from 'vue-router'
import mains from './main'
import members from './member'
import VueSession from 'vue-session'
import board from './board'
import file from './file'
import movie from './movie'

const routers = []

const routerExcute = (router) => {
  for (let i = 0; router.length > i; i += 1) {
    routers.push(router[i])
  }
}

routerExcute(mains)
routerExcute(members)
routerExcute(board)
routerExcute(file)
routerExcute(movie)

Vue.use(Router)
Vue.use(VueSession)

export default new Router({
  mode: 'history',
  routes: routers
})
