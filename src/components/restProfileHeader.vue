<template>
    <div class="main_header" >
        <div class="image">
            <img :src="details[`profile_url`]" :alt="`logo for ${details[`name`]}`"/>
        </div>
        <div class="options">
            <router-link to="/rest_menu_profile">View Menu</router-link>
            <p>Add items</p>
            <p>Edit Account</p>
            <p>Delete Account</p>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            details: Object
        }
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