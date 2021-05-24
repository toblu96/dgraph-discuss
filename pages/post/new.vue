<template>
  <div class="lg:px-8 p-6">
    <p v-if="$fetchState.pending">Fetching category...</p>
    <p v-else-if="$fetchState.error">
      An error occurred :( <br />
      {{ $fetchState }}
    </p>
    <div v-else>
      <!-- Page name -->
      <portal to="subheader-page-name">Create new Blog Post</portal>
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
              <div class="ml-4 text-sm font-medium text-gray-400">New Post</div>
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
                  Create Post
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  This post will be displayed immediately after you save these
                  information.
                </p>
              </div>

              <div
                class="mt-12 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
              >
                <ValidationProvider
                  class="sm:col-span-6"
                  name="title"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <label
                    for="post_title"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Title *
                  </label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="text"
                      name="post_title"
                      id="post_title"
                      autocomplete="post_title"
                      v-model="title"
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
                    Category
                  </label>
                  <div class="mt-1">
                    <select
                      id="category"
                      name="category"
                      autocomplete="category"
                      v-model="category"
                      class="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option
                        v-for="category in allCategories"
                        :key="category.id"
                        :value="category.id"
                      >
                        {{ category.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="sm:col-span-2 sm:col-start-5">
                  <label
                    for="author"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Selected Author
                  </label>
                  <div class="mt-1 flex-shrink-0 group block">
                    <div class="flex items-center">
                      <div>
                        <img
                          class="inline-block h-9 w-9 rounded-full"
                          :src="currentUserImage"
                          alt="Avatar image"
                        />
                      </div>
                      <div class="ml-3">
                        <p
                          id="selected-author-name"
                          class="text-md text-gray-700 group-hover:text-gray-900"
                        >
                          {{ $store.state.auth.user.displayName }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <ValidationProvider
                  class="sm:col-span-6"
                  name="text"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <label
                    for="post_message"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Your Message *
                  </label>
                  <div class="mt-1 relative">
                    <textarea
                      id="post_message"
                      name="post_message"
                      rows="5"
                      v-model="text"
                      :class="
                        errors[0]
                          ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
                      "
                      class="block w-full pr-10 focus:outline-none sm:text-sm rounded-md"
                    ></textarea>
                    <div
                      v-show="errors[0]"
                      class="absolute inset-y-3 right-0 pr-3 flex items-start pointer-events-none"
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
                    Only supports plain text at the moment.
                  </p>
                  <p class="mt-2 text-sm text-red-600" id="email-error">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </div>
            </div>
          </div>

          <div class="pt-5">
            <div class="flex justify-end">
              <nuxt-link
                id="cancel-new-post"
                to="/"
                class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Cancel
              </nuxt-link>
              <button
                id="submit-new-post"
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
  </div>
</template>

<script>
import { gql } from "nuxt-graphql-request";
import { DateTime } from "~/node_modules/luxon/build/node/luxon";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import getAvatarUrl from "../../utils/user";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      title: "",
      category: null,
      allCategories: {},
      text: "",
    };
  },
  computed: {
    currentUserImage: ({ $store }) => {
      return getAvatarUrl($store.state.auth.user.avatarImg);
    },
  },
  async fetch() {
    const query = gql`
      query queryCategory {
        queryCategory {
          id
          name
        }
      }
    `;

    const gqlRequest = await this.$graphql.default.request(query);
    this.allCategories = gqlRequest.queryCategory;
    this.category = this.allCategories[0]?.id;
  },
  methods: {
    async submitForm() {
      const mutation = gql`
        mutation addPost($post: AddPostInput!) {
          addPost(input: [$post]) {
            post {
              id
              title
              text
              datePublished
              category {
                id
                name
              }
              author {
                username
                displayName
                avatarImg
              }
              commentsAggregate {
                count
              }
            }
          }
        }
      `;

      // Check if data is valid
      if (!this.title || !this.text || !this.category) {
        return;
      }

      const variables = {
        post: {
          title: this.title,
          text: this.text,
          datePublished: DateTime.now(),
          category: {
            id: this.category,
          },
          author: {
            username: this.$store.state.auth.user.username,
          },
        },
      };

      const gqlRequest = await this.$graphql.default.request(
        mutation,
        variables
      );

      if (gqlRequest.addPost?.post?.length > 0) {
        this.$router.push("/");
      }
    },
  },
};
</script>
