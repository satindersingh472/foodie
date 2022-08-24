<template>
  <div class="both_options">
    <div class="client">
      <router-link class="links" to="/client_sign_up"><button>SignUp as a Customer<br/>OR<br/>LogIn as a Customer</button></router-link>
    </div>
    <div class="client">
      <router-link class="links" to="/restaurant_page"><button>SignUp as a Restaurant<br/>OR<br/>LogIn as a Restaurant</button></router-link>
    </div>
  </div>
</template>

<script>
export default {


};
</script>

<style lang="scss" scoped>
.both_options {
  display: grid;
  grid-auto-flow: column;
  gap:10%;
  .client {
    display: grid;
    width: 30vw;
    .links{
        text-decoration: none;
    }
    &:nth-of-type(1){
        justify-self: end;
    }
    &:nth-of-type(2){
        justify-self: start;
    }
    button {
        font-size:2rem;
        text-transform: uppercase;
        padding: 10%;
      display: grid;
    }
  }
}
</style>
