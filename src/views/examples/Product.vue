<template>
  <div class="wrapper">
    <parallax
      class="page-header header-filter header-small"
      parallax-active="true"
      filter-color="blue"
      :style="headerStyle"
    ></parallax>
    <div class="section">
      <div class="container">
        <div class="main main-raised">
          <div class="md-layout">
            <div class="md-layout-item md-size-50 md-small-size-100" style="hei">
              <template>
                <div class="md-layout" v-if="images !== undefined">
                  <div
                    class="md-layout-item md-size-50 md-small-size-100 ml-auto mr-auto"
                    v-for="foto in images"
                    v-bind:key="foto"
                  >
                    <img
                      :src="foto"
                      class="rounded"
                      style="margin-top: 2%; margin-bottom:2%"
                      @click="showImg(foto)"
                    />
                  </div>
                </div>
                <div class="md-layout" v-else>
                  <div class="md-layout-item md-size-100 md-small-size-100 ml-auto mr-auto">
                    <img :src="noImagen" class="rounded" style="margin-top: 2%; margin-bottom:2%" />
                  </div>
                </div>
              </template>

              <!--
                <div class="md-layout">
                  <div
                    class="md-layout-item md-size-25 md-small-size-100 ml-auto"
                  >
                    <img
                      :src="images[0]"
                      class="rounded"
                    >
                    <img
                      :src="images[1]"
                      class="rounded"
                    >
                  </div>
                  <div
                    class="md-layout-item md-size-25 md-small-size-100 mr-auto"
                  >
                    <img
                      :src="images[2]"
                      class="rounded"
                    >
                    <img
                      :src="images[3]"
                      class="rounded"
                    >
                    <img
                      :src="images[4]"
                      class="rounded"
                    >
                  </div>
                </div>
              -->
            </div>
            <div class="md-layout-item md-size-50 md-small-size-100">
              <h2 class="title">{{publication.titulo}}</h2>
              <h3 class="main-price" v-if="propiedad.precio > 0">
                <md-icon class="text-skyblue">monetization_on</md-icon>
                {{' Precio: ' + propiedad.precio + ' '}}
                <span
                  style="text-transform: uppercase;"
                >{{propiedad.moneda}}</span>
              </h3>
              <collapse
                :active-tab="1"
                :collapse="[
                  'Descripción',
                  'Información adicional',
                  'Contacto'
                ]"
                icon="keyboard_arrow_down"
                color-collapse="rose"
              >
                <template slot="md-collapse-pane-1">
                  <p>{{publication.descripcion}}</p>
                  <div class="md-layout md-gutter md-alignment-center">
                    <div
                      class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
                    >
                      <div v-for="item in habitciones" v-bind:key="item.id">
                        <p class="text-secondary text-center" v-if="item.nombre === 'Cocina'">
                          <md-icon class="text-primary">kitchen</md-icon>
                          {{ item.nombre + ' '}}
                          <strong>{{ item.cantidad }}</strong>
                        </p>
                        <p class="text-secondary text-center" v-else-if="item.nombre === 'Baño'">
                          <md-icon class="text-primary">bathtub</md-icon>
                          {{ item.nombre + ' '}}
                          <strong>{{ item.cantidad }}</strong>
                        </p>
                        <p
                          class="text-secondary text-center"
                          v-else-if="item.nombre === 'Dormitorios'"
                        >
                          <md-icon class="text-primary">local_hotel</md-icon>
                          {{ item.nombre + ' '}}
                          <strong>{{ item.cantidad }}</strong>
                        </p>
                        <p
                          class="text-secondary text-center"
                          v-else-if="item.nombre === 'Lavadero'"
                        >
                          <md-icon class="text-primary">local_laundry_service</md-icon>
                          {{ item.nombre + ' '}}
                          <strong>{{ item.cantidad }}</strong>
                        </p>
                        <p class="text-secondary text-center" v-else-if="item.nombre === 'Quincho'">
                          <md-icon class="text-primary">outdoor_grill</md-icon>
                          {{ item.nombre + ' '}}
                          <strong>{{ item.cantidad }}</strong>
                        </p>
                        <p class="text-secondary text-center" v-else-if="item.nombre === 'Garage'">
                          <md-icon class="text-primary">airport_shuttle</md-icon>
                          {{ item.nombre + ' '}}
                          <strong>{{ item.cantidad }}</strong>
                        </p>
                        <p class="text-secondary text-center" v-else>
                          <md-icon class="text-primary">meeting_room</md-icon>
                          {{ item.nombre + ' '}}
                          <strong>{{ item.cantidad }}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </template>
                <template slot="md-collapse-pane-2">
                  <div class="md-layout md-gutter md-alignment-center">
                    <div
                      class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
                      v-if="caracteristicasPropiedad.length>0"
                    >
                      <div v-for="item in caracteristicas" v-bind:key="item.id">
                        <div
                          v-for="item2 in caracteristicasPropiedad "
                          v-bind:key="item2.id_caracteristica"
                        >
                          <p class="text-secondary" v-if="item2.id_caracteristica === item.id">
                            <md-icon class="text-success">check</md-icon>
                            {{ item.nombre}}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
                      v-else
                    >
                      <md-icon class="text-warning">error</md-icon>
                      {{" Sin características definidas"}}
                    </div>
                    <div
                      class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
                      v-if="restriccionesPropiedad.length>0"
                    >
                      <div v-for="item in restricciones" v-bind:key="item.id">
                        <div
                          v-for="item2 in restriccionesPropiedad "
                          v-bind:key="item2.id_restriccion"
                        >
                          <p v-if="item2.id_restriccion === item.id" class="primary-text">
                            <md-icon class="text-warning">error</md-icon>
                            {{ item.nombre}}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
                      v-else
                    >
                      <md-icon class="text-success">check_circle</md-icon>
                      {{" No hay restricciones"}}
                    </div>
                  </div>
                </template>
                <template slot="md-collapse-pane-3">
                  <h2>Corredor encargado:</h2>
                  <h3>
                    <md-icon class="text-skyblue">face</md-icon>
                    {{" " + contacto.nombres + " " + contacto.apellido_p}}
                  </h3>
                  <h4>
                    <md-icon class="text-skyblue">mail</md-icon>
                    {{ " " + contacto.email}}
                  </h4>
                  <h4>
                    <md-icon class="text-skyblue">phone</md-icon>
                    {{ " " + contacto.telefono}}
                  </h4>
                </template>
              </collapse>

              <div>
                <info-areas class="pt-0" info-horizontal icon-color="rose" icon="pin_drop">
                  <h3 slot="title" class="info-title">Ubicada en:</h3>
                  <h3 slot="content" class="description">
                    {{ zona.nombre + " - " + comuna.nombre }}
                    <h4
                      v-if="id_persona == publication.id_corredor || id_persona == publication.id_autor || personaTipo == 7"
                    >{{propiedad.direccion}}</h4>
                  </h3>
                </info-areas>
              </div>
              <!--
              <div class="text-right">
                <md-button
                  class="md-rose md-round"
                >
                  Agregar a favoritos <md-icon>favorite</md-icon>
                </md-button>
              </div>
              -->
            </div>
          </div>
          <div
            class="md-layout"
            v-if="propiedad.latitud !== null && propiedad.longitud !== null && propiedad.latitud !=='' && propiedad.longitud !==''"
          >
            <Mapa
              class="mapa"
              :longitud_propiedad="Number(propiedad.longitud)"
              :latitud_propiedad="Number(propiedad.latitud)"
            />
            <!--<p>mapita</p>
              <iframe style="width:100%" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.303807009096!2d-72.62062439923942!3d-38.73379008196183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9614d40bc9d4ae49%3A0xa8c2ffd10b4cd0d9!2sPorvenir%20597%2C%20Temuco%2C%20Araucan%C3%ADa!5e0!3m2!1ses!2scl!4v1579272114670!5m2!1ses!2scl" width="auto" height="auto" frameborder="0"  allowfullscreen=""></iframe>
            -->
          </div>
          <div class="related-products">
            <div v-if="publication.video !== null && publication.video !== ''">
              <h3 class="title text-center">Entorno de la Propiedad</h3>
              <div class="md-layout">
                <iframe
                  style="margin:auto; height:480px;"
                  width="720"
                  height="auto"
                  :src="'https://www.youtube.com/embed/' + publication.video"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div class="related-products" v-if="propiedadesDestacadas.length>0">
          <h3 class="title text-center">Propiedades que te pueden interesar:</h3>

          <div class>
            <div class="md-layout">
              <div
                class="md-layout-item md-size-33 md-small-size-100"
                v-for="destacadas in propiedadesDestacadas"
                v-bind:key="destacadas.nombre"
              >
                <div @click="loadDireccionPubliaccion(destacadas.id)">
                  <product-card
                    text-center
                    class="mt-3"
                    card-plain
                    :card-image="'https://api.corretaje.site/storage/gallery_products/' + destacadas.url"
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
                    <template slot="cardZone2">
                      <div class="md-layout">
                        <div class="md-layout-item">
                          <p class="text-center" style="float: left; display:flex;">
                            <md-icon class="text-primary">pin_drop</md-icon>
                            {{destacadas.nombre_zona}}
                          </p>
                        </div>
                        <div class="md-layout-item">
                          <md-button
                            class="md-just-icon md-rose md-round md-simple"
                            style="float: right;"
                          >
                            <md-icon>favorite</md-icon>
                            <md-tooltip md-direction="left">Eliminar de favoritos</md-tooltip>
                          </md-button>
                        </div>
                      </div>
                    </template>
                  </product-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <md-snackbar
      md-position="center"
      :style="colorSnackbar"
      :md-duration="tiempo"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>Ya estas en la publicación</span>
      <md-button class="md-danger" @click="showSnackbar = false">x</md-button>
    </md-snackbar>
    <vue-easy-lightbox :visible="visible" :imgs="images" @hide="handleHide"></vue-easy-lightbox>
  </div>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";
