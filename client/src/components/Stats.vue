<template>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-4">
    <div class="col">
      <div class="card h-100">
        <div class="card-body d-flex align-items-center">
          <div class="card-text">
            <div class="row align-items-center">
              <div class="col-4">
                <i class="bi bi-people-fill big-icon ms-3 me-5"></i>
              </div>
              <div class="col-8 text-center">
                <p class="lead m-0">21</p>
                <p class="lead m-0">Total Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100">
        <div class="card-body d-flex align-items-center">
          <div class="card-text">
            <div class="row align-items-center">
              <div class="col-4">
                <i class="bi bi-card-text big-icon ms-3 me-5"></i>
              </div>
              <div class="col-8 text-center">
                <p class="lead m-0">122</p>
                <p class="lead m-0">Total Notes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100">
        <div class="card-body d-flex align-items-center">
          <div class="card-text">
            <div class="row align-items-center">
              <div class="col-4">
                <i class="bi bi-pencil-square big-icon ms-3 me-5"></i>
              </div>
              <div class="col-8 text-center">
                <p class="lead m-0">87</p>
                <p class="lead m-0">Commited edits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100">
        <div class="card-body d-flex align-items-center">
          <div class="card-text">
            <div class="row align-items-center">
              <div class="col-4">
                <i class="bi bi-card-checklist big-icon ms-3 me-5"></i>
              </div>
              <div class="col-8 text-center">
                <p class="lead m-0">99</p>
                <p class="lead m-0">Marked done</p>
              </div>
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
};
</script>

<style>
.big-icon {
  font-size: 3rem;
}
</style>
