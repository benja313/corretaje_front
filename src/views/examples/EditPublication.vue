<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" parallax-active="false" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-80 md-small-size-100 mx-auto text-center">
            <md-card class="md-card md-card-signup">
              <md-card-content>
                <h2 class="card-title text-center">Datos de la Propiedad</h2>
                <div class>
                  <div class="text-center md-size-40 md-medium-size-50 md-small-size-100">
                    <form>
                      <div class="md-layout">
                        <div class="md-layout-item md-size-75">
                          <md-field class>
                            <md-icon>monetization_on</md-icon>
                            <label>Precio...*</label>
                            <md-input v-model="propiedad.precio" type="number" ></md-input>
                          </md-field>
                        </div>
                        <div class="md-layout-item md-size-25">
                          <md-field>
                            <label>Moneda</label>
                            <md-select v-model="propiedad.moneda">
                              <md-option value="clp">CLP</md-option>
                              <md-option value="uf">UF</md-option>
                            </md-select>
                          </md-field>
                        </div>
                      </div>
                      <md-field class="">
                        <md-icon>pin_drop</md-icon>
                        <label>Dirección...*</label>
                        <md-input v-model="propiedad.direccion" type="text" ></md-input>
                      </md-field>
                      <md-field class="">
                        <md-icon>location_searching</md-icon>
                        <label>Latitud...</label>
                        <md-input v-model="propiedad.latitud" type="text"></md-input>
                      </md-field>
                      <md-field class="">
                        <md-icon>location_searching</md-icon>
                        <label>Longitud...</label>
                        <md-input v-model="propiedad.longitud" type="text"></md-input>
                      </md-field>
                      <md-field class="">
                        <md-icon>build</md-icon>
                        <label>
                          Metros construidos m
                          <SUP>2</SUP>...*
                        </label>
                        <md-input v-model="propiedad.metros_construidos" type="number"></md-input>
                      </md-field>
                      <md-field class="">
                        <md-icon>terrain</md-icon>
                        <label>Supercifie del terreno...*</label>
                        <md-input v-model="propiedad.superficie_terreno" type="number"></md-input>
                      </md-field>
                      <md-field>
                        <md-icon>home_work</md-icon>
                        <label for="country">Tipo de Propiedad *</label>
                        <md-select v-model="propiedad.id_tipo_propiedad" >
                          <md-option
                            v-for="item in tipoPropiedad"
                            
                            :value="item.id"
                          >{{ item.nombre }}</md-option>
                        </md-select>
                      </md-field>
                      <md-field class="">
                        <md-icon>location_city</md-icon>
                        <label>Región...*</label>
                        <md-select
                          v-model="propiedad.id_region"
                          @md-selected="loadComunasInRegion"
                          
                        >
                          <md-option
                            v-for="item in regiones"
                            
                            :value="item.id"
                          >{{ item.nombre }}</md-option>
                        </md-select>
                      </md-field>
                      <md-field class="">
                        <md-icon>location_city</md-icon>
                        <label>Comuna...*</label>
                        <md-select
                          v-model="propiedad.id_comuna"
                          @md-selected="loadZonasInComuna"
                          
                        >
                          <md-option
                            v-for="item in comunas"
                            
                            :value="item.id"
                          >{{ item.nombre }}</md-option>
                        </md-select>
                      </md-field>
                      <md-field class="">
                        <md-icon>location_city</md-icon>
                        <label>Zona a la que pertenece...*</label>
                        <md-select v-model="propiedad.id_zona" >
                          <md-option
                            v-for="item in zonas"
                            
                            :value="item.id"
                          >{{ item.nombre }}</md-option>
                        </md-select>
                      </md-field>
                      <md-field>
                        <label>Características</label>
                        <md-select v-model="propiedad.caracteristicas" multiple>
                          <md-option
                            v-for="item in caracteristicas"
                            
                            :value="item.id"
                          >{{item.nombre}}</md-option>
                        </md-select>
                      </md-field>
                      <md-field>
                        <label>Restricciones</label>
                        <md-select v-model="propiedad.restricciones" multiple>
                          <md-option
                            v-for="item in restricciones"
                            
                            :value="item.id"
                          >{{item.nombre}}</md-option>
                        </md-select>
                      </md-field>
                      <h3>Habitaciones</h3>
                      <md-button
                        @click="addHabitaciones()"
                        class="md-icon-button md-raised md-success"
                      >
                        <md-icon>add</md-icon>
                      </md-button>
                      <template>
                        <div
                          class="md-layout md-alignment-center"
                          v-for="(habitacion, index) in habitaciones"
                          
                        >
                          <div
                            class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
                          >
                            <label for="country">Tipo de habitación</label>
                            <md-field>
                            <md-select v-model="habitacion.id_habitacion" >
                              <md-option
                                v-for="item in habitacionesDB"
                               
                                :value="item.id"
                              >{{ item.nombre }}</md-option>
                            </md-select>
                            </md-field>
                          </div>
                          <div
                            class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
                          >
                            <md-field class="">
                              <md-icon>format_list_numbered</md-icon>
                              <label>Cantidad por este tipo...*</label>
                              <md-input v-model="habitaciones[index].cantidad" type="number" />
                            </md-field>
                          </div>
                          <md-button
                            @click="deleteHabitaciones(index)"
                            class="md-icon-button md-raised md-danger"
                          >
                            <md-icon>delete_forever</md-icon>
                          </md-button>
                        </div>
                      </template>
                      <br />
                      <label class="text-center">***Los campos con ‘*’ son obligatorios***</label>
                      <br />
                    </form>
                  </div>
                </div>
              </md-card-content>
            </md-card>
          </div>
        </div>
      </div>
      <div class="container mt-0">
        <div class="md-layout">
          <div class="md-layout-item md-size-80 md-small-size-100 mx-auto text-center">
            <md-card class="md-card md-card-signup">
              <md-card-content>
                <h2 class="card-title text-center">Contenido de la publicación</h2>
                <div class>
                  <div class="text-center md-size-40 md-medium-size-50 md-small-size-100">
                    <form>
                      <md-field class="">
                        <md-icon>title</md-icon>
                        <label>Título de la publicación *</label>
                        <md-input v-model="publicacion.titulo" type="text" />
                        <span class="md-error">There is an error</span>
                      </md-field>
                      <md-field>
                        <md-icon>description</md-icon>
                        <label>Descripción...*</label>
                        <md-textarea required v-model="publicacion.descripcion"></md-textarea>
                        <md-icon>description</md-icon>
                      </md-field>
                      <md-field>
                        <md-icon>home_work</md-icon>
                        <label for="country">Tipo de Publicación *</label>
                        <md-select
                          v-model="publicacion.id_tipo_publi"
                          name="country"
                          id="country"
                          md-dense
                        >
                          <md-option
                            v-for="item in tipoPublicacion"
                            
                            :value="item.id"
                          >{{ item.nombre }}</md-option>
                        </md-select>
                      </md-field>
                      <md-field>
                        <md-icon>movie_creation</md-icon>
                        <label>Video...</label>
                        <md-input
                          v-model="publicacion.video"
                          type="text"
                          aria-placeholder="ashhasd"
                        />
                        <span class="md-error">There is an error</span>
                      </md-field>

                      <md-field>
                        <label>Imagenes *</label>
                        <!-- burst_mode     icono de fotos-->
                        <md-file
                          v-model="imagenes"
                          accept="image/*"
                          @change="imageChange"
                          placeholder="En esta sección tienes que cargar todas tus imágenes"
                          multiple
                        />
                      </md-field>
                      <div class="justify-content-center" v-if="imagenesGallery.length>0">
                        <h3 class="text-center">Seleciona la imagen principal</h3>
                        <div
                          class="md-layout-item md-small-size-100"
                          style="margin-top:1%; margin-bottom:1%"
                        >
                          <div class="md-layout">
                            <div
                              class="md-layout-item md-size-25"
                              v-for="(imagen, key) in imagenesGallery"
                            >
                              <img :src="imagen" />
                              <md-radio v-model="publicacion.imagenprincipal" :value="key">{{key}}</md-radio>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="justify-content-center" v-else>
                        <h3 class="text-center">Seleciona la imagen principal</h3>
                        <div
                          class="md-layout-item md-small-size-100"
                          style="margin-top:1%; margin-bottom:1%"
                        >
                          <div class="md-layout">
                            <div
                              class="md-layout-item md-size-25"
                              v-for="(imagen, key) in imagenesCargadas"
                              
                            >
                              <img
                                :src="'http://127.0.0.1:8000/storage/gallery_products/'+imagen.url"
                              />
                              <md-radio
                                v-model="publicacion.imageMain"
                                :value="key"
                              >{{key}}</md-radio>
                            </div>
                          </div>
                        </div>
                      </div>
                      <br />
                      <label class="text-center">***Todos los campos son requeridos***</label>
                      <br />
                      <div class="button-container justify-content-center">
                        <md-button
                          v-on:click="submitPublication()"
                          class="md-primary md-round mt-3"
                        >Publicar</md-button>
                      </div>
                    </form>
                  </div>
                </div>
              </md-card-content>
            </md-card>
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
      <footer class="footer">
        <div class="container flex-direction-row">
          <nav>
            <ul>
              <li class style="color: white;">Nuestras redes:</li>
              <li>
                <a href="https://www.twitter.com">
                  <md-button :class="'md-just-icon md-round md-' + colors[0].name">
                    <i :class="'fab fa-' + colors[0].icon" />
                  </md-button>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com">
                  <md-button :class="'md-just-icon md-round md-' + colors[1].name">
                    <i :class="'fab fa-' + colors[1].icon" />
                  </md-button>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/">
                  <md-button :class="'md-just-icon md-round md-' + colors[3].name">
                    <i :class="'fab fa-' + colors[3].icon" />
                  </md-button>
                </a>
              </li>
            </ul>
          </nav>
          <div
            class="copyright"
          >&copy;Copyright {{ year }} Corretaje Colaborativo - Todos los derechos reservados.</div>
        </div>
      </footer>
    </parallax>
  </div>
