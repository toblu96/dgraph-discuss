<template>
  <div class="flex justify-between lg:px-8">
    <div>
      <nuxt-link to="/">
        <div class="flex items-center h-14">
          <div class="mr-5">
            <img
              style="filter: drop-shadow(1px 2px 2px white)"
              src="/images/diggy.png"
              class="h-20 transform translate-y-1/3"
            />
          </div>

          <div>
            <p class="text-2xl font-semibold text-pink-600">Dgraph</p>
            <p class="text-gray-500">DISCUSS</p>
          </div>
        </div>
      </nuxt-link>
    </div>
    <div class="flex items-center">
      <UserSelectMenu />
    </div>
  </div>
</template>

<script>
export default {};
</script>
