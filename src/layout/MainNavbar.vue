<template>
  <md-toolbar
    id="toolbar"
    md-elevation="0"
    class="md-fixed"
    :class="{
      [`md-${type}`]: !navbarTransparent,
      [extraNavClasses]: navbarTransparent,
      'md-transparent': navbarTransparent
    }"
    :color-on-scroll="colorOnScroll"
  >
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <router-link :to="'/'">
          <!-- <h3 class="md-title">
          {{ brand }}
        </h3> -->
        <img :src="logo" style="height: 4.5em">
        </router-link>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: toggledClass }"
          @click="toggleNavbarMobile()"
        >
          <span class="icon-bar" />
          <span class="icon-bar" />
          <span class="icon-bar" />
        </md-button>

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>
            <md-list>
              <li class="md-list-item">
                <md-button
                  @click="route('ecommerce-page')"
                  class="md-simple md-white ">
                  Publicaciones
                </md-button>
              </li>
              <li
               
                class="md-list-item"
              >
                <md-button
                  @click="route('maintainer')"
                  class="md-simple md-white"
                  v-if="typeAccount === '7'">
                  Administración
                </md-button>
              </li>

              <li class="md-list-item">
                <md-button
                  @click="route('profile')"
                  class="md-simple md-white"
                  v-if="isLogin">
                  Perfil
                </md-button>
              </li>
              <li class=""  style="margin-right:1% !important; margin-left:1% !important;">
                <md-button v-if="!isLogin"
                      class="md-success md-round"
                      @click="route('login')"
                    >login</md-button>
              </li>
              <li class="" style="margin-right:1% !important; margin-left:1% !important;">
                <md-button
                      class="md-info md-round"
                      @click="route('signup')"
                      v-if="!isLogin"
                    >Registrate</md-button>
              </li>
              <li class="" style="margin-right:1% !important; margin-left:1% !important;">
                <md-button v-if="isLogin"
                      class="md-primary md-round"
                      @click="route('newPublication')"
                    >Publicar</md-button>
              </li>
              <li class="" style="margin-right:1% !important; margin-left:1% !important;">
                <md-button v-if="isLogin"
                      class="md-danger md-round"
                      @click="logout"
                    ><md-icon>arrow_forward</md-icon>
                    <md-tooltip
                        md-direction="bottom"
                      >
                        Salir y cerrar sesión
                      </md-tooltip></md-button>
              </li>
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

import MobileMenu from "@/layout/MobileMenu";
import Credentials from '../services/Credentials.service.js'

const credentials = new Credentials()
export default {
  components: {
    MobileMenu
  },
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info",
          "dark"
        ].includes(value);
      }
    },
    colorOnScroll: {
      type: Number,
      default: 0
    },
    navbarTransparent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      docs_link:
        "https://demos.creative-tim.com/vue-material-kit-pro/documentation/",
      extraNavClasses: "",
      toggledClass: false,
      brand: "Corretaje Colaborativo",
      isLogin: false,
      typeAccount: 0,
      logoutRecent: false,
      logo: require("@/assets/img/logoPropiedades.png"),
    };
  },
  computed: {
    showDownload() {
      const excludedRoutes = ["index"];
      return excludedRoutes.every(r => r !== this.$route.name);
    }
  },
  mounted() {
    if(credentials.isLogin() && this.$route.name == 'login'){
      this.$router.push({name: 'landing'})
    }
    
    document.addEventListener("scroll", this.scrollListener);
    this.isLogin = credentials.isLogin()
    this.typeAccount = credentials.getCurrentUserTipo()
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  },
  methods: {
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");

      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);

        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    route(ruta){
      let vm = this
      this.$router.push({name: ruta})
    },
    logout(){
      credentials.clearCredentials()
      window.location.reload()
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
    handleScroll() {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop;
      let navbarColor = document.getElementById("toolbar");
      this.currentScrollValue = scrollValue;
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`;
        navbarColor.classList.remove("md-transparent");
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = "";
          navbarColor.classList.add("md-transparent");
        }
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    }
  }
};
</script>
