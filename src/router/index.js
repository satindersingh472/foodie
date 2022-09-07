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
import OrdersComplete from "@/views/ordersComplete.vue";
import OrdersNotConfirmed from "@/views/ordersNotConfirmed.vue";
import OrdersNotComplete from "@/views/ordersNotComplete.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: `/`,
    component: HomePage,
    meta: [
      {
        title: `Foodie`,
      },
      {
        name: `description`,
        content: `Home_page for the foodie website`,
      },
      {
        name: `keywords`,
        content: `foodie, order_online, quick_order, reliable, customer_service,`,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
  {
    path: `/client_sign_up`,
    component: ClientSignUp,
    meta: [
      {
        title: `Sign_Up for client`,
      },
      {
        name: `description`,
        content: `Easiest way to sign up as a client on foodie`,
      },
      {
        name: `keywords`,
        content: `Signup, order_quickly, reliable, customer_support `,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
  {
    path: `/restaurant_sign_up`,
    component: RestaurantSignUp,
    meta: [
      {
        title: `Signup as a Restaurant`,
      },
      {
        name: `description`,
        content: `Easiest way to signup as a Restaurant on foodie`,
      },
      {
        name: `keywords`,
        content: `Signup, market_reach, customers_trust, support_24*7, easy_to_use, fast`,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
  {
    path: `/profile_page`,
    component: ProfilePage,
    meta: [
      {
        title: `client_profile`,
      },
      {
        name: `description`,
        content: `Profile page for client to access and change the information on the profile`,
      },
      {
        name: `keywords`,
        content: `profile_client_foodie, change_info_easily, how_to_change_profile, change_profile_image, change_email, change_username, change_password`,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
  {
    path: `/client_login`,
    component: ClientLogin,
    meta: [
      {
        title: `client_login`,
      },
      {
        name: `description`,
        content: `clients can easily login from client_login page quickly`,
      },
      {
        name: `keywords`,
        content: `clients_login_foodie,easy_access,secure, fast,reliable, login_foodie `,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
  {
    path: `/restaurant_login`,
    component: RestaurantLogin,
    meta: [
      {
        title: `restaurant_login`,
      },
      {
        name: `description`,
        content: `restaurant owner or management can easily login to the restaurant account and can change profile, add or delete menu items and view orders`,
      },
      {
        name: `keywords`,
        content: `restaurant_login_foodie, secure, easy_to_use, support 24*7, data_store`,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
  {
    path: `/restaurant_profile`,
    component: RestaurantProfile,
    meta: [
      {
        title: `Restaurant_profile`,
      },
      {
        name: `description`,
        content: `Restaurant profile can be accessed through the restaurant profile page,it is easy to access and modify the profile from the restaurant profile page`,
      },
      {
        name: `keywords`,
        content: `foodie,restaurants,clients,login,secure,support24*7,reliable,quick,easy_to_use`,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
  {
    path: `/discover_restaurants`,
    component: DiscoverRestaurants,
    meta: [
      {
        title: `Discover_Restaurants`,
      },
      {
        name: `description`,
        content: `clients are able to see different restaurants available on discover restaurants page`,
      },
      {
        name: `keywords`,
        content: `foodie, restaurants,clients, nearby_restaurants, fresh_food, accessible, quick`,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
  {
    path: `/view_menu`,
    component: ViewMenu,
    meta: [
      {
        title: `View_menu`,
      },
      {
        name: `description`,
        content: `Clients can see the menu of a restaurant after login. the menu page contains all the information about the restaurant and its menu`,
      },
      {
        name: `keywords`,
        content: `foodie, options, menus, restaurants, variety, nearby_restaurants, order`,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
  {
    path: `/view_menu_rest`,
    component: ViewMenuRest,
    meta: [
      {
        title: `view_restaurant_menu`,
      },
      {
        name: `description`,
        content: `Restaurants can view, change or delete the menu item from  menu page`,
      },
      {
        name: `keywords`,
        content: `foodie,restaurants,view_menu_restaurant,easy_to_change, edit, delete, quick, reliable`,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
  {
    path: `/add_items`,
    component: AddItems,
    meta: [
      {
        title: `Add_items_restaurant`,
      },
      {
        name: `description`,
        content: `Restaurants can add new items to their menu at anytime through the add items page`,
      },
      {
        name: `keywords`,
        content: `foodie, add_items, menu, edit, new_menu, image,price,description,title`,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
  {
    path: `/client_cart`,
    component: ClientCart,
    meta: [
      {
        title: `cart_foodie`,
      },
      {
        name: `description`,
        content: `clients can see the items added in cart and remove items from it as well`,
      },
      {
        name: `keywords`,
        content: `foodie,cart,items,remove,place_order,quick, order_id`,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
  {
    path: `/all_orders`,
    component: AllOrders,
    meta: [
      {
        title: `all_orders`,
      },
      {
        name: `description`,
        content: `All orders can be seen on all orders page. it gathers all the orders either confirmed or not and completed or not`,
      },
      {
        name: `keywords`,
        content: `foodie, orders, confirmed, completed, not_confirmed, not_completed`,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
  {
    path: `/orders_confirmed`,
    component: OrdersConfirmed,
    meta: [
      {
        title: `confirmed_orders`,
      },
      {
        name: `description`,
        content: `confirmed orders can be filtered and seen with the help of confirmed orders.Restaurants and clients can now see their confirmed orders`,
      },
      {
        name: `keywords`,
        content: `foodie, orders, confirmed_orders,easy_to_filter,group_orders`,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
  {
    path: `/orders_complete`,
    component: OrdersComplete,
    meta: [
      {
        title: `completed_orders`,
      },
      {
        name: `description`,
        content: `completed orders can now be seen on completed orders page. Restaurants and clients can see their completed orders anytime`,
      },
      {
        name: `keywords`,
        content: `foodie,completed_orders,filter,easy_to_access,differentiate_orders `,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
  {
    path: `/orders_not_confirmed`,
    component: OrdersNotConfirmed,
    meta: [
      {
        title: `Not_confirmed_orders`,
      },
      {
        name: `description`,
        content: `Restaurants and clients can see the not confirmed orders on the not confirmed orders page. it gets easier to filter between not confirmed orders and other orders`,
      },
      {
        name: `keywords`,
        content: `foodie, orders, not_confirmed_orders, filtered_orders,customer_Service, support24*7 `,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
  {
    path: `/orders_not_complete`,
    component: OrdersNotComplete,
    meta: [
      {
        title: `Not_completed_orders`,
      },
      {
        name: `description`,
        content: `restaurants can see not completed orders on the not completed orders page.it gets easy to differentiate between other orders and not completed orders`,
      },
      {
        name: `keywords`,
        content: `foodie, not_comlete_orders, filter, orders, restaurants, clients, quick, customer_service`,
      },
      {
        name: `author`,
        content: `satinder_singh`,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  let current_meta_tags = document.querySelectorAll(`meta`);
  for (let i = 0; i < current_meta_tags.length; i++) {
    current_meta_tags[i].remove();
  }
  let new_meta_tags = to[`meta`];
  document.querySelector(`title`)[`innerText`] = new_meta_tags[0][`title`];

  for (let i = 1; i < new_meta_tags.length; i++) {
    document
      .querySelector(`head`)
      .insertAdjacentHTML(
        `beforeEnd`,
        `<meta name="${new_meta_tags[i][`name`]}" content="${
          new_meta_tags[i][`content`]
        }"/>`
      );
  }
  document.querySelector(`head`).insertAdjacentHTML(
    `afterbegin`,
    `<meta charset="utf-8">
 <meta http-equiv="X-UA-Compatible" content="IE=edge">
 <meta name="viewport" content="width=device-width,initial-scale=1.0">`
  );

  from;
  next();
});

export default router;
