<template>
<!-- restaurant profile header is used as a header of profile form  -->
<!-- it has several router links and components -->
    <div class="main_header" >
        <div class="image">
            <!-- there is also a profile image displayed inside this component -->
            <img :src="details[`profile_url`]" :alt="`logo for ${details[`name`]}`"/>
        </div>
        <div class="options">
         
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