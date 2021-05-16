<template>
  <div>
    <p v-if="$fetchState.pending">Fetching Users...</p>
    <p v-else-if="$fetchState.error">
      Could not fetch users :( <br />
      Check the console for more details.
    </p>
    <div v-else>
      <div v-click-away="'close'">
        <!-- No user in database -->
        <div v-if="!$store.state.auth.user.username">
          <nuxt-link
            to="/user/new"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-pink-500"
          >
            <!-- Heroicon name: outline/add-user -->
            <svg
              class="-ml-1 mr-3 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
            Add first User
          </nuxt-link>
        </div>
        <!-- User dropdown -->
        <div v-else class="w-56">
          <div class="mt-1 relative">
            <button
              type="button"
              class="relative w-full bg-white border border-gray-300 cursor-default rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
              @click="showUserDropdown = !showUserDropdown"
            >
              <span class="flex items-center">
                <img
                  :src="getAvatarUrl($store.state.auth.user.avatarImg)"
                  alt=""
                  class="flex-shrink-0 h-6 w-6 rounded-full"
                />
                <span class="ml-3 block truncate">
                  {{ $store.state.auth.user.displayName || "Create a user" }}
                </span>
              </span>
              <span
                class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
              >
                <!-- Heroicon name: solid/selector -->
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>

            <transition
              enter-active-class=""
              enter-class=""
              enter-to-class=""
              leave-active-class="transition ease-in duration-100"
              leave-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ul
                v-show="showUserDropdown"
                class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                tabindex="-1"
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-3"
              >
                <li
                  v-for="user in users"
                  :key="user.username"
                  @click="chooseUser(user)"
                  class="group text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600"
                  id="listbox-option-0"
                  role="option"
                >
                  <div class="flex items-center">
                    <img
                      :src="getAvatarUrl(user.avatarImg)"
                      alt=""
                      class="flex-shrink-0 h-6 w-6 rounded-full"
                    />
                    <span
                      :class="
                        user.username == $store.state.auth.user.username
                          ? 'font-semibold'
                          : 'font-normal'
                      "
                      class="ml-3 block truncate"
                    >
                      {{ user.displayName || "Darth Vader" }}
                    </span>
                  </div>

                  <span
                    v-show="user.username == $store.state.auth.user.username"
                    class="text-pink-600 group-hover:text-white absolute inset-y-0 right-0 flex items-center pr-4"
                  >
                    <!-- Heroicon name: solid/check -->
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickAway from "~/directives/click-away";
import { gql } from "nuxt-graphql-request";

export default {
  directives: {
    "click-away": ClickAway,
  },
  data() {
    return {
      users: [],
      showUserDropdown: false,
    };
  },
  async fetch() {
    const query = gql`
      query allUsers {
        queryUser {
          avatarImg
          username
          displayName
        }
      }
    `;

    const gqlRequest = await this.$graphql.default.request(query);
    this.users = gqlRequest.queryUser;

    this.$store.commit("auth/user", this.users[0]);
  },
  methods: {
    close() {
      this.showUserDropdown = false;
    },
    chooseUser(user) {
      this.$store.commit("auth/user", user);
      this.close();
    },
    getAvatarUrl: (img) =>
      img ?? "/images/" + Math.floor(Math.random() * (9 - 1) + 1) + ".svg",
  },
};
</script>

<style>
</style>