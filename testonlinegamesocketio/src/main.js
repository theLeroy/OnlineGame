import Vue from 'vue'
import store from './store'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'

const options = { path: '/my-app/' }; //Options object to pass into SocketIO

Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('localhost:3000', options), //options object is Optional
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
