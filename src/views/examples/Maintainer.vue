<template>
  <div class="wrapper">
    <parallax
      class="page-header header-filter header-small"
      parallax-active="true"
      :style="headerStyle"
    >
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-66 md-small-size-100 mx-auto text-center">
            <h1 class="title">Mantenedor del sistema</h1>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="elevation-demo">
             <router-link class="md-content md-elevation-8" style="background-color: #9c27b0; color: white" :to="'adminState'">
               Regiones
             </router-link>
             <router-link class="md-content md-elevation-8" style="background-color: #03a9f4; color: white" :to="'adminCommune'">
               Comunas
             </router-link>
             <router-link class="md-content md-elevation-8" style="background-color: #e91e63; color: white" :to="'adminZone'">
               Zonas
             </router-link>
             <router-link class="md-content md-elevation-8" style="background-color: #00bfa5; color: white" :to="'adminCaracteristics'">
               Caracteristicas
             </router-link>
             <router-link class="md-content md-elevation-8" style="background-color: #ffeb3b; color: white" :to="'adminRestriction'">
               Restricciones
             </router-link>
             <router-link class="md-content md-elevation-8" style="background-color: #00e676; color: white" :to="'adminUsers'">
               Usuarios
             </router-link>
             <router-link class="md-content md-elevation-8" style="background-color: #ff9800; color: white" :to="'adminPublicaciones'">
               Publicaciones
             </router-link>
              <router-link class="md-content md-elevation-8" style="background-color: #ff1744; color: white" :to="'sales'">
               Ventas
             </router-link>
              <router-link class="md-content md-elevation-8" style="background-color: #607d8b; color: white" :to="'adminBanks'">
               Bancos
             </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ProductCard,
  Collapse,
  FullBgCard,
  BlogCard,
  Slider,
  Badge
} from '@/components'
import Mixins from '@/plugins/basicMixins'
import { getPublicationEcomerceService } from '../../services/publication/GetAllPublicationEcomerce.service'
import { zonaStateService } from '../../services/location/ZonaState.service'
import { regionStateService } from '../../services/location/RegionState.service'
import { comunaStateService } from '../../services/location/ComunaState.service'
import { caracteristicaStateService } from '../../services/other/CaracteristicaState.service'
import { tipoPropiedadService } from '../../services/other/TipoPropiedad.service'
import { tipoPublicacionService } from '../../services/other/TipoPublicacion.service'
import _ from "lodash";

export default {
  components: {
    ProductCard,
    Collapse,
    FullBgCard,
    BlogCard,
    Slider,
    Badge,
    filters: {
      capitalize: function(value) {
        if (!value) return "";
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }
  },
  mixins: [Mixins.HeaderImage],
  data() {
    return {
      subscribe: null,
      sliders: {
        rangeSlider: [101, 700]
      },
      message: "",
      clothing: {
        blazers: true,
        casualShirts: false,
        formalShirts: false,
        jeans: false,
        polos: false,
        pyjamas: false,
        shorts: false,
        trousers: false
      },
      designer: {
        all: true,
        polo: false,
        wooyoungmi: false,
        alexander: false,
        tom: false,
        ami: false,
        berena: false,
        sweeney: false,
        burberry: false,
        calvin: false,
        kingsman: false,
        monaco: false,
        dolce: false,
        gucci: false,
        biglioli: false,
        lanvin: false,
        piana: false,
        massimo: false
      },
      colour: {
        all: true,
        black: false,
        blue: false,
        brown: false,
        gray: false,
        green: false,
        neutrals: false,
        purple: false
      },
      image: require('../../assets/img/inmo/pool_tropical.jpg'),
      caracteristicasFilter: [],
      publications: [],
      publicationsFilter: [],
      publicationsAll: [],
      zonas: [],
      regiones: [],
      comunas: [],
      zonasFilter: [],
      tiposPropiedad: [],
      caracteristicas: [],
      tipoPublicacion: [],
      color: "",
      size: "",
      lists: [
        {
          name: "test1",
          color: "red",
          size: "small",
          price: 100
        },
        {
          name: "test2",
          color: "yellow",
          size: "small",
          price: 200
        },
        {
          name: "test3",
          color: "red",
          size: "large",
          price: 250
        },
        {
          name: "test4",
          color: "red",
          size: "medium",
          price: 300
        }
      ]
    };
  },
  computed: {
  },
  methods: {
    newValue(e) {
      this.sliders.rangeSlider[0] = e[0]
      this.sliders.rangeSlider[1] = e[1]
    },
    changeStateRegiones(e) {
      let vm = this;
      console.log("cambia regiones");
    },
    changeStateComunas(e) {
      let vm = this;
      console.log("cambia comunass");
    },
    changeStateZonas(e) {
      let vm = this;
      for (var i = 0; i < vm.publications.length; i++) {
        if (vm.publications[i].nombre_zona === e.nombre) {
          vm.publications[i].zona_state = false;
        }
      }
    },
    loadPublications() {
      let vm = this
      getPublicationEcomerceService.query().then(data => {
        vm.publications = data.body
        //console.log(vm.publications)
      })
    },
    loadZonas() {
      let vm = this
      zonaStateService.query().then(data => {
        vm.zonas = data.body
      })
    },
    loadRegiones() {
      let vm = this
      regionStateService.query().then(data => {
        vm.regiones = data.body
      })
    },
    loadComunas() {
      let vm = this
      comunaStateService.query().then(data => {
        vm.comunas = data.body
      })
    },
    loadTipoPropiedad() {
      let vm = this
      tipoPropiedadService.query().then(data => {
        vm.tiposPropiedad = data.body
      })
    },
    loadTipoPublicacion() {
      let vm = this
      tipoPublicacionService.query().then(data => {
        vm.tipoPublicacion = data.body
      })
    },
    loadCaracteristicas() {
      let vm = this
      caracteristicaStateService.query().then(data => {
        vm.caracteristicas = data.body
      })
    }
  },
  mounted() {
    let vm = this
    var publications = vm.publications
    vm.loadPublications()
    vm.loadZonas()
    vm.loadComunas()
    vm.loadRegiones()
    vm.loadTipoPropiedad()
    vm.loadTipoPublicacion()
    vm.loadCaracteristicas()
  }
};
</script>

<style lang="scss" scoped>
.mt-3 {
  margin-top: 1.875rem * 2;
}
.mb-0 {
  margin-bottom: 0;
}
.card-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-expansion {
  height: 480px;
}

.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.item-details-publication {
  margin-left: 1% !important;
  margin-right: 1% !important;
}
.elevation-demo {
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
  }
@media only screen and (min-width :0px) and (max-width : 700px) {
    .md-content {
    width: 100%;
    height: 100px;
    margin: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
@media only screen and (min-width : 701px) {
   .md-content {
    width: 20%;
    height: 100px;
    margin: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

  
  .md-content:hover{
    color: white !important;
    font-size: 18px;
    transition: 0.3s;
    text-decoration: none;
  }
</style>
