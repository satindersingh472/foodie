<template>
<div>
  <!-- Edit menu component will show up when edit menu button is pressed on the restaurant menu view -->
<button @click="show_options" >Edit</button>
<!-- following div will show when edit menu button changes the value of a show form after clicking the button -->
  <div class="edit_form" v-if="show_form !== false">
     <!-- cancel button will hide the options to edit -->
    <button @click="hide_options" >Cancel</button>
    <!-- the form will have ref and value which will get used to display details in input fields and
    if there is need to change something then just change the value in those input fields and hit the save
    button it will make an api call and show the changed values on the page if successfull -->
    <h4>Name </h4>
    <input type="text" ref="name" :value="`${detail[`name`]}`" />
    <h4>Description</h4>
    <input
        type="text"
        ref="description"
        :value="`${detail[`description`]}`"
      />
    <h4>Price </h4>
    <input type="text" ref="price" :value="`${detail[`price`]}`" />
    <h4>
      Image URL
    </h4>
    <input type="url" ref="image_url" :value="`${detail[`image_url`]}`" />
   
    <!-- save button will save the changes -->
    <button @click="send_request">save</button>
    <h2 v-if="message !== undefined" >
        {{message}}
    </h2>
  </div>
</div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
    props: {
      // this component will expect props in term to change the value of a specific menu item 
      // each menu item has a button and key will be attach with edit menu attribute to send data to this child component
      // so the data sent i.e detail is in the form of object so that this component has the access of all key value pairs for a menu item object
        detail: Object 
        },
  methods: {
    /*show option true will help show the options  */
show_options(){
    this.show_form = true;
},
/*show form false will false the show form */
hide_options(){
  this.show_form = false;
},
// send request will make an api call to submit changes in the values of a form in the html above
    send_request() {
      axios
        .request({
          // endpoint for editing the restaurant menu items individually
          url: ` https://innotechfoodie.ml/api/menu`,
          // type of method is patch
          method: `PATCH`,
          // headers required are key and token of restaurant from authentication
          headers: {
            'x-api-key': 'TVTZDiQZDzjkWqVkNCxr',
            token: cookies.get(`token`),
          },
          // data required for the api call
          data:{
            menu_id: this.detail[`id`],
            description: this.$refs[`description`][`value`],
            image_url: this.$refs[`image_url`][`value`],
            name: this.$refs[`name`][`value`],
            price:this.$refs[`price`][`value`]
          }
        })
        .then((response) => {
          if(response){
            // if chnages applied successfully then message will appear 
            this.message = `changes applied`;
            // false value of show form will help hide the edit form component
            this.show_form = false;
            this.$emit(`recieve_response`,response);
          }
        })
        .catch((error) => {
          if(error){
            // an error in making changing will show the following message on the page
            this.message = `changes NOT applied`;
          }
        });
    },
  },
  data() {
    return {
      show_form: false,
      data: undefined,
      message: undefined
    };
  },
};
</script>

<style lang="scss" scoped>
button{
  font-size: 1.3rem;
}
.edit_form{
  display: grid;
  text-align: start;
  margin: 10px auto;
  gap: 1vh;
  font-size: 1.3rem;
  input{
    font-size: 1.3rem;
  }
  button{
    justify-self: center;
    font-size: 1.3rem;
  }
}

</style>
