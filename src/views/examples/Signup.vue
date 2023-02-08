<template>
  <div class="wrapper">
    <parallax
      class="page-header header-filter"
      parallax-active="false"
      :style="headerStyle"
    >
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-80 md-small-size-100 mx-auto text-center"
          >
            <md-card class="md-card md-card-signup">
              <md-card-content>
                <h2 class="card-title text-center">
                  Registrar
                </h2>
                <div class="md-layout">
                  <div
                    class="md-layout-item md-size-50 md-small-size-100 ml-auto"
                  >
                    <template v-for="item in contentLeft">
                      <InfoAreas
                        :key="item.title"
                        text-left
                        info-horizontal
                        :icon-color="item.colorIcon"
                        :icon="item.icon"
                      >
                      <md-icon>show_chart</md-icon>
                        <h4
                          slot="title"
                          class="info-title"

                        >
                          {{ item.title }}
                        </h4>
                        <div
                          slot="content"
                          class="description"
                        >
                          <p>{{ item.description }}</p>
                        </div>
                      </InfoAreas>
                    </template>
                  </div>
                  <div
                    class="md-layout-item md-size-40 md-medium-size-50 md-small-size-100 mr-auto"
                  >
                    <div class="social-line text-center">
                      <md-button class="md-just-icon md-round md-twitter">
                        <i class="fab fa-twitter" />
                      </md-button>
                      <md-button class="md-just-icon md-round md-dribbble">
                        <i class="fab fa-dribbble" />
                      </md-button>
                      <md-button class="md-just-icon md-round md-facebook">
                        <i class="fab fa-facebook-f" />
                      </md-button>
                      <h4 class="mt-3">
                        o estilo clasico
                      </h4>
                    </div>
                    <form>
                      <md-field
                        class="md-form-group"
                      >
                        <md-icon>face</md-icon>
                        <label>Nombres...</label>
                        <md-input
                          v-model="usuario.nombres"
                          type="text"
                          
                          aria-required="required"
                        />
                      </md-field>
                      <md-field
                        class="md-form-group"
                      >
                        <md-icon>face</md-icon>
                        <label>Apellido Paterno...</label>
                        <md-input
                          v-model="usuario.apellido_p"
                          type="text"
                          aria-required="required"
                        />
                      </md-field>
                      <md-field
                        class="md-form-group"
                      >
                        <md-icon>face</md-icon>
                        <label>Apellido Materno...</label>
                        <md-input
                          v-model="usuario.apellido_m"
                          type="text"
                          aria-required="required"
                        />
                      </md-field>
                      <md-field
                        class="md-form-group"
                      >
                        <md-icon>perm_identity</md-icon>
                        <label>Rut...</label>
                        <md-input
                          v-model="usuario.rut"
                          type="text"
                          aria-required="required"
                        />
                      </md-field>
                      <md-field
                        class="md-form-group"
                      >
                        <md-icon>email</md-icon>
                        <label>Mail...</label>
                        <md-input
                          v-model="usuario.email"
                          type="email"
                          aria-required="required"
                        />
                      </md-field>
                      <md-field class="md-form-group">
                        <md-icon>phone</md-icon>
                        <label>Teléfono...</label>
                        <md-input
                          v-model="usuario.telefono"
                          type="phone"
                          aria-required="required"
                        />
                      </md-field>
                      <md-field>
                      <label for="country">Sexo</label>
                      <md-select v-model="usuario.id_sexo" name="country" id="country" md-dense>
                        <md-option  v-for="item in sexos" v-bind:key="item.id" :value="item.id">{{ item.nombre }}</md-option>
                      </md-select>
                    </md-field>
                    <md-field class="md-form-group">
                        <md-icon>lock</md-icon>
                        <label>Contraseña...</label>
                        <md-input
                          v-model="usuario.password"
                          type="password"
                          aria-required="required"
                        />
                      </md-field>
                      <md-checkbox
                        v-model="boolean"
                      >
                        Acepto los 
                        <a>terminos y condiciones</a>.
                      </md-checkbox>
                      <div class="button-container justify-content-center">
                        <md-button
                          v-on:click="createUser()"
                          class="md-success md-round mt-3"
                        >
                          Registrarse
                        </md-button>
                      </div>
                    </form>
                  </div>
                </div>
              </md-card-content>
            </md-card>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="container flex-direction-row">
          <nav>
          <ul>
            <li class="" style="color: white;">
              Nuestras redes: 
            </li>
            <li>
              <a href="https://www.twitter.com">
                
                <md-button
            :class="'md-just-icon md-round md-' + colors[0].name"
          >
            <i :class="'fab fa-' + colors[0].icon" />
          </md-button>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com">
               <md-button
            :class="'md-just-icon md-round md-' + colors[1].name"
          >
            <i :class="'fab fa-' + colors[1].icon" />
          </md-button>
              </a>
            </li>
            <li>
              
              <a href="https://www.linkedin.com/">
                 <md-button
            :class="'md-just-icon md-round md-' + colors[3].name"
          >
            <i :class="'fab fa-' + colors[3].icon" />
          </md-button>
              </a>
            </li>
          </ul>
        </nav>
          <div class="copyright">
           &copy;Copyright {{ year }}  Corretaje Colaborativo - Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </parallax>
  </div>
