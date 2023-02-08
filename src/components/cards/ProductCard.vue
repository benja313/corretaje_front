<template>
  
  <md-card
    class="md-card-product"
    :class="{
      'md-card-plain': cardPlain
    }"
  >
    <md-card-header
      class="md-card-header-image"
      :shadow-normal="shadowNormal"
      :shadow-off="shadowOff"
      :no-colored-shadow="noColoredShadow"
      style="height: auto;"
    >
      <a >
        <img
          class="img"
          :src="cardImage"
          style="height: 12rem;
            object-fit: cover;
            object-position: center center;
            background-size: cover;"
        >
      </a>
      <div
        v-if="!noColoredShadow && !shadowNormal && !shadowOff"
        class="colored-shadow"
        :style="shadowImageBlog(cardImage)"
      />
    </md-card-header>

    <md-card-content
      v-if="$slots.cardContent"
      :class="{ 'text-center': textCenter }"
    >
      <slot name="cardContent" />
    </md-card-content>

    <md-card-actions v-if="$slots.cardAction">
      <slot name="cardAction" />
    </md-card-actions>
    <div class="centerZone" v-if="$slots.cardAction">
      <slot name="cardZone" />
    </div>
    <div class="centerZone2" style="margin-right: 2% !important; margin-left: 2% !important" v-if="$slots.cardAction">
      <slot name="cardZone2" />
    </div>
    <div class="" >
      <slot name="cardPrice" />
    </div>
  </md-card>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    type: String,
    textCenter: Boolean,
    reverseRow: Boolean,
    cardImage: String,
    shadowNormal: Boolean,
    shadowOff: Boolean,
    cardPlain: Boolean,
    noColoredShadow: Boolean
  },
  methods: {
    shadowImageBlog(image) {
      return {
        backgroundImage: `url(${image})`,
        opacity: 1,
      };
    }
  }
};
</script>

<style lang="scss" scoped>
  .centerZone{
    margin: auto;
  }
</style>
