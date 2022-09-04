<template> 
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
    change_querie() {
    if(document.documentElement.clientWidth < 500){
        this.desktop_view = false;
    } else if(document.documentElement.clientWidth >= 500){
        this.desktop_view = true;
    }
    }
  },
mounted () {
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
