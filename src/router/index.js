import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/views/homePage.vue";
import ClientSignUp from "@/views/clientSignUp.vue";
import RestaurantSignUp from "@/views/restaurantSignUp.vue";
import ProfilePage from "@/views/profilePage.vue";
import ClientLogin from "@/views/clientLogin.vue";
import RestaurantLogin from "@/views/restaurantLogin.vue";
import RestaurantProfile from "@/views/restaurantProfile.vue";
import DiscoverRestaurants from "@/views/discoverRestaurants.vue";
import ViewMenu from "@/views/viewMenu.vue";
import ViewMenuRest from "@/views/viewMenuRest.vue";
import AddItems from "@/views/addItems.vue";
import ClientCart from "@/views/clientCart.vue";
import AllOrders from "@/views/allOrders.vue";
import OrdersConfirmed from "@/views/ordersConfirmed.vue";
import OrdersComplete from "@/views/ordersComplete.vue"
import OrdersNotConfirmed from "@/views/ordersNotConfirmed.vue";
import OrdersNotComplete from "@/views/ordersNotComplete.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: `/`,
    component: HomePage,
    meta:[{
      title: `Foodie`
    },{
      name: `description`,
      content: `Home_page for the foodie website`
    },{},{}]
  },
  {
    path: `/client_sign_up`,
    component: ClientSignUp,
  },
  {
    path: `/restaurant_sign_up`,
    component: RestaurantSignUp,
  },
  {
    path: `/profile_page`,
    component: ProfilePage,
  },
  {
    path: `/client_login`,
    component: ClientLogin,
  },
  {
    path: `/restaurant_login`,
    component: RestaurantLogin,
  },
  {
    path: `/restaurant_profile`,
    component: RestaurantProfile,
  },
  {
    path: `/discover_restaurants`,
    component: DiscoverRestaurants,
  },
  {
    path: `/view_menu`,
    component: ViewMenu,
  },
  {
    path: `/view_menu_rest`,
    component: ViewMenuRest
  },
  {
    path: `/add_items`,
    component: AddItems,
  },
  {
    path: `/client_cart`,
    component: ClientCart
  },
  {
    path: `/all_orders`,
    component: AllOrders
  },
  {
    path: `/orders_confirmed`,
    component: OrdersConfirmed
  },
  {
    path:`/orders_complete`,
    component: OrdersComplete
  },
  {
    path: `/orders_not_confirmed`,
    component: OrdersNotConfirmed
  },
  {
    path: `/orders_not_complete`,
    component: OrdersNotComplete
  }
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to,from,next)=>{
  let current_meta_tags = document.querySelectorAll(`meta`);
  for(let i=0; i< current_meta_tags.length;i++){
   current_meta_tags[i].remove();
  }
  let new_meta_tags = to[`meta`];
  document.querySelector(`title`)[`innerText`] = new_meta_tags[0][`title`];
 
  for (let i = 1; i<new_meta_tags.length; i++){
   document.querySelector(`head`).insertAdjacentHTML(`beforeEnd`,
   `<meta name="${new_meta_tags[i][`name`]}" content="${new_meta_tags[i][`content`]}"/>`);
  }
 document.querySelector(`head`).insertAdjacentHTML(`afterbegin`,
 `<meta charset="utf-8">
 <meta http-equiv="X-UA-Compatible" content="IE=edge">
 <meta name="viewport" content="width=device-width,initial-scale=1.0">`);
 
   from;
   next();
 });
 
export default router;
