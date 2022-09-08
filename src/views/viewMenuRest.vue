<template>
  <div>
    <!-- if there is any error loading the page then the message will be shown -->
    <div v-if="message !== undefined">{{ message }}</div>
    <page-header></page-header>
    <div class="all_items" v-if="info !== undefined">
      <!-- content item div loop through details and get one detail displayed each time -->
      <div class="content_item" v-for="detail in details" :key="detail[`id`]">
        <img
          class="content_item_image"
          :src="detail[`image_url`]"
          :alt="`image of ${detail[`name`]}`"
        />
        <div class="content_item_options">
          <div class="content_item_details">
            <p>{{ detail[`name`] }}</p>
            <p>${{ detail[`price`] }}</p>
          </div>
          <div class="description">
            <p>{{ detail[`description`] }}</p>
          </div>
          <div class="buttons">
            <!-- edit menu will edit the menu for restaurant and also listen for the recieve response 
            event to change the items on the screen -->
            <edit-menu
            @recieve_response="get_details"
              :detail="detail"
            ></edit-menu>
            <!-- delete menu will delete the menu item  -->
            <delete-menu :detail="detail"></delete-menu>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import EditMenu from '@/components/editMenu.vue'
import DeleteMenu from '@/components/deleteMenu.vue'
import PageHeader from '@/components/pageHeader.vue'
export default {
  components: {
    EditMenu,
    PageHeader,
    DeleteMenu,
  },
  mounted() {
    /*on mounted get menu will called and which will further call the api */
    this.get_menu();
  },
  methods: {
    /*get details will change the menu on the main menu screen after editing the item */
get_details(response){
  if(response){
    this.get_menu()
  }
},

    get_menu() {
      this.info = cookies.get(`restaurant_id`)
      axios
        .request({
          /*api endpoint for calling the api */
          url: `https://innotechfoodie.ml/api/menu`,
          headers: {
            'x-api-key': 'TVTZDiQZDzjkWqVkNCxr',
          },
          params: {
            restaurant_id: this.info,
          },
        })
        .then((response) => {
          this.details = response[`data`]
          /* if response is successfull then details will the data array from response 
          and response gives back the price of an item in decimals so the below loop
          will help convert that price to two decimal positions */
          for (let i = 0; i < response[`data`].length; i++) {
            this.details[i][`price`] = response[`data`][i][`price`].toFixed(2)
          }
        })
        .catch((error) => {
          if (error) {
            /*if there is an error then the following message will be shown */
            this.message = `Error while Loading page`
          }
        })
    },
  },
  data() {
    return {
      info: undefined,
      details: undefined,
      message: undefined,
    }
  },
}
</script>

<style lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px;
}
img {
  width: 100%;
  height: 250px;
}
.all_items {
  display: grid;
  .content_item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    margin-top: 1vh;
    box-shadow: 3px 3px 6px grey;
    .content_item_image {
      height: 150px;
      object-fit: cover;
    }
    .content_item_options {
      display: grid;
      place-items: center;
      .content_item_details {
        display: grid;
        text-align: start;
      }
      .buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}
@media only screen and (min-width: 500px) {
  .all_items {
    place-items: center;
    grid-template-columns: repeat(auto-fit, minmax(410px, 2fr));
    .content_item {
      width: 400px;
    }
  }
}
</style>
