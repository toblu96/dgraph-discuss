<template>
  <div class="lg:px-8 p-6">
    <form
      @submit.prevent="submitForm"
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

          <div class="mt-12 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <label
                for="post_title"
                class="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  name="post_title"
                  id="post_title"
                  autocomplete="post_title"
                  v-model="title"
                  class="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

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
            <div class="sm:col-span-6">
              <label for="tags" class="block text-sm font-medium text-gray-700">
                Tags (optional)
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  autocomplete="tags"
                  class="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="post_message"
                class="block text-sm font-medium text-gray-700"
              >
                Your Message
              </label>
              <div class="mt-1">
                <textarea
                  id="post_message"
                  name="post_message"
                  rows="5"
                  v-model="text"
                  class="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Only supports plain text at the moment.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-end">
          <nuxt-link
            to="/"
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Cancel
          </nuxt-link>
          <button
            type="submit"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { gql } from "nuxt-graphql-request";
import { DateTime } from "~/node_modules/luxon/build/node/luxon";

export default {
  data() {
    return {
      title: "",
      category: null,
      tags: "",
      text: "",
    };
  },
  async asyncData({ $graphql, params }) {
    const query = gql`
      query queryCategory {
        queryCategory {
          id
          name
        }
      }
    `;

    const gqlRequest = await $graphql.default.request(query);
    const allCategories = gqlRequest.queryCategory;
    return { allCategories };
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

      const variables = {
        post: {
          title: this.title,
          text: this.text,
          datePublished: DateTime.now(),
          category: {
            id: this.category,
          },
          author: {
            username: "toubi",
          },
        },
      };

      const gqlRequest = await this.$graphql.default.request(
        mutation,
        variables
      );

      console.log(gqlRequest);
    },
  },
};
</script>
