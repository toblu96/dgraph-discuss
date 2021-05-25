<template>
  <div class="lg:px-8 p-6">
    <!-- Page name -->
    <portal to="subheader-page-name">Create new User</portal>
    <!-- Breadcrumb -->
    <portal to="subheader-breadcrumb">
      <div class="flex items-center space-x-4">
        <li>
          <nuxt-link to="/settings" class="flex items-center">
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
            <div
              class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
            >
              Settings
            </div>
          </nuxt-link>
        </li>
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
            <div class="ml-4 text-sm font-medium text-gray-400">New User</div>
          </div>
        </li>
      </div>
    </portal>
    <!-- Content -->
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        @submit.prevent="handleSubmit(submitForm)"
        class="flex flex-col justify-between space-y-8 divide-y divide-gray-200"
      >
        <div class="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Create User
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                Users can create and comment posts. For the sake of simplicity,
                the user authentication can be changed with the dropdown in the
                upper right corner.
              </p>
            </div>

            <div class="mt-12 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <ValidationProvider
                class="sm:col-span-6"
                name="username"
                rules="required"
                v-slot="{ errors }"
              >
                <label
                  for="username"
                  class="block text-sm font-medium text-gray-700"
                >
                  Username *
                </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autocomplete="username"
                    v-model="username"
                    :class="
                      errors[0]
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
                    "
                    class="block w-full pr-10 focus:outline-none sm:text-sm rounded-md"
                    aria-describedby="title-error"
                  />
                  <div
                    v-show="errors[0]"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                  >
                    <!-- Heroicon name: solid/exclamation-circle -->
                    <svg
                      class="h-5 w-5 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p class="mt-2 text-sm text-gray-500" v-show="!errors[0]">
                  Take care, the username can't be changed after user creation.
                </p>
                <p class="mt-2 text-sm text-red-600" id="email-error">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>

              <ValidationProvider
                class="sm:col-span-6"
                name="displayName"
                rules="required"
                v-slot="{ errors }"
              >
                <label
                  for="displayName"
                  class="block text-sm font-medium text-gray-700"
                >
                  Full Name *
                </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="displayName"
                    id="displayName"
                    autocomplete="displayName"
                    v-model="displayName"
                    :class="
                      errors[0]
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
                    "
                    class="block w-full pr-10 focus:outline-none sm:text-sm rounded-md"
                    aria-describedby="title-error"
                  />
                  <div
                    v-show="errors[0]"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                  >
                    <!-- Heroicon name: solid/exclamation-circle -->
                    <svg
                      class="h-5 w-5 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p class="mt-2 text-sm text-red-600" id="email-error">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>

              <div class="sm:col-span-3">
                <label
                  for="category"
                  class="block text-sm font-medium text-gray-700"
                >
                  Avatar Image *
                </label>
                <div class="mt-1">
                  <ul role="list" class="flex space-x-4 p-2">
                    <li
                      :id="`avatar-${avatar.id}`"
                      v-for="avatar in avatarSuggestions"
                      :key="avatar.id"
                      class="relative"
                    >
                      <div
                        :class="
                          avatar.id === currentAvatarId
                            ? 'ring-2 ring-offset-2 ring-offset-gray-100 ring-pink-500'
                            : ''
                        "
                        class="group block w-24 h-24 rounded-full overflow-hidden bg-gray-200"
                      >
                        <img
                          class="flex-shrink-0 mx-auto object-cover pointer-events-none group-hover:opacity-75"
                          :src="avatar.url"
                          alt=""
                        />

                        <button
                          @click="setAvatarId(avatar.id)"
                          type="button"
                          class="absolute w-full h-full inset-0 focus:outline-none"
                        >
                          <span class="sr-only">Select avatar image</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error panel -->
        <div v-if="errors[0]" id="error-panel" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <!-- Heroicon name: solid/x-circle -->
              <svg
                class="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                There were {{ errors.length }} errors with your submission
              </h3>
              <div class="mt-2 text-sm text-red-700">
                <ul class="list-disc pl-5 space-y-1">
                  <li v-for="(error, idx) in errors" :key="idx">
                    {{ error.message }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-5">
          <div class="flex justify-end">
            <nuxt-link
              id="cancel-new-user"
              to="/settings"
              class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Cancel
            </nuxt-link>
            <button
              id="save-new-user"
              type="submit"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { gql } from "nuxt-graphql-request";
import { DateTime } from "~/node_modules/luxon/build/node/luxon";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      errors: [],
      username: "",
      displayName: "",
      currentAvatarId: 0,
      avatarSuggestions: [
        {
          id: 0,
          url: "/images/diggy-graphql.png",
        },
        {
          id: 1,
          url:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=Lf3suyJoYK&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
          id: 2,
          url:
            "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixqx=Lf3suyJoYK&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        },
        {
          id: 3,
          url:
            "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixqx=Lf3suyJoYK&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        },
        {
          id: 4,
          url:
            "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixqx=Lf3suyJoYK&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        },
        {
          id: 5,
          url:
            "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixqx=Lf3suyJoYK&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        },
        {
          id: 6,
          url:
            "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixqx=Lf3suyJoYK&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        },
        {
          id: 7,
          url:
            "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&ixqx=Lf3suyJoYK&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        },
        {
          id: 8,
          url:
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&ixqx=Lf3suyJoYK&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        },
      ],
    };
  },
  methods: {
    setAvatarId(id) {
      this.currentAvatarId = id;
    },
    async submitForm() {
      // Check if data is valid
      if (!this.username || !this.displayName) {
        console.log(
          "Can't add user, please provide valid username, displayName and avatarUrl"
        );
        return;
      }

      const mutation = gql`
        mutation addUser(
          $username: String!
          $avatarImg: String!
          $displayName: String!
        ) {
          addUser(
            input: {
              username: $username
              avatarImg: $avatarImg
              displayName: $displayName
            }
          ) {
            user {
              username
              displayName
              avatarImg
            }
          }
        }
      `;

      const variables = {
        username: this.username,
        avatarImg: this.avatarSuggestions[this.currentAvatarId].url,
        displayName: this.displayName,
      };

      let gqlRequest = "";
      try {
        gqlRequest = await this.$graphql.default.request(mutation, variables);
      } catch (error) {
        console.log(error);
        this.errors = error.response?.errors;
      }

      if (gqlRequest.addUser?.user[0]) {
        this.$router.push("/settings");
      }
    },
  },
};
</script>
