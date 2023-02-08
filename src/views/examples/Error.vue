<template>
  <div class="wrapper">
    <parallax
      class="page-header header-filter"
      parallax-active="false"
      :style="headerStyle"
    >
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-100 text-center">
            <h1 class="title">
              404
            </h1>
            <h2 class="description">
              Página no encontrada :(
            </h2>
            <h4 class="description">
              Ooooups! Parece que te has perdido.
            </h4>
          </div>
        </div>
      </div>
    </parallax>
  </div>
</template>

<script>
import Mixins from "@/plugins/basicMixins";

export default {
  mixins: [Mixins.HeaderImage],
  bodyClass: "error-page",
  data() {
    return {
      image: require("../../assets/img/inmo/pool_tropical.jpg")
    };
  }
};
</script>

<style lang="scss"></style>
