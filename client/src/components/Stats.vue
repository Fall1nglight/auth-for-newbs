<template>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-4">
    <div class="col">
      <div class="card h-100">
        <div class="card-body">
          <div class="row justify-content-center ">
            <!-- center icon horizontally -->
            <div class="col-4 d-flex justify-content-center align-items-center">
              <i class="bi bi-people-fill big-icon"></i>
            </div>
            <div class="col-4 col-md-6 text-center d-flex align-items-center">
              <p class="lead m-0">
                21
                <br />
                Total Users
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100">
        <div class="card-body">
          <div class="row justify-content-center ">
            <!-- center icon horizontally -->
            <div class="col-4 d-flex justify-content-center align-items-center">
              <i class="bi bi-card-text big-icon"></i>
            </div>
            <div class="col-4 col-md-6 text-center d-flex align-items-center">
              <p class="lead m-0">
                21
                <br />
                Total Notes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100">
        <div class="card-body">
          <div class="row justify-content-center ">
            <!-- center icon horizontally -->
            <div class="col-4 d-flex justify-content-center align-items-center">
              <i class="bi bi-pencil-square big-icon"></i>
            </div>
            <div class="col-4 col-md-6 text-center d-flex align-items-center">
              <p class="lead m-0">
                21
                <br />
                Total Edits
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col">
      <div class="card h-100">
        <div class="card-body">
          <div class="row justify-content-center ">
            <!-- center icon horizontally -->
            <div class="col-4 d-flex justify-content-center align-items-center">
              <i class="bi bi-card-checklist big-icon"></i>
            </div>
            <div class="col-4 col-md-6 text-center d-flex align-items-center">
              <p class="lead m-0">
                21
                <br />
                Marked Done
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stats',

  // todo | add admin / users module to vuex
  // todo | add methods
  // todo | correct css layout
  // todo | center div insede card
};
</script>

<style>
.big-icon {
  font-size: 3rem;
}
</style>
