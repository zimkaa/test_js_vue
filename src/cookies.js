import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.$cookies.config('7d')

// Vue.$cookies.set('mcc','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZXYwMDEiLCJleHAiOjE2MzE4NzYwNjh9.RTQB8acQyL1OvmGYPvHzYQv5A0TjMSIK1gOez_jdFMI');

export default Vue.$cookies
