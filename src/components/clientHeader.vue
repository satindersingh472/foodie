<template> 
<!-- client header component contains the mobile and desktop navigation bars -->
  <div class="navbar">
    <!-- various links from the client header to navigate to different pages and logout as well  -->
    <div v-if="desktop_view === false" class="navbar_mobile">
        <mobile-links></mobile-links>
    </div>
    <div v-if="desktop_view === true" class="navbar_desktop">
     <desktop-links></desktop-links>      
    </div>
  </div>
</template>

<script>
import DesktopLinks from "@/components/desktopLinks.vue";
import MobileLinks from "@/components/mobileLinks.vue";
export default {
  components: {
    DesktopLinks,
    MobileLinks,
  },
  methods: {
    /*this logic is for the media queries when width is less than 500 then desktop is false 
    and when width is 500 or more desktop view is true and these conditions will change the html on the page*/
    change_querie() {
    if(document.documentElement.clientWidth < 500){
        this.desktop_view = false;
    } else if(document.documentElement.clientWidth >= 500){
        this.desktop_view = true;
    }
    }
  },
mounted () {
  /*change querie method will get activated on mounting so what ever the size of the screen while opening the page it will be responsive
  window add event listener will act upon resizing the window */
this.change_querie();
window.addEventListener(`resize`,this.change_querie);
},
data() {
    return {
        desktop_view: false
    }
},
};
</script>

<style lang="scss" scoped>

</style>
