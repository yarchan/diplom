<template>
  <q-page class="flex items-center justify-center">
    <q-card class="bg-no no-shadow " style="background:none">
      <q-card-section>
        <div class="text-accent ">
          <h2 class=" text-center">
            Добро пожаловать!
          </h2>
          <h4 class="text-center">
           Вы находитесь в информационной системе по проведению спортивных соревнований
          </h4>
        </div>        
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  setup() {
    
  },
}
</script>

<style lang="scss" scoped>
  @media screen and(max-width:630px) {
    h2{
      font-size: 2.5em;
      line-height: 20px;
    } 
    h4{
      font-size: 1.3em;
    }
  }
  @media screen and(max-width:400px) {
    h2{
      font-size: 2em;
    } 
    h4{
      font-size: 1em;
    }
  }
</style>