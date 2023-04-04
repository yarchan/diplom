<template>
  <router-view/>
</template>

<script>
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'App',
  created() {
    this.$router.push("/login");
  },
  mounted() {
    let token = sessionStorage.getItem('token')
    if(token !== null){
      this.$router.push("/");
    }else{
    }
  }
})
</script>
