<template>
  <div>
    <div class="main_page">
      <div class="image">
        <img class="banner" :src="info[`banner_url`]" alt="" />
      </div>
      <div class="restaurant_details">
        <div class="logo_name">
            <img class="logo_name_image" :src="info[`profile_url`]" alt="">
        </div>
      <div class="restaurant_details_contact">
        <h3 class="name">{{ info[`name`] }}</h3>
        <p>{{ info[`address`] }}, {{ info[`city`] }}</p>
        <p>{{ info[`phone_number`]}}</p>
        <p>{{info[`email`]}}</p>
        <p>{{info[`bio`]}}</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    info: Object,
  },
}
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
  display: grid;
}
.main_page {
  display: grid;
  margin-top: 2vh;
  .image {
    .banner {
      height: 250px;
      width: 100%;
      object-fit: cover;
    }
  }
  .restaurant_details{
    font-size: .8rem;
    text-align: start;
    display: grid;
    justify-items: start;
     .restaurant_details_contact{
    font-size: .8rem;
    text-align: start;
  }
    .logo_name{
        img{
            height: 50px;
            width: 50px;
        }
    }
  }
 
}
</style>
