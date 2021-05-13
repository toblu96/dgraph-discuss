<template>
  <div class="lg:px-12 p-6">
    <!-- Breadcrumb -->
    <portal to="subheader-breadcrumb">
      <div class="flex items-center space-x-4">
        <li>
          <div class="flex items-center">
            <!-- Heroicon name: solid/chevron-right -->
            <svg
              class="flex-shrink-0 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <div class="ml-4 text-sm font-medium text-gray-400">Settings</div>
          </div>
        </li>
      </div>
    </portal>
    <!-- Content -->
    <UserSettings />
  </div>
</template>

<script>
export default {};
</script>
