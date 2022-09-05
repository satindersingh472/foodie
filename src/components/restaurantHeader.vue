<template> 
  <div class="navbar">
    <!-- various links from the client header to navigate to different pages and logout as well  -->
    <div v-if="desktop_view === false" class="navbar_mobile">
        <rest-mobile-links></rest-mobile-links>
    </div>
    <div v-if="desktop_view === true" class="navbar_desktop">
      <rest-desktop-links></rest-desktop-links>      
    </div>
  </div>
</template>

<script>
// importing various components 
import RestMobileLinks from  "@/components/restMobileLinks.vue";
import RestDesktopLinks from "@/components/restDesktopLinks";
export default {
  components: {
    RestMobileLinks,
    RestDesktopLinks
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
.navbar {
  display: grid;
  grid-auto-flow: column;
}
</style>
