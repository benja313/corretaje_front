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
            <h1 class="title">Listado Propiedades</h1>
            <h4>
              Un amplio catálogo para que encuentres la
              <b>propiedad</b> que necesitas
            </h4>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised" >
      <div class="section"  v-if="propiedadesDestacadas.length>0">
        <div class="container">
          <h2 class="section-title" style="margin-bottom: 2.5rem;">Propiedades destacadas</h2>
          <div class="md-layout">
            <div
              class="md-layout-item md-size-33 md-small-size-100"
              v-for="destacadas in propiedadesDestacadas">
              <router-link :to="'product-page/' + destacadas.id">
                <product-card
                  text-center
                  class="mt-3"
                  card-plain
                  :card-image="'http://127.0.0.1:8000/storage/gallery_products/' + destacadas.url"
                  :shadow-normal="false"
                  :no-colored-shadow="false"
                  card-action
                >
                  <template slot="cardContent">
                    <h4 class="card-title">{{ destacadas.titulo }}</h4>
                    <p class="card-description">{{ destacadas.descripcion }}</p>
                  </template>
                  <template slot="cardAction">
                    <div class="price-container">
                      <div class="item-details-publication">
                        <badge type="primary" class="badge-pill">
                          m
                          <sup>2</sup>
                          {{' ' + destacadas.metros_construidos}}
                          <md-tooltip md-direction="bottom">Metros construidos</md-tooltip>
                        </badge>
                      </div>
                      <div class="item-details-publication">
                        <badge type="info" class="badge-pill">{{destacadas.nombre_tipo_propiedad}}</badge>
                      </div>
                      <div class="item-details-publication">
                        <badge type="success" class="badge-pill">{{destacadas.nombre_tipo_publi}}</badge>
                      </div>
                    </div>
                  </template>
                  <template slot="cardZone">
                    <div class="md-layout">
                      <div class="md-layout-item">
                        <p class="text-center" style="float: left; display:flex;">
                          <md-icon class="text-primary">pin_drop</md-icon>
                          {{destacadas.nombre_zona}}
                        </p>
                      </div>
                      
                    </div>
                  </template>
                </product-card>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="section pb-0">
        <div class="container">
          <h2 class="section-title">
            Encuentra lo que necesitas
          </h2>
          <div class="md-layout" style="">
            <div class="md-layout-item md-size-20 md-small-size-100">
              <md-card
                class="md-card md-card-refine md-card-plain"
                style="width: -webkit-fill-available;"
              >
                <md-card-content>
                  <h4 class="card-title">
                    Filtrar
                    <md-button class="md-just-icon md-simple md-sm">
                      <md-icon>cached</md-icon>
                      <md-tooltip md-direction="top">Reset Filter</md-tooltip>
                    </md-button>
                  </h4>
                  <collapse
                    :active-tab="1"
                    :collapse="[
                      'Metros Construidos',
                      'Precio',
                      'Región',
                      'Comuna',
                      'Zona',
                      'Tipo de Publicación'
                    ]"
                    icon="keyboard_arrow_down"
                    color-collapse="rose"
                  >
                    <template slot="md-collapse-pane-1">
                      <span class="price-content">
                        <span class="price-left">
                          Mt
                          <sup>2</sup>
                          {{ Math.floor(this.metrosConstruidosMin) }}
                        </span>
                        <span class="price-right">
                          Mt
                          <sup>2</sup>
                          {{ Math.floor(this.maximos.maxMetrosConstruidos) }}
                        </span>
                      </span>
                      <input type="range" class="slider" id="myRange" v-model="metrosConstruidosSlider" :min="metrosConstruidosMin" :max="maximos.maxMetrosConstruidos" >
                      <span class="price">{{ metrosConstruidosSlider }}
                        </span>
                    </template>
                   
                    <template slot="md-collapse-pane-2" v-if="tipoMoneda == 'clp'">
                      <span class="price-content" >
                        <span class="price-left">
                          Min
                          {{ Math.floor(this.precioMinimo) }}
                        </span>
                        <span class="price-right">
                          Max
                          {{ Math.floor(this.maximos.maxCLP) }}
                        </span>
                      </span>
                    
                      <input type="range" class="slider" id="myRange" v-model="precioSlider" :min="precioMinimo" :max="maximos.maxCLP" >
                         <md-radio v-model="tipoMoneda" value="clp">CLP</md-radio>
                        <md-radio v-model="tipoMoneda" value="uf">UF</md-radio>
                        <p class="text-center">{{precioSlider}}</p>
                    </template>
                    <template slot="md-collapse-pane-2" v-else>
                      
                      <span class="price-content" >
                        <span class="price-left">
                          Min
                          {{ Math.floor(this.precioMinimo) }}
                        </span>
                        <span class="price-right">
                          Max
                          {{ Math.floor(this.maximos.maxUF) }}
                        </span>
                      </span>
                      <input type="range" class="slider" id="myRange" v-model="precioSlider" :min="precioMinimo" :max="maximos.maxUF" >
                         <md-radio v-model="tipoMoneda" value="clp">CLP</md-radio>
                        <md-radio v-model="tipoMoneda" value="uf">UF</md-radio>
                      <p class="text-center" >{{precioSlider}}</p>
                    </template>

                    <template slot="md-collapse-pane-3">
                      <md-checkbox
                        class="mb-0"
                        v-for="region in regiones"
                        v-bind:key="region.nombre"
                        v-model="region.state"
                        
                      >{{region.nombre}}</md-checkbox>
                    </template>
                    <template slot="md-collapse-pane-4">
                      <md-checkbox
                        v-model="comuna.state"
                        class="mb-0"
                        v-for="comuna in comunas"
                        v-bind:key="comuna.nombre"
                        
                      >{{comuna.nombre}}</md-checkbox>
                    </template>
                    <template slot="md-collapse-pane-5">
                      <md-checkbox
                        v-model="zona.state"
                        class="mb-0"
                        v-for="zona in zonas"
                        v-bind:key="zona.nombre"
                        
                      >{{zona.nombre}}</md-checkbox>
                    </template>
                    <template slot="md-collapse-pane-6">
                      <md-checkbox
                        v-model="tipoPubli.state"
                        class="mb-0"
                        v-for="tipoPubli in tipoPublicacion"
                        v-bind:key="tipoPubli.nombre"
                        
                      >{{tipoPubli.nombre}}</md-checkbox>
                    </template>
                  </collapse>
                  <br>
                  <md-button @click="processFilter" class="md-primary">Aplicar Filtro</md-button>
                </md-card-content>
              </md-card>
            </div>
            <div class="md-layout md-size-80 md-small-size-100 " v-if="false">
              <div class="text-center " style="margin: auto;" >
                <md-icon class="text-warning" style="font-size: 100px !important">error</md-icon>
                <br>
                 <h2>¡Ups! No Hay publicaciones por el momento</h2>
                <br>
                <div>
                  <h4 v-if="true">Puedes tu añadir nuevo contenido</h4>
                  <md-button to:="newPublication" class="md-info">Nueva Publicación</md-button>
                </div>
                
              </div>
            </div>
              <div class="md-layout-item md-size-80 md-small-size-100" v-else style="margin: auto;">
              <div class="md-layout">
                <div class="md-layout-item md-size-33 md-small-size-100"
                  style="margin-top:1%; margin-bottom:1%"
                  v-for="item in publications"
                >
                  <router-link :to="'publicacion/' + item.id">
                    <product-card
                      text-center
                      class="mt-3"
                      style="margin-top:5% !important;"
                      :card-image="'http://127.0.0.1:8000/storage/gallery_products/' + item.url"
                      :shadow-off="true"
                    >
                      <template slot="cardContent">
                        <h4 class="card-title">{{item.titulo}}</h4>
                        <p class="card-description">{{item.descripcion}}</p>
                      </template>
                      <template slot="cardAction">
                        <div class="price-container">
                          <div class="item-details-publication">
                            <badge type="primary" class="badge-pill">
                              m
                              <sup>2</sup>
                              {{' ' + item.metros_construidos}}
                              <md-tooltip md-direction="bottom">Metros construidos</md-tooltip>
                            </badge>
                          </div>

                          <div class="item-details-publication">
                            <badge type="info" class="badge-pill">{{item.nombre_tipo_propiedad}}</badge>
                          </div>
                          <div class="item-details-publication">
                            <badge type="success" class="badge-pill">{{item.nombre_tipo_publi}}</badge>
                          </div>
                        </div>
                      </template>
                      <template slot="cardZone">
                        <div class="md-layout">
                          <div class="md-layout-item">
                            <p class="text-center" style="float: center;">
                              <md-icon class="text-primary">pin_drop</md-icon>
                              {{item.nombre_zona}}
                            </p>
                          </div>
                          
                        </div>
                      </template>
                      <template slot="cardPrice">
                        <div class="md-layout">
                          <p class="text-center" style="margin: auto; text-transform: uppercase;">
                           <span style="">{{ item.moneda + ' '}} <strong>{{item.precio}}</strong></span>
                          </p>
                        </div>
                      </template>
                
                    </product-card>
                  </router-link>
                </div>

                
              </div>
              <div class="md-layout-item md-size-25 md-small-size-100 mx-auto">
                  <div id="progress-pagination">
                    <div class="md-layout">
                      <div class="md-layout-item md-size-50 md-xsmall-size-100">
                        <div class="title">
                          <h3>Pagínas</h3>
                        </div>
                        <pagination
                          @input="cambiarPagina()"
                          v-model="defaultPagination"
                          class="pagination-info"
                          :page-count="paginacion.last_page"
                        />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="subscribe-line subscribe-line-image" :style="imageSubscribe">
      <div class="container justify-content-center">
        <div class="md-layout" style="margin: auto;">
          <div class="md-layout-item md-size-100 mx-auto">
            <div class="text-center">
              <h3 class="title">Suscríbete para recibir noticias</h3>
              <p class="description"></p>
            </div>
            <md-card class="md-card-form-horizontal">
              <md-card-content>
                <form action method>
                  <div class="md-layout">
                    <div class="md-layout-item md-size-66 md-medium-size-50 md-xsmall-size-100">
                      <md-field class="md-form-group">
                        <md-icon>mail</md-icon>
                        <md-input v-model="correoSubscripcion" placeholder="Subscribe" />
                      </md-field>
                    </div>
                    <div class="md-layout-item md-size-33 md-medium-size-50 md-xsmall-size-100">
                      <md-button class="md-primary md-block" @click="suscribirse">Subscribete</md-button>
                    </div>
                  </div>
                </form>
              </md-card-content>
            </md-card>
          </div>
        </div>
      </div>
    </div>
    <md-snackbar md-position="center" :style="colorSnackbar" :md-duration="duracion" :md-active.sync="showSnackbar" md-persistent>
      <span>{{textSnackbar}}</span>
      <md-button class="md-danger" @click="showSnackbar = false">x</md-button>
    </md-snackbar>
  </div>
