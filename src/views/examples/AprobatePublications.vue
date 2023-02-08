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
            <h1 class="title">Aprobar Publicaciones</h1>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <md-table v-model="publicaciones" md-sort="name" md-sort-order="asc" md-card style="width: 100% !important">
            <md-table-toolbar>
              <h1 class="md-title" style="color:black !important">Publicacionesss</h1>
              <p>Si apruebas una publicación tu quedas como <strong>corredor a cargo</strong> de esta</p>
            </md-table-toolbar>
            <md-table-empty-state
              md-label="Puedes descansar..."
              :md-description="`No existen publicaciones sin aprobación.`">
            </md-table-empty-state>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="ID" md-numeric md-sort-by="id">{{ item.id }}</md-table-cell>
              <md-table-cell md-label="Titulo" md-sort-by="titulo">{{ item.titulo }}</md-table-cell>
              <md-table-cell md-label="Autor" md-sort-by="nombres">{{ item.nombres }}</md-table-cell>
              <md-table-cell md-label="Propiedad" md-sort-by="tipopropiedadnombre">{{ item.tipopropiedadnombre }}</md-table-cell>
              <md-table-cell md-label="Publicación" md-sort-by="publicaciontiponombre">{{ item.publicaciontiponombre }}</md-table-cell>
              <md-table-cell md-label="Región" md-sort-by="region">{{ item.region }}</md-table-cell>
              <md-table-cell md-label="Comuna" md-sort-by="nombre_comuna">{{ item.comuna }}</md-table-cell>
              <md-table-cell md-label="Ver" >
                <md-button @click="loadPublication(item.id)" class="md-primary">Ver</md-button>
              </md-table-cell>
              <md-table-cell md-label="Aprobar" >
                <md-button @click="changeStatePublication(item.id)" class="md-info">Aprobar</md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>
    </div>
    <md-snackbar
      md-position="center"
      :style="colorSnackbar"
      :md-duration="timeout"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{textSnackbar}}</span>
      <md-button class="md-danger" @click="showSnackbar = false">x</md-button>
    </md-snackbar>
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
} from "@/components";
import Mixins from "@/plugins/basicMixins";
import { getPublicationDesactiveService } from "../../services/publication/GetAllPublicationsDesactive.service";
import { changeStatePublicationservice } from "../../services/publication/ChangeStatePublication.service"
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
      publicaciones: [],
      image: require("../../assets/img/inmo/pool_tropical.jpg"),
      image2: require("../../assets/img/inmo/key.jpg"),
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
      showSnackbar: false,
      textSnackbar: '',
      colorSnackbar: '',
      timeout: 4000,
      idUser: 0
    };
  },
  computed: {
    imageSubscribe() {
      return {
        backgroundImage: `url(${this.image2})`
      };
    }
  },
  methods: {
    newValue(e) {
      this.sliders.rangeSlider[0] = e[0];
      this.sliders.rangeSlider[1] = e[1];
    },
    loadPublications() {
      let vm = this;
      getPublicationDesactiveService.query().then(data => {
        vm.publicaciones = data.body
      });
    },
    loadPublication(id){
      this.$router.push({path: 'product-page/' + id})
    },
    changeStatePublication(id){
      let vm = this
      changeStatePublicationservice.update(id, vm.idUser).then(data => {
        vm.publicaciones = data.body
        vm.textSnackbar = "La publicación fue activada con éxito";
        vm.showSnackbar = true;
        vm.colorSnackbar = "background-color: green";
      },
      response => {
          vm.textSnackbar = "Hubo un error al activar la publicación";
          vm.showSnackbar = true;
          vm.colorSnackbar = "background-color: darkred";
        },
      )
    }
  },
  mounted() {
    let vm = this
    vm.loadPublications()
    vm.idUser = localStorage.getItem('user')
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

.md-content {
  width: 20%;
  height: 100px;
  margin: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.md-content:hover {
  color: white !important;
  font-size: 18px;
  transition: 0.3s;
  text-decoration: none;
}
</style>
