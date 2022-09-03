<template> 
  <div class="navbar">
    <!-- various links from the client header to navigate to different pages and logout as well  -->
    <div v-if="desktop_view === false" class="navbar_mobile">
        
    </div>
    <div v-if="desktop_view === true" class="navbar_desktop">
     <desktop-links></desktop-links>      
    </div>
  </div>
</template>

<script>
import DesktopLinks from "@/components/desktopLinks.vue";
import NavigationLinks from "@/components/desktopLinks.vue";
export default {
  components: {
    DesktopLinks,
  },
mounted () {
    if(this.element.clientWidth < 500){
        this.desktop_view = false;
    } else if(this.element.clientWidth >= 500){
        this.desktop_view = true;
    }
},
data() {
    return {
        desktop_view: true
    }
},
};
</script>

<style lang="scss" scoped>

</style>