</template>
<script>
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value;

  slider.oninput = function() {
    output.innerHTML = this.value;
  }
</script>
<script>
import {
  ProductCard,
  Collapse,
  FullBgCard,
  BlogCard,
  Slider,
  Badge,
  Pagination
} from "../../components";
import Mixins from "../../plugins/basicMixins";
import { getPublicationEcomerceService } from "../../services/publication/GetAllPublicationEcomerce.service";
import { getMetrosConstruidosService } from '../../services/publication/GetMaxMetrosConstruidos.service'
import { zonaStateService } from "../../services/location/ZonaState.service";
import { regionStateService } from "../../services/location/RegionState.service";
import { comunaStateService } from "../../services/location/ComunaState.service";
import { caracteristicaStateService } from "../../services/other/CaracteristicaState.service";
import { tipoPropiedadService } from "../../services/other/TipoPropiedad.service";
import { tipoPublicacionService } from "../../services/other/TipoPublicacion.service";
import { getPublicationDestacadeEcomerceService } from "../../services/publication/GetAllPublicationsDestacadeEcomerce.service";
import { getPublicationFilterService } from '@/services/publication/GetAllPublicationFilter.service'
import _ from "lodash";

export default {
  components: {
    ProductCard,
    Collapse,
    FullBgCard,
    BlogCard,
    Slider,
    Badge,
    Pagination, 
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
       showSnackbar: false,
      textSnackbar: '',
      colorSnackbar: '',
      duracion: 4000,
      correoSubscripcion: null,
      subscribe: null,
      sliders: {
        rangeSlider: [101, 700]
      },
      defaultPagination: 1,
      infoPagination: 3,
      propiedadesDestacadas: [],
      message: "",
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
      color: "",
      size: "",
      metrosConstruidosMin: 0,
      metrosConstruidosMax: 1000,
      metrosConstruidosSlider:0,
      metrosTerrenoMin: 0,
      metrosTerrenoMax: 0,
      paginacion: {
        last_page: 1,
        next_page_url: 0,
        prev_page_url: 0
      },
      consultaFiltro:{
        metrosConstruidos: 0,
        superficieTerreno: 0,
        regiones: [],
        comunas: [],
        zonas: [],
        tipoPublicacion: [],
        page: 1
      },
      maxMetrosConstruidos: 0,
      precioSlider:0,
      precioMinimo: 0,
      precioMax: 1,
      tipoMoneda: 'clp',
      maximos: {
        maxCLP: 0,
        maxMetrosConstruidos: 0,
        maxUF:0
      }
    }
  },
  computed: {
    imageSubscribe() {
      return {
        backgroundImage: `url(${this.image2})`
      }
    }
  },
  methods: {
    cambiarvalor(){
      this.defaultPagination = 2 
    },
    cambiarPagina(){
      let vm = this
      if(vm.consultaFiltro.regiones.length === 0){
        setTimeout(()=>{
        switch (localStorage.getItem('rutaPag')) {
          case 'change':
              fetch('https://corretaje_api.therameds.cl/api/getAllsPublications?page=' + localStorage.getItem('pagina')).then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    vm.publications = data.data
                    vm.paginacion = data
                    console.log(data)
                })
                .catch(function(err) {
                    console.error(err)
                })
            break
          case 'next':
            fetch(vm.paginacion.next_page_url).then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    vm.publications = data.data
                    vm.paginacion = data
                })
                .catch(function(err) {
                    console.error(err)
                })
            break
          case 'prev':
            fetch(vm.paginacion.prev_page_url).then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    vm.publications = data.data
                    vm.paginacion = data
                })
                .catch(function(err) {
                    console.error(err)
                })
            break
        }
      },1000)
      }else{
        setTimeout(()=>{
          console.log(localStorage.getItem('pagina'))
          vm.consultaFiltro.page = vm.defaultPagination
          getPublicationFilterService.save(vm.consultaFiltro).then(data => {
          vm.publications = data.body.data
          vm.paginacion = data.body
          console.log(data.body)
      })
        },1500)
      }
      
    },
    suscribirse(){
      let vm = this
      if(vm.correoSubscripcion === null || vm.correoSubscripcion === '' ){
        vm.textSnackbar = 'Email incorrecto, rellena el campo con tu email'
        vm.showSnackbar = true
        vm.colorSnackbar = 'background-color: darkred'
      }else{
        vm.textSnackbar = 'Te has suscrito con éxito'
        vm.showSnackbar = true
        vm.colorSnackbar = 'background-color: green'
      }
    },
    processFilter(){
      let vm = this
      vm.consultaFiltro.page = 1
      vm.defaultPagination = 1
      vm.consultaFiltro.zonas = []
      vm.consultaFiltro.comunas = []
      vm.consultaFiltro.regiones = []
      vm.consultaFiltro.tipoPublicacion = []
      vm.consultaFiltro.metrosConstruidos = parseInt(vm.metrosConstruidosSlider)
      vm.consultaFiltro.precio = parseInt(vm.precioSlider)
      vm.consultaFiltro.tipoMoneda = vm.tipoMoneda
      for (var item in vm.tipoPublicacion) {
        if (vm.tipoPublicacion[item].state) {
          vm.consultaFiltro.tipoPublicacion.push(vm.tipoPublicacion[item].id)
        }
      }
      // 2 ya que es tipo arriendo o venta, cambiar en caso de que sea cambiado en el array.
      if(vm.tipoPublicacion[2].state){
         for (var item in vm.tipoPublicacion) {
          vm.consultaFiltro.tipoPublicacion.push(vm.tipoPublicacion[item].id)
        }
      }
       if(vm.consultaFiltro.tipoPublicacion.length === 0){
        for (var item in vm.tipoPublicacion) {
        vm.consultaFiltro.tipoPublicacion.push(vm.tipoPublicacion[item].id)
        }
      }
      for (var item in vm.regiones) {
        if (vm.regiones[item].state) {
          vm.consultaFiltro.regiones.push(vm.regiones[item].id)
        }
      }
       if(vm.consultaFiltro.regiones.length === 0){
        for (var item in vm.regiones) {
        vm.consultaFiltro.regiones.push(vm.regiones[item].id)
        }
      }
      for (var item in vm.comunas) {
        if (vm.comunas[item].state) {
          vm.consultaFiltro.comunas.push(vm.comunas[item].id)
        }
      }
      if(vm.consultaFiltro.comunas.length === 0){
        for (var item in vm.comunas) {
          vm.consultaFiltro.comunas.push(vm.comunas[item].id)
        }
      }
      for (var item in vm.zonas) {
        if (vm.zonas[item].state) {
          vm.consultaFiltro.zonas.push(vm.zonas[item].id)
        }
      }
       if(vm.consultaFiltro.zonas.length === 0){
        for (var item in vm.zonas) {
          vm.consultaFiltro.zonas.push(vm.zonas[item].id)
        }
      }
      getPublicationFilterService.save(vm.consultaFiltro).then(data => {
        vm.publications = data.body.data
        vm.paginacion = data.body
        console.log(data.body)
      })
    },
    changeStateZonas(e) {
      let vm = this;
      for (var i = 0; i < vm.publications.length; i++) {
        if (vm.publications[i].nombre_zona === e.nombre) {
          vm.publications[i].zona_state = false;
        }
      }
    },
    loadMaxMetrosConstruidos(){
      let vm = this
      getMetrosConstruidosService.query().then(data => {
        vm.maximos = data.body
      })
    },
    loadPublicationDestacada() {
      let vm = this;
      getPublicationDestacadeEcomerceService.query().then(data => {
        vm.propiedadesDestacadas = data.body;
      });
    },
    loadPublicationRoute(id) {
      this.$router.push({ name: "product-page" } + "/" + id);
    },
    loadPublications() {
      let vm = this
      getPublicationEcomerceService.query().then(data => {
        vm.publications = data.body.data
        vm.paginacion = data.body
        console.log(data.body)
      });
    },
    loadZonas() {
      let vm = this
      zonaStateService.query().then(data => {
        vm.zonas = data.body
      })
    },
    changePage(page){
      let vm = this
      vm.paginacion.current_page = page
      vm.loadPublications
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
        vm.tiposPropiedad = data.body;
      });
    },
    loadTipoPublicacion() {
      let vm = this
      tipoPublicacionService.query().then(data => {
        vm.tipoPublicacion = data.body
        console.log(vm.tipoPublicacion)
      })
    },
    loadCaracteristicas() {
      let vm = this
      caracteristicaStateService.query().then(data => {
        vm.caracteristicas = data.body
      })
    },
    resetFilter() {
      let vm = this
      console.log('rest filter')
    }
  },
  mounted() {
    let vm = this;
    vm.loadPublications();
    vm.loadZonas();
    vm.loadComunas();
    vm.loadRegiones();
    vm.loadTipoPropiedad();
    vm.loadTipoPublicacion();
    vm.loadCaracteristicas();
    vm.loadPublicationDestacada();
    vm.resetFilter()
    vm.loadMaxMetrosConstruidos()
  },
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
  width: auto;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.item-details-publication {
  margin-left: 1% !important;
  margin-right: 1% !important;
}
.slidecontainer {
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #00bcd4 ;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #00bcd4 ;
  cursor: pointer;
}
</style>
