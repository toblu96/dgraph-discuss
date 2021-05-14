<template>
  <div class="lg:px-8 p-6">
    <!-- Page nam -->
    <portal to="subheader-page-name">Blog Posts</portal>
    <p v-if="$fetchState.pending">Fetching Posts...</p>
    <p v-else-if="$fetchState.error">
      An error occurred :( <br />
      {{ $fetchState }}
    </p>
    <div v-else>
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200">
          <li v-for="post in posts" :key="post.id">
            <nuxt-link :to="`/post/${post.id}`" class="block hover:bg-gray-50">
              <div class="flex items-center px-4 py-4 sm:px-6">
                <div class="min-w-0 flex-1 flex items-center">
                  <div class="flex-shrink-0">
                    <img
                      class="h-12 w-12 rounded-full"
                      :src="getAvatarUrl(post.author.avatarImg)"
                    />
                  </div>
                  <div
                    class="min-w-0 flex-1 px-4 md:grid md:grid-cols-8 md:gap-4"
                  >
                    <!-- Post avatar and title -->
                    <div class="col-span-4">
                      <p class="text-sm font-medium text-pink-600 truncate">
                        {{ post.title }}
                      </p>
                      <p class="mt-2 flex items-center text-sm text-gray-500">
                        {{ post.author.username }}
                      </p>
                    </div>
                    <!-- Category -->
                    <div class="hidden md:flex">
                      <div class="flex items-center space-x-2">
                        <div
                          class="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600"
                          aria-hidden="true"
                        ></div>
                        <p class="flex items-center text-sm text-gray-500">
                          {{ post.category.name }}
                        </p>
                      </div>
                    </div>
                    <!-- Created at -->
                    <div class="hidden md:flex col-span-2">
                      <div class="flex items-center space-x-2">
                        <p class="flex items-center text-sm text-gray-500">
                          {{ getDateStr(post.datePublished) }}
                        </p>
                      </div>
                    </div>
                    <!-- Responses -->
                    <div class="hidden md:flex items-center">
                      <div class="space-y-1">
                        <p class="flex items-center text-sm text-gray-500">
                          <!-- Heroicon name: outline/heart -->
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5"
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
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            ></path>
                          </svg>
                          0 Likes
                        </p>
                        <p class="flex items-center text-sm text-gray-500">
                          <!-- Heroicon name: outline/chat -->
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5"
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
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            ></path>
                          </svg>
                          {{
                            pluralize(
                              getCount(post.commentsAggregate),
                              "Reply",
                              "Replies"
                            )
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <!-- Heroicon name: solid/chevron-right -->
                  <svg
                    class="h-5 w-5 text-gray-400"
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
                </div>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <!-- Empty list info -->
      <div v-if="posts.length <= 0">
        <div class="rounded-md bg-blue-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <!-- Heroicon name: solid/information-circle -->
              <svg
                class="h-5 w-5 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3 flex-1 md:flex md:justify-between">
              <p class="text-sm text-blue-700">
                There are currently no posts created. Create your first post!
              </p>
              <p class="mt-3 text-sm md:mt-0 md:ml-6">
                <nuxt-link
                  to="/post/new"
                  class="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                  >Create Post <span aria-hidden="true">&rarr;</span></nuxt-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from "nuxt-graphql-request";
import pluralize from "~/utils/pluralize";
import { DateTime } from "luxon";

export default {
  data() {
    return {
      posts: [],
    };
  },
  async fetch() {
    const query = gql`
      query allPosts {
        queryPost(order: { desc: datePublished }) {
          id
          title
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
    `;

    const gqlRequest = await this.$graphql.default.request(query);
    this.posts = gqlRequest.queryPost;
  },
  methods: {
    getAvatarUrl: (img) =>
      img ?? "/images/" + Math.floor(Math.random() * (9 - 1) + 1) + ".svg",

    pluralize,
    getCount(val) {
      return val?.count;
    },
    getDateStr(date) {
      let dateStr = "at some unknown time";
      if (date) {
        dateStr = DateTime.fromISO(date).toRelative() ?? dateStr;
      }
      return dateStr;
    },
  },
};
</script>

<style>
.container {
  @apply flex justify-center items-center text-center mx-auto;
}
</style>
