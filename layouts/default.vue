<template>
  <div class="h-screen flex overflow-hidden bg-gray-200">
    <div class="relative w-full flex overflow-hidden">
      <div class="flex flex-col w-full p-4">
        <div class="bg-gray-50 mb-2 p-4 rounded-md w-full max-w-7xl mx-auto">
          <Header />
        </div>
        <div
          class="bg-gray-800 rounded-t-md w-full max-w-7xl mx-auto overflow-hidden"
        >
          <Subheader />
        </div>
        <div
          class="bg-gray-50 flex-1 mb-2 rounded-b-md w-full max-w-7xl mx-auto overflow-hidden"
        >
          <div class="overflow-auto h-full">
            <div class="min-h-full">
              <div class="overflow-y-auto">
                <Nuxt />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 p-4 rounded-md w-full max-w-7xl mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

