<template>
  <div>
    <page-header></page-header>
    <!-- content item div will display each restaurant available to the client -->
    <!-- each div can trigger send detail method and send detail with it -->
    <!-- after it send detail to the method the method will use that detail and set cookies restaurant number -->
    <!-- restaurant number will be used in menu api to be send as restaurant id
    to open menu associated with that restaurant -->
    <h2 v-if="message !== undefined">{{ message }}</h2>
    <div class="views">
      <div
        @click="send_detail(detail, $event)"
        class="content_item"
        v-for="detail in details"
        :key="detail[`id`]"
      >
        <div class="content_item_image">
          <img
            :src="detail[`banner_url`]"
            :alt="`image for ${detail[`name`]}`"
          />
        </div>
        <div class="all_content">
          <div class="profile_logo">
            <img
              class="logo_rest"
              :src="detail[`profile_url`]"
              :alt="`logo for ${detail[`name`]}`"
            />
          </div>
          <h1>{{ detail[`name`] }}</h1>
          <div class="content_item_detail">
            <p>
              {{ detail[`address`] }}
              <br />
              {{ detail[`city`] }}
            </p>
            <div>
              <p>{{ detail[`phone_number`] }}</p>
              <p>{{ detail[`email`] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/pageHeader.vue'
import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  components: {
    PageHeader,
  },
  methods: {
    // send detail will set cookies restaurant number and route the user to the view menu page
    send_detail(detail) {
      cookies.set(`restaurant_selected`, detail)
      this.$router.push(`/view_menu`)
    },
  },
  mounted() {
    axios
      .request({
        // endpoint for discovering all the restaurants available
        url: `https://innotechfoodie.ml/api/restaurants`,
        headers: {
          // api key is used as a headers
          'x-api-key': 'TVTZDiQZDzjkWqVkNCxr',
        },
      })
      .then((response) => {
        // if response is successfull then details array will have data from the response
        this.details = response[`data`]
      })
      .catch((error) => {
        if (error) {
          this.message = `There is an error in retrieving Restaurants`
        }
      })
  },
  data() {
    return {
      details: undefined,
      message: undefined,
    }
  },
}
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
}
.content_item {
  display: grid;
  gap: 10px;
  margin-top: 15px;
  box-shadow: 3px 3px 6px grey;
  text-align: center;
  background-color: antiquewhite;
  .profile_logo {
    display: grid;
    place-items: center;
    .logo_rest {
      height: 75px;
      width: 75px;
    }
  }
  .content_item_image {
    width: 100%;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content_item_detail {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    justify-items: center;
  }
}

@media only screen and (min-width: 500px) {
  .views {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(auto-fit, minmax(700px, 1fr));
    gap: 20px;
    .content_item {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