</template>

<script>
import Mixins from "@/plugins/basicMixins";
import { userService } from "../../services/users/Personas.service";
import { restriccionService } from "../../services/other/Restricciones.service";
import { caracteristicaService } from "../../services/other/Caracteristica.service";
import { tipoPropiedadService } from "../../services/other/TipoPropiedad.service";
import { tipoPublicacionService } from "../../services/other/TipoPublicacion.service";
import { zonaService } from "../../services/location/Zona.service";
import { zonaInComunaService } from "../../services/location/ZonaInComuna.service";
import { regionService } from "../../services/location/Region.service";
import { comunaInRegionService } from "../../services/location/ComunaInRegion.service";
import { createPublicationService } from "../../services/publication/CreatePublication.service";
import { habitacionService } from "../../services/other/Habitaciones.service";
import { getPublicationUpdateService } from "../../services/publication/GetPublicationUpdate.service";
import { updatePublicationService } from "../../services/publication/UpdatePublication.service";

export default {
  components: {},
  mixins: [Mixins.HeaderImage],
  bodyClass: "signup-page",
  data() {
    return {
      colors: [
        {
          name: "twitter",
          icon: "twitter",
          iconSquare: "twitter",
          btnText: "connect with twitter"
        },
        {
          name: "facebook",
          icon: "facebook-f",
          iconSquare: "facebook-square",
          btnText: "share · 2.2k"
        },
        {
          name: "google",
          icon: "google-plus-g",
          iconSquare: "google-plus-square",
          btnText: "share on google+"
        },
        {
          name: "linkedin",
          icon: "linkedin",
          iconSquare: "linkedin",
          btnText: "connect with linkedin"
        },
        {
          name: "pinterest",
          icon: "pinterest-p",
          iconSquare: "pinterest",
          btnText: "pin it · 212"
        },
        {
          name: "youtube",
          icon: "youtube",
          iconSquare: "youtube",
          btnText: "view on youtube"
        },
        {
          name: "repost",
          icon: "tumblr",
          iconSquare: "tumblr-square",
          btnText: "repost"
        },
        {
          name: "github",
          icon: "github",
          iconSquare: "github",
          btnText: "connect with github"
        },
        {
          name: "behance",
          icon: "behance-square",
          iconSquare: "behance-square",
          btnText: "follow us"
        },
        {
          name: "dribbble",
          icon: "dribbble",
          iconSquare: "dribbble",
          btnText: "find us on dribbble"
        },
        {
          name: "reddit",
          icon: "reddit",
          iconSquare: "reddit",
          btnText: "repost · 232"
        }
      ],
      boolean: null,
      propiedad: {
        id: 0,
        moneda: "clp",
        direccion: "",
        latitud: "",
        longitud: "",
        precio: null,
        id_comuna: 1,
        metros_construidos: 0,
        superficie_terreno: 0,
        id_tipo_propiedad: 0,
        id_region: 0,
        id_comuna: 0,
        id_zona: 0,
        restricciones: [],
        caracteristicas: [],
        habitaciones: []
      },
      publicacion: {
        propiedad: {},
        imagenprincipal: 0,
        imageMain: 0,
        isNewImage: false,
        id_propiedad: 0,
        titulo: "",
        descripcion: "",
        id_tipo_publi: 0,
        id_autor: 1,
        video: "",
        images: null
      },
      habitaciones: [
        {
          id_habitacion: 0,
          cantidad: 1
        }
      ],
      archivo: {},
      imagenes: null,
      imagenesCargadas: null,
      caracteristicas: [],
      restricciones: [],
      tipoPropiedad: [],
      regiones: [],
      comunas: [],
      zonas: [],
      tipoPublicacion: [],
      image: require("@/assets/img/inmo/house_pool.jpg"),
      year: new Date().getFullYear(),
      imagenesGallery: [],
      showSnackbar: false,
      textSnackbar: "",
      colorSnackbar: "",
      timeout: 4000,
      habitacionesDB: [],
      idPublication: 0
    };
  },
  methods: {
    addHabitaciones() {
      let vm = this;
      var newHabitacion = {
        id_habitacion: 0,
        cantidad: 1
      };
      vm.habitaciones.push(newHabitacion);
    },
    deleteHabitaciones(index) {
      console.log("entra a eliminar");
      let vm = this;
      vm.$delete(vm.habitaciones, index);
      console.log(vm.habitaciones);
    },
    imageChange(e) {
      this.publicacion.isNewImage = true;
      this.imagenesGallery = [];
      for (var i = 0; i < e.target.files.length; i++) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[i]);
        fileReader.onload = e => {
          this.imagenesGallery.push(e.target.result);
        };
      }
      
      this.publicacion.images = this.imagenesGallery;
      console.log(this.publicacion.images);
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
    loadRegiones() {
      let vm = this;
      regionService.query().then(data => {
        vm.regiones = data.body;
      });
    },
    loadHabitaciones() {
      let vm = this;
      habitacionService.query().then(data => {
        vm.habitacionesDB = data.body;
      });
    },
    loadComunasInRegion() {
      let vm = this;
      console.log("carga las counas de la region");
      comunaInRegionService.getById(vm.propiedad.id_region).then(data => {
        vm.comunas = data.body;
      });
    },
    loadZonasInComuna() {
      let vm = this;
      zonaInComunaService.getById(vm.propiedad.id_comuna).then(data => {
        vm.zonas = data.body;
      });
    },
    loadTipoPropiedad() {
      let vm = this;
      tipoPropiedadService.query().then(data => {
        vm.tipoPropiedad = data.body;
      });
    },
    loadTipoPublicacion() {
      let vm = this;
      tipoPublicacionService.query().then(data => {
        vm.tipoPublicacion = data.body;
      });
    },
    validarFormulario() {
      let vm = this;
    },
    loadPublication() {
      let vm = this;
      getPublicationUpdateService.getById(vm.idPublication).then(data => {
        console.log(data.body);
        vm.publicacion = data.body[1];
        vm.propiedad = data.body[0];
        vm.propiedad.caracteristicas = data.body[3];
        vm.propiedad.restricciones = data.body[2];
        vm.habitaciones = data.body[5];
        vm.imagenesCargadas = data.body[4];
        vm.publicacion.images = vm.imagenesCargadas;
        
        vm.publicacion.isNewImage = false;
        console.log(vm.publicacion);
      });
    },
    submitPublication() {
      let vm = this;
      vm.publicacion.id_user = parseInt(localStorage.getItem("user"))
      vm.propiedad.habitaciones = vm.habitaciones
      vm.publicacion.propiedad = vm.propiedad
      //vm.publicacion.imagenprincipal = vm.publicacion.imageMain 
      console.log(vm.publicacion);
      updatePublicationService
        .update(vm.publicacion.id, vm.publicacion)
        .then(data => {
          if (data.body.original === "error") {
            vm.textSnackbar =
              "Hubo un error al actualizar la publicación, Verifica si faltan datos";
            vm.showSnackbar = true;
            vm.colorSnackbar = "background-color: darkred";
          } else {
            vm.textSnackbar = "La publicación fue actualizada con éxito.";
            vm.showSnackbar = true;
            vm.colorSnackbar = "background-color: green;";
            setTimeout(function() {
              vm.$router.push({ name: "ecommerce-page" });
            }, 4000);
          }
        });
    }
  },
  mounted() {
    let vm = this;
    vm.idPublication = vm.$route.params.id
    vm.loadRestricciones();
    vm.loadCaracteristicas();
    vm.loadTipoPropiedad();
    vm.loadRegiones();
    vm.loadTipoPublicacion();
    vm.loadHabitaciones();
    vm.loadPublication();
  },
  computed: {
    messageClass() {
      return {
        "md-invalid": this.hasMessages
      };
    }
  }
};
</script>

<style lang="scss"></style>
