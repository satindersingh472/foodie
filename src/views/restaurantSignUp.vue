<template>
    <div class="main_signup" >
<foodie-header></foodie-header>
<div class="form">
<div class="content_item">
    <p>Restaurant Name</p>
    <input type="text" placeholder="Name of the Restaurant">
</div>
<div class="content_item">
    <p>Addess</p>
    <input type="image" src="" alt="">
</div>
</div>
    </div>
</template>

<script>
import foodieHeader from '@/components/foodieHeader.vue'
    export default {
  components: { foodieHeader },
        
    }
</script>

<style scoped>
*{
    padding: 0px;
    margin: 0px;
}

</style>