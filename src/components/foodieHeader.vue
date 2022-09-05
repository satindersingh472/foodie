<template>
    <div class="main_page" >
        <!-- foodie header is for the components where navbar should not displayed -->
<h1><router-link class="main_heading" to="/">Foodie</router-link></h1>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
*{
    display: grid;
    padding: 0px;
    margin: 0px;
    place-items: center;
}

.main_heading{
    font-family: Gluten,cursive;
    font-size: 3rem;
    text-decoration: none;
    color: black;
}
</style>