import {
  Collapse,
  BlogCard,
  InfoAreas,
  ProductCard,
  Badge
} from "../../components";
import Mixins from "@/plugins/basicMixins";
import { publicationService } from "../../services/publication/Publication.service";
import { caracteristicaService } from "../../services/other/Caracteristica.service";
import { restriccionService } from "../../services/other/Restricciones.service";
import { getZonaInPropiedadService } from "../../services/location/GetZonaInPropiedad.service";
import { getContactUserService } from "../../services/users/GetContactUser.service";
import { getComunaService } from "../../services/location/GetComuna.service";
import Mapa from "../mapa/Mapa";
import { getPublicationDestacadeEcomerceService } from "../../services/publication/GetAllPublicationsDestacadeEcomerce.service";
import Gallery from "vue-cover-gallery";

export default {
  components: {
    Collapse,
    InfoAreas,
    ProductCard,
    Gallery,
    BlogCard,
    Badge,
    VueEasyLightbox,
    Mapa
  },
  mixins: [Mixins.HeaderImage],
  bodyClass: "product-page",
  data() {
    return {
      publication: {
        titulo: "",
        descripcion: ""
      },
      showSnackbar: false,
      textSnackbar: "",
      colorSnackbar: "",
      tiempo: 4000,
      selectColor: "rose",
      selectSize: "small",
      image: require("../../assets/img/inmo/living_room.jpg"),
      productCard: {
        productCard1: require("../../assets/img/examples/card-product1.jpg"),
        productCard2: require("../../assets/img/examples/card-product3.jpg"),
        productCard3: require("../../assets/img/examples/card-product4.jpg"),
        productCard4: require("../../assets/img/examples/card-product2.jpg")
      },
      images: [],
      visible: false,
      imgs: [
        "https://www.w3schools.com/w3css/img_lights.jpg",
        "https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
      ],
      noImagen: require("../../assets/img/inmo/no-imagen.png"),
      imagen1: {},
      publication: {},
      propiedad: {
        longitud: null,
        latitud: null
      },
      idPublication: 0,
      caracteristicasPropiedad: [],
      restriccionesPropiedad: [],
      caracteristicas: [],
      restricciones: [],
      zona: {},
      fotoAux: null,
      contacto: {},
      comuna: {},
      habitciones: [],
      propiedadesDestacadas: [],
      id_persona: 0,
      personaTipo: null
    };
  },
  methods: {
    showImg(index) {
      console.log(index);
      this.fotoAux = index;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
    loadPublicationDestacada() {
      let vm = this;
      getPublicationDestacadeEcomerceService.query().then(data => {
        vm.propiedadesDestacadas = data.body;
      });
    },
    loadPublication() {
      let vm = this;
      publicationService.getById(vm.idPublication).then(data => {
        vm.publication = data.body[1];
        vm.propiedad = data.body[0];
        //vm.propiedad.latitud = Number()
        vm.restriccionesPropiedad = data.body[2];
        vm.caracteristicasPropiedad = data.body[3];
        vm.zona = data.body[6];
        vm.comuna = data.body[7];
        vm.loadContact();
        console.log(vm.propiedad);
        vm.habitciones = data.body[5];
        vm.processImage(data.body[4]);
      });
    },
    loadDireccionPubliaccion(id) {
      let vm = this;
      console.log(vm.$route.params.id);
      if (vm.$route.params.id != id) {
        this.$router.push({ name: "product-page", params: { id } });
        window.location.reload();
      } else {
        vm.showSnackbar = true;
        vm.colorSnackbar = "background-color: darkred";
      }
    },
    processImage(imagenes) {
      let vm = this;
      for (var i = 0; i < imagenes.length; i++) {
        vm.images.push(
          "https://api.corretaje.site/storage/gallery_products/" +
            imagenes[i].url
        );
        console.log(vm.images[i]);
      }
    },
    loadCaracteristicas() {
      let vm = this;
      caracteristicaService.query().then(data => {
        vm.caracteristicas = data.body;
      });
    },
    loadRestricciones() {
      let vm = this;
      restriccionService.query().then(data => {
        vm.restricciones = data.body;
      });
    },
    loadZona() {
      let vm = this;
      getZonaInPropiedadService.getById(vm.propiedad.id_zona).then(data => {
        vm.zona = data.body[0];
        console.log(data.body);
        vm.loadComuna();
      });
    },
    loadContact() {
      let vm = this;
      getContactUserService.getById(vm.publication.id_corredor).then(data => {
        vm.contacto = data.body[0];
        console.log(vm.contacto);
      });
    },
    loadComuna() {
      let vm = this;
      console.log(vm.zona);
      getComunaService.getById(vm.zona.id_comuna).then(data => {
        vm.comuna = data.body;
        //console.log(vm.comuna)
      });
    }
  },
  mounted() {
    let vm = this;
    vm.personaTipo = localStorage.tipo;
    vm.id_persona = localStorage.user;

    vm.idPublication = vm.$route.params.id;
    vm.loadPublication();
    vm.loadRestricciones();
    vm.loadCaracteristicas();
    vm.loadPublicationDestacada();
    //vm.loadZona()
  }
};
</script>
<style lang="scss">
.mapa {
  height: 425px;
}

.inline-container-zoomer-box {
  .preview-box {
    text-align: center;
    margin-bottom: 5vh;
    margin-top: 2vh;

    img {
      max-width: 60%;
    }
  }
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
  vertical-align: top;

  .control-box {
    margin-bottom: 30px;
  }

  .thumb-list img {
    padding: 18px 8px;
    border: 1px solid transparent;
    opacity: 0.8;
    transition: all 0.15s ease;

    &:hover {
      opacity: 1;
      border-color: #ddd;
    }
  }

  .responsive-image {
    max-width: 80%;
    border-radius: 3px;

    &.choosed-thumb {
      box-shadow: none !important;
      border-color: #ddd;
    }
  }

  .control {
    font-size: 14px;

    path {
      fill: #9fa4ab;
    }
  }
}
</style>
