<template>
  <CargarMapa
    :configMapa="configMapa"
    apiKey="AIzaSyC-LX1EYqYRxZm0ccQqB5darpmJEoCQktw"
  >
    <template slot-scope="{ google, map }">
      <Marcadores
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
      />
    </template>
 
  </CargarMapa>
 
</template>
 
<script>
 
  import CargarMapa from "./CargarMapa";
  import Marcadores from "./Marcadores";
  import { configMapa } from "@/constants/configMapa";
 
  export default {
    components: {
      CargarMapa,
      Marcadores
    },
    props: {
      latitud_propiedad: Number,
      longitud_propiedad: Number  
    },
 
 
    data() {
      return {
        
        markers: [
          {
            id: "0",
            position: { lat: this.latitud_propiedad, lng: this.longitud_propiedad },
            title: "Machu Pichu - Cusco"
          }
          
        ]
      };
    },
 
    computed: {
      configMapa() {
        return {
          ...configMapa,
          center: this.mapCenter
        };
      },
 
      mapCenter() {
        return this.markers[0].position;
      }
    }
  };
  
</script>