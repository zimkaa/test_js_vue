<template>
  <div id="app">
    <form @submit.prevent="">
      <input type="text" placeholder="user" v-model="form.user">
      <br>
      <input type="password" placeholder="pass" v-model="form.pass">
      <br>
      <button type="submit" @click="getToken">Log in</button>
      <hr>
      <button type="submit" @click="getTopology">getTopology</button>
    </form>
    <div class="authData">
      <h2> AUTH {{ auth }}</h2>
      <hr>
      <h3>{{ info }}</h3>
      <h3>{{ info2 }}</h3>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import cookies from './cookies';

const instance = axios.create({
  baseURL: 'https://playground.sandbox.fabrique.ai/dev001/mcc/',
  // withCredentials: true,
});

var bodyFormData = new FormData();

export default {
  name: 'App',
  data() {
    return {
      form: {
        user: '',
        pass: '',
      },
      info: '',
      auth: '',
      info2: '',
    }
  },
  mounted() {
    if (cookies.get('mcc')) {
      console.log('cookies exist', cookies.get('mcc'));
      instance.defaults.headers = {'Authorization': cookies.get('mcc').Authorization};
      this.auth = "YES";
    } else {
      console.log('no cookies');
      this.auth = "NO";
    };
  },
  methods: {
    async getToken() {
      console.log('getToken');
      this.auth = "PENDING";
      bodyFormData.append('username', this.form.user);
      bodyFormData.append('password', this.form.pass);

      const res = await instance.post("token", bodyFormData, { "Content-Type": "multipart/form-data" });

      this.auth = "YES";
      cookies.set("mcc", {'Authorization': res.data.token_type + " " + res.data.access_token})
      console.log("set cookies");
      instance.defaults.headers = {'Authorization': res.data.token_type + " " + res.data.access_token};

      console.log('write info2');
      instance.get('api/v3/users/me/').then(response => (this.info2 = response.data.full_name));
    },
    async getTopology() {
      if (this.auth === "YES") {
        try {
          const response = await instance.get("/api/v3/topology_dagrejs");
          console.log(response);
          this.info = response.data
        } catch (error) {
          console.error(error);
        }
      } else {
        this.info = "Please log in";
        console.log("Please log in");
      }
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  width: 400px;
}
</style>
