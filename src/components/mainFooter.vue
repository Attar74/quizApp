<template>
   <v-app class="vApp">
    <v-footer>
      <v-card
        tile
        flat
        width="100%"
        color="#00ca8c"
        dark
        height="100px"
        class="d-flex align-center justify-center px-10"
      >
        <p class="footerText"> &copy; 2022 Powerd By Mahmod Attar</p>
        <v-spacer></v-spacer>
        <div class="iconsHolder">          
          <v-icon 
            v-for="icon in icons"
            :key="icon" size="40px" color='#000' 
            class="mx-4"
          >
            {{ icon }}
          </v-icon>
        </div>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-github',
      ],
    }),
  }
</script>
<style>
  .v-application__wrap{
    min-height: 5vh !important;
  }
  .v-footer {  
    padding: 0px 10px !important;
  }
  .footerText {
    color: #EEE;
    font-weight: bold;
    font-size: 25px
  }
  .iconsHolder {
    padding: 5px;
    background: #ddd;
    border-radius: 20px;
  }  
</style>