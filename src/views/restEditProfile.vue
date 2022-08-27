<template>
  <div>
    <h2>Edit the profile of your Restaurant</h2>
<div class="form">
    <div class="content_item">
        <p>Current Name: {{current_details[`name`]}}</p>
        <h4>New Name:<input type="text" ref="name"></h4>
    </div>
    <div class="content_item">
        <p></p>
    </div>
    <div class="content_item">

    </div>
</div>

  </div>
</template>

<script>
import cookies from "vue-cookies";
export default {
    mounted () {
        this.current_details = cookies.get(`details`);
    },
data() {
    return {
        current_details: undefined
    }
},
};
</script>

<style lang="scss" scoped></style>
