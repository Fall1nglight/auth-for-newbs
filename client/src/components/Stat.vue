<template>
  <div class="col">
    <div class="card h-100">
      <!-- center card content horizontally and vertically -->
      <!-- in case the the text extends the div -->
      <!-- because of the same height | h-100 -->

      <div class="card-body d-flex justify-content-center align-items-center">
        <div class="row justify-content-center ">
          <!-- center icon horizontally and vertically -->

          <div class="col-4 d-flex justify-content-center align-items-center">
            <i :class="[`bi bi-${icon}`, 'big-icon']"></i>
          </div>

          <!-- center text horizontally and vertically -->
          <!-- text-center instead of justify-content-center -->
          <!-- as we only use <p> element -->
          <div class="col-4 col-md-8 text-center d-flex align-items-center">
            <p class="lead m-0">
              {{ value }}
              <br />
              <slot></slot>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stat',
  props: {
    icon: String,
    value: Number,
  },
};
</script>

<style scoped>
.big-icon {
  font-size: 3rem;
}
</style>
