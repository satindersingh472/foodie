<template>
    <div class="main_header" >
        <div class="image">
            <img :src="details[`profile_url`]" :alt="`logo for ${details[`name`]}`"/>
        </div>
        <div class="options">
            <router-link to="/view_menu_rest">View Menu</router-link>
           <router-link to="/add_items">Add Items</router-link> 
            <router-link to="/rest_edit_profile">Edit Account</router-link>
            <delete-restaurant></delete-restaurant>
        </div>
    </div>
</template>

<script>
import DeleteRestaurant from "@/components/deleteRestaurant.vue";
    export default {
  components: { DeleteRestaurant },
        props:{
            details: Object
        },
    }
</script>

<style lang="scss" scoped>
.main_header{
    display: grid;
    grid-auto-flow: column;
    .options{
        display: grid;
        grid-auto-flow: column;
    }
}
.image{
    img{
        height: 75px;
        width: 75px;
    }
}

</style>