</template>

<script>
import Mixins from '@/plugins/basicMixins'
import { InfoAreas } from '../../components'
import { userService } from '../../services/users/Personas.service'
import { sexoService } from '../../services/other/Sexo.service'

export default {
  components: {
    InfoAreas
  },
  mixins: [Mixins.HeaderImage],
  bodyClass: "signup-page",
  data() {
    return {
      boolean: null,
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
      usuario: {
        nombres: '',
        rut: '',
        apellido_p: '',
        apellido_m: '',
        emial: '',
        fecha_naci: '',
        telefono: '',
        password: '',
        id_sexo: 4
      },
      sexos: [],
      image: require("../../assets/img/inmo/interior_home.jpg"),
      year: new Date().getFullYear(),
      contentLeft: [
        {
          colorIcon: 'success',
          icon: "show_chart",
          title: "Publica",
          description:
            "Plataforma con gran experiencia de usuario, pensada en ofrecerte el mejor servicio para potenciar tu publicación."
        },

        {
          colorIcon: "info",
          icon: "group",
          title: "Equipo",
          description:
            "Un perfecto equipo que te ayuda y te asesora par que tomes la mejor decisión."
        }
      ],
      inputs: [
        {
          icon: "face",
          name: "Nombres...",
          nameAttr: "",
          type: "text"
        },
        {
          icon: "face",
          name: "Apellido Paterno...",
          nameAttr: "",
          type: "text"
        },
        {
          icon: "face",
          name: "Apellido Materno...",
          nameAttr: "",
          type: "text"
        },
        {
          icon: "face",
          name: "Rut...",
          nameAttr: "",
          type: "text"
        },
        {
          icon: "email",
          name: "Email...",
          nameAttr: "",
          type: "email"
        },
        {
          icon: "phone",
          name: "telefono...",
          nameAttr: "+569",
          type: "phone"
        },

        {
          icon: "lock_outline",
          name: "Contraseña..",
          nameAttr: "",
          type: "password"
        }
      ]
    };
  },
  methods: {
    createUser () {
      let vm = this
      console.log(vm.usuario);
      userService.save(vm.usuario).then(data => {
        //vm.usuario = data.body
        console.log(data.user)
        this.$router.push({name: 'login'})
      })
    },
    loadSexo (){
      let vm = this
      sexoService.query().then(data => {
        vm.sexos = data.body
        console.log(vm.sexos)
      })
    }
  },
   mounted () {
    let vm = this
    vm.loadSexo()
  }
};
</script>

<style lang="scss"></style>
