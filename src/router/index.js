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

export default router;
