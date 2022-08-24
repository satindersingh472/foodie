import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "@/views/homePage.vue";
import SignupPage from "@/views/signupPage";
import LoginSignup from "@/views/loginSignup.vue";
import RestaurantPage from "@/views/restaurantPage.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: `/`,
    component:HomePage
  },
  {
    path: `/signup_page`,
    component: SignupPage
  },
  {
    path:`/login_signup`,
    component: LoginSignup
  },
  {
    path: `/restaurant_page`,
    component: RestaurantPage
  }

]

const router = new VueRouter({
  routes
})

export default router
