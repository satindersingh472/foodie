<template>
  <div class="both_options" ref="both_options">
    <h1>FOODIE</h1>
    <div class="client">
      <router-link class="links" to="/client_sign_up"><button>Login / Sign Up as a Customer</button></router-link>
    </div>
    <div class="client">
      <router-link class="links" to="/restaurant_sign_up"><button>Login / Sign Up as a Restaurant</button></router-link>
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
  gap:10%;
  place-items: center;
  .links{
    text-decoration: none;
  }
  .client {
    display: grid;
    width: 30vw;
    button {
        font-size:2rem;
        text-transform: uppercase;
        padding: 10%;
      display: grid;
    }
  }
}
</style>
