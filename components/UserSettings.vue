<template>
  <div>
    <p v-if="$fetchState.pending">Fetching Users...</p>
    <p v-else-if="$fetchState.error">An error occurred :( {{ $fetchState }}</p>
    <div v-else>
      <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">
        Users
      </h2>
      <div class="space-y-4">
        <div>
          <ul
            class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            <li
              v-for="user in users"
              :key="user.username"
              class="col-span-1 flex shadow-sm rounded-md"
            >
              <div
                class="flex-shrink-0 flex items-center justify-center w-16 bg-yellow-400 text-white text-sm font-medium rounded-l-md"
              >
                <img
                  class="w-12 bg-contain"
                  :src="getAvatarUrl(user.avatarImg)"
                  alt="Avatar Image"
                />
              </div>
              <div
                class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate"
              >
                <div class="flex-1 px-4 py-2 text-sm truncate">
                  <a
                    href="#"
                    class="text-gray-900 font-medium truncate hover:text-gray-600"
                    >{{ user.username || "#noname" }}</a
                  >
                  <p class="text-gray-500 truncate">
                    {{ user.displayName || "Darth Vader" }}
                  </p>
                </div>
                <div class="flex-shrink-0 pr-2">
                  <button
                    @click="editUser(user)"
                    class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <span class="sr-only">Select User</span>
                    <!-- Heroicon name: solid/dots-vertical -->
                    <svg
                      class="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <div
            v-show="showUserEdit"
            class="relative bg-gray-200 rounded-md px-4 py-5 border-b border-gray-200 sm:px-6"
          >
            <div
              class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap"
            >
              <div class="ml-4 mt-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Edit {{ editedUser.username }}
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit quam
                  corrupti consectetur.
                </p>
              </div>
              <div class="ml-4 mt-4 flex-shrink-0">
                <div class="absolute top-0 right-0 pt-6 pr-6">
                  <button
                    @click="showUserEdit = false"
                    type="button"
                    class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <span class="sr-only">Close</span>
                    <!-- Heroicon name: outline/x -->
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div class="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <label
                    for="edit_user_displayname"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Display Name
                  </label>
                  <div class="mt-1">
                    <input
                      type="text"
                      name="edit_user_displayname"
                      id="edit_user_displayname"
                      autocomplete="edit_user_displayname"
                      v-model="editedUser.displayName"
                      class="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div class="sm:col-span-3">
                  <label
                    for="edit_user_avatarurl"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Avatar Url
                  </label>
                  <div class="mt-1">
                    <input
                      type="text"
                      name="edit_user_avatarurl"
                      id="edit_user_avatarurl"
                      autocomplete="edit_user_avatarurl"
                      v-model="editedUser.avatarImg"
                      class="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-end pt-5">
              <button
                @click="saveUser()"
                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from "nuxt-graphql-request";

export default {
  data() {
    return {
      users: [],
      showUserEdit: false,
      editedUser: {
        username: "",
        displayName: "",
        avatarImg: "",
      },
    };
  },
  async fetch() {
    const query = gql`
      query queryUser {
        queryUser {
          username
          displayName
          avatarImg
        }
      }
    `;

    const gqlRequest = await this.$graphql.default.request(query);
    this.users = gqlRequest.queryUser;
  },
  methods: {
    getAvatarUrl: (img) =>
      img ?? "/images/" + Math.floor(Math.random() * (9 - 1) + 1) + ".svg",
    editUser(user) {
      this.showUserEdit = true;
      this.editedUser.username = user.username;
      this.editedUser.displayName = user.displayName;
      this.editedUser.avatarImg = user.avatarImg;
    },
    async saveUser() {
      const mutation = gql`
        mutation updateUser(
          $username: String!
          $displayName: String!
          $avatarImg: String
        ) {
          updateUser(
            input: {
              filter: { username: { eq: $username } }
              set: { displayName: $displayName, avatarImg: $avatarImg }
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
        username: this.editedUser.username,
        displayName: this.editedUser.displayName,
        avatarImg: this.editedUser.avatarImg,
      };

      const gqlRequest = await this.$graphql.default.request(
        mutation,
        variables
      );

      console.log(gqlRequest);
      this.$fetch();
      this.editedUser = {};
      this.showUserEdit = false;
    },
  },
};
</script>
