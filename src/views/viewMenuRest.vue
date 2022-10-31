<template>
  <div>
    <!-- if there is any error loading the page then the message will be shown -->
    <page-header></page-header>
    <div v-if="message !== undefined">{{ message }}</div>
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
            <h3>{{ detail[`name`] }}</h3>
            <p>${{ detail[`price`] }}</p>
          </div>
          <div class="description">
            <p>{{ detail[`description`] }}</p>
          </div>
          <div class="buttons">
            <!-- delete menu will delete the menu item and will listen for the event -->
            <delete-menu @recieve_delete_response="get_details" :detail="detail"></delete-menu>
          </div>
        </div>
        <div class="edit_comp">
          <!-- edit menu will edit the menu for restaurant and also listen for the recieve response 
            event to change the items on the screen -->
            <edit-menu
            @recieve_response="get_details"
              :detail="detail"
            ></edit-menu>
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
get_details(){
    this.get_menu()
},
    get_menu() {
      this.info = cookies.get(`restaurant_id`)
      axios
        .request({
          /*api endpoint for calling the api */
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/menu`,
        
          params: {
            restaurant_id: this.info,
          },
        })
        .then((response) => {
          this.details = response[`data`]
        })
        .catch((error) => {
            /*if there is an error then the following message will be shown */
            this.message = error['response']['data']
        })
    },
  },
  data() {
    return {
      info: undefined,
      details: undefined,
      message: undefined,
      message_edit: undefined
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
.button{
  font-size: 1.3rem
}
.all_items {
  display: grid;
  .content_item {
    display: grid;
    grid-template-columns: column;
    gap: 1vh;
    padding:10px;
    text-align: center;
    margin-top: 1vh;
    box-shadow: 3px 3px 6px grey;
    .content_item_image {
      height: 150px;
      object-fit: cover;
    }
    .content_item_options {
      display: grid;
      .content_item_details, .description {
        display: grid;
        text-align: start;
        text-transform: capitalize;
        .edit_comp{
          display: grid;
          place-items:center;
        }
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
