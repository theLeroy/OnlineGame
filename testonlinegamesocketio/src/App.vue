<template>
  <div id="app">
    <h1>Fireside Chat</h1>
  <div id="app">
    <div v-if="state == 0">
      <h3>Welcome! Please choose a username</h3>
      <form @submit.prevent="setUsername">
        <input type="text" placeholder="Username..." v-model:value="username" />
        <input type="submit" value="Join" />
      </form>
      <button @click="continueWithoutUsername">Join as a Guest</button>
    </div>
    <div v-if="state == 1">
      <ul id="chatbox">
        <li v-for="message in messages">
          <b>{{ message.user }}:</b> {{ message.message }}
        </li>
      </ul>
      <form @submit.prevent="sendMessage">
        <input type="text" placeholder="Message..." v-model:value="message" />
        <input type="submit" value="Send" />
      </form>
    </div>
  </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data: {
      messages: [],
      message: '',
      username: '',
      state: 0
    },
    methods: {
      sendMessage: function () {
        socket.emit('message', this.message);
        this.message = '';
      },
      setUsername: function () {
        socket.emit('join', this.username);
        this.username = '';
        this.state = 1;
      },
      continueWithoutUsername: function () {
        socket.emit('join', null);
        this.state = 1;
      }
    },
    created: function () {
      socket = io();
    },
    mounted: function () {
      socket.on('message', function (message) {
        app.messages.push(message);
        // this needs to be done AFTER vue updates the page!!
        app.$nextTick(function () {
          var messageBox = document.getElementById('chatbox');
          messageBox.scrollTop = messageBox.scrollHeight;
        });
      });
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
