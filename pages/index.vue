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
                    <!-- Tags -->
                    <div class="hidden md:flex col-span-2">
                      <div class="flex items-center space-x-2">
                        <span
                          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          Tag1
                        </span>
                        <span
                          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          Some new stuff
                        </span>
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
                          2 Replies
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
    </div>
  </div>
</template>

<script>
import { gql } from "nuxt-graphql-request";

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
  },
};
</script>

<style>
.container {
  @apply flex justify-center items-center text-center mx-auto;
}
</style>
