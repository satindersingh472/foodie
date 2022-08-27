<template>
    <div class="main_header" >
        <div class="image">
            <img :src="details[`profile_url`]" :alt="`logo for ${details[`name`]}`"/>
        </div>
        <div class="options">
            <router-link to="/view_menu">View Menu</router-link>
           <router-link to="/add_items">Add Items</router-link> 
            <router-link to="/rest_edit_profile">Edit Account</router-link>
            <p>Delete Account</p>
        </div>
    </div>
</template>

<script>
    export default {
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