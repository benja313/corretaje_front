import Vue from "vue";
import Router from "vue-router";

//  Main Pages
import Index from "./views/Index.vue";
import Sections from "./views/Sections.vue";
import Presentation from "./views/Presentation.vue";
//  Main Examples
import Landing from "./views/examples/Landing.vue";
import Login from "./views/examples/Login.vue";
import Profile from "./views/Profile.vue";
import AboutUs from "./views/examples/AboutUs.vue";
import ContactUs from "./views/examples/ContactUs.vue";
import Pricing from "./views/examples/Pricing.vue";
import EcommercePropiedades from "./views/examples/Ecommerce.vue";
import Product from "./views/examples/Product.vue";
import Signup from "./views/examples/Signup.vue";
import NewPublication from "./views/examples/NewPublication.vue";
import EditPublication from "./views/examples/EditPublication.vue";
import Error from "./views/examples/Error.vue";
import AdminUsers from "./views/admin/UsersAdmin.vue"
import AdminCategorias from "./views/admin/Categorias"
import AdminRestricciones from "./views/admin/Restricciones"
import AdminZonas from "./views/admin/Zonas"
import AdminBancos from "./views/admin/Bancos"
import AdminRegiones from "./views/admin/Regiones"
import AdminComunas from "./views/admin/Comunas"
import AdminVentas from "./views/admin/Ventas"
import adminPublicaciones from "./views/admin/PublicacionesAdmin"
import Maintainer from "./views/examples/Maintainer"
import NewVenta from "./views/examples/NewVenta"
import MyPublications from "./views/examples/MyPublications"
import AprobatePublications from "./views/examples/AprobatePublications"
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      
      path: "/maintainer",
      name: "maintainer",
      components: { default: Maintainer, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: false }
      },
      beforeEnter: (to, from, next) => {
        if ( localStorage.tipo === '7') next()
        else next({path: '/'})
      }
    },
    {
      path: "/adminUsers",
      name: "adminUsers",
      components: { default: AdminUsers, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: false }
      },
      beforeEnter: (to, from, next) => {
        if ( localStorage.tipo === '7') next()
        else next({path: '/'})
      }
    },
    {
      path: "/adminCaracteristics",
      name: "adminCategorias",
      components: { default: AdminCategorias, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: false }
      },
      beforeEnter: (to, from, next) => {
        if ( localStorage.tipo === '7') next()
        else next({path: '/'})
      }
    },
    {
      path: "/adminRestriction",
      name: "adminRestricciones",
      components: { default: AdminRestricciones, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: false }
      },
      beforeEnter: (to, from, next) => {
        if ( localStorage.tipo === '7') next()
        else next({path: '/'})
      }
    },
    {
      path: "/adminPublicaciones",
      name: "adminPublicaciones",
      components: { default: adminPublicaciones, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: false }
      },
      beforeEnter: (to, from, next) => {
        if ( localStorage.tipo === '7') next()
        else next({path: '/'})
      }
    },
    {
      path: "/myPublications",
      name: "myPublications",
      components: { default: MyPublications, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: false }
      },
      beforeEnter: (to, from, next) => {
        if ( localStorage.tipo === '7' || localStorage.tipo === '2' || localStorage.tipo === '1') next()
        else next({path: '/'})
      }
    },
    {
      path: "/aprobatePublications",
      name: "aprobatePublications",
      components: { default: AprobatePublications, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: false }
      },
      beforeEnter: (to, from, next) => {
        if ( localStorage.tipo === '7' || localStorage.tipo === '2') next()
        else next({path: '/'})
      }
    },
    {
      path: "/adminZone",
      name: "adminZonas",
      components: { default: AdminZonas, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: false }
      },
      beforeEnter: (to, from, next) => {
        if ( localStorage.tipo === '7') next()
        else next({path: '/'})
      }
    },
    {
      path: "/adminCommune",
      name: "adminComunas",
      components: { default: AdminComunas, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: false }
      },
      beforeEnter: (to, from, next) => {
        if ( localStorage.tipo === '7') next()
        else next({path: '/'})
      }
    },
    {
      path: "/sales",
      name: "sales",
      components: { default: AdminVentas, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: false }
      },
      beforeEnter: (to, from, next) => {
        if ( localStorage.tipo === '7') next()
        else next({path: '/'})
      }
    },
    {
      path: "/adminBanks",
      name: "adminBanks",
      components: { default: AdminBancos, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: false }
      },
      beforeEnter: (to, from, next) => {
        if ( localStorage.tipo === '7') next()
        else next({path: '/'})
      }
    },
    {
      path: "/adminState",
      name: "adminState",
      components: { default: AdminRegiones, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: false }
      },
      beforeEnter: (to, from, next) => {
        if ( localStorage.tipo === '7') next()
        else next({path: '/'})
      }
    },
    {
      path: "/about-us",
      name: "about-us",
      components: { default: AboutUs, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: true }
      }
    },
    
    {
      path: "/propiedades",
      name: "ecommerce-page",
      components: {
        default: EcommercePropiedades,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: true },
        footer: { type: "black" }
      }
    },
    {
      path: "/publicacion/:id",
      name: "product-page",
      components: {
        default: Product,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: true }
      }
    },
    {
      path: "/newSale/:id",
      name: "newSale",
      components: {
        default: NewVenta,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: true }
      },
      beforeEnter: (to, from, next) => {
        if ( localStorage.tipo === '2' || localStorage.tipo === '7') next()
        else next({path: '/'})
      }
    },
    {
      path: "/",
      name: "landing",
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: true }
      }
    },
    {
      path: "/login-page",
      name: "login",
      components: { default: Login, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: true }
      },
    },
    {
      path: "/profile-page",
      name: "profile",
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: true }
      },
      beforeEnter: (to, from, next) => {
        if (localStorage.tipo === '2' || localStorage.tipo === '1' || localStorage.tipo === '7') next()
        else next({path: '/'})
      }
    },
    {
      path: "/signup-page",
      name: "signup",
      components: { default: Signup, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: true }
      }
    },
    {
      path: "/newPublication",
      name: "newPublication",
      components: { default: NewPublication, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: true }
      },
      beforeEnter: (to, from, next) => {
        if ( localStorage.tipo === '7' || localStorage.tipo === '2' || localStorage.tipo === '1') next()
        else next({path: '/'})
      }
    },
    {
      path: "/editPublication/:id",
      name: "editPublication",
      components: { default: EditPublication, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: true }
      },
      beforeEnter: (to, from, next) => {
        if ( localStorage.tipo === '7' || localStorage.tipo === '2' || localStorage.tipo === '1') next()
        else next({path: '/'})
      }
    },
    {
      path: "/*",
      name: "error",
      components: { default: Error, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: true }
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
