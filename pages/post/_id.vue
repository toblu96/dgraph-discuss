<template>
  <div class="lg:px-12 p-6 space-y-8">
    <!-- Page nam -->
    <portal to="subheader-page-name">Blog Post</portal>
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
            <div class="ml-4 text-sm font-medium text-gray-400">
              {{ post.title }}
            </div>
          </div>
        </li>
      </div>
    </portal>
    <!-- Content -->
    <div>
      <!-- Title -->
      <div class="flex justify-between">
        <div class="space-y-4">
          <h1 class="text-2xl font-bold text-gray-900">
            {{ post.title }}
          </h1>

          <div>
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
        </div>
        <div>
          <button
            type="button"
            @click="deletePost(post.id)"
            class="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            <!-- Heroicon name: outline/trash -->
            <svg
              class="h-5 w-5"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <!-- Author -->
      <div class="mt-8">
        <div class="min-w-0 flex-1 flex items-center space-x-4">
          <div class="flex-shrink-0">
            <img
              class="h-12 w-12 rounded-full"
              :src="getAvatarUrl(post.author.avatarImg)"
            />
          </div>
          <div class="min-w-0 flex-1">
            <!-- Post avatar and title -->
            <div class="space-y-1">
              <p class="text-sm font-medium text-pink-600 truncate">
                {{ post.author.username }}
              </p>
              <p class="flex items-center text-sm text-gray-500">
                {{ getDateStr(post.datePublished) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Post text -->
      <div class="mt-4">
        <p>
          {{ post.text }}
        </p>
      </div>
    </div>
    <!-- Activity -->
    <div class="bg-white p-4 rounded-md">
      <div class="flow-root">
        <ul class="-mb-8">
          <li>
            <div class="relative pb-8">
              <span
                class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                aria-hidden="true"
              ></span>
              <div class="relative flex items-start space-x-3">
                <div class="relative">
                  <img
                    class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                    src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                    alt=""
                  />

                  <span
                    class="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px"
                  >
                    <!-- Heroicon name: solid/chat-alt -->
                    <svg
                      class="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
                <div class="min-w-0 flex-1">
                  <div>
                    <div class="text-sm">
                      <a href="#" class="font-medium text-gray-900"
                        >Eduardo Benz</a
                      >
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">Commented 6d ago</p>
                  </div>
                  <div class="mt-2 text-sm text-gray-700">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Tincidunt nunc ipsum tempor purus vitae id. Morbi in
                      vestibulum nec varius. Et diam cursus quis sed purus nam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div class="relative pb-8">
              <span
                class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                aria-hidden="true"
              ></span>
              <div class="relative flex items-start space-x-3">
                <div>
                  <div class="relative px-1">
                    <div
                      class="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center"
                    >
                      <!-- Heroicon name: solid/user-circle -->
                      <svg
                        class="h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="min-w-0 flex-1 py-1.5">
                  <div class="text-sm text-gray-500">
                    <a href="#" class="font-medium text-gray-900"
                      >Hilary Mahy</a
                    >
                    assigned
                    <a href="#" class="font-medium text-gray-900"
                      >Kristin Watson</a
                    >
                    <span class="whitespace-nowrap">2d ago</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div class="relative pb-8">
              <span
                class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                aria-hidden="true"
              ></span>
              <div class="relative flex items-start space-x-3">
                <div>
                  <div class="relative px-1">
                    <div
                      class="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center"
                    >
                      <!-- Heroicon name: solid/tag -->
                      <svg
                        class="h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="min-w-0 flex-1 py-0">
                  <div class="text-sm leading-8 text-gray-500">
                    <span class="mr-0.5">
                      <a href="#" class="font-medium text-gray-900"
                        >Hilary Mahy</a
                      >
                      added tags
                    </span>
                    <span class="mr-0.5">
                      <a
                        href="#"
                        class="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                      >
                        <span
                          class="absolute flex-shrink-0 flex items-center justify-center"
                        >
                          <span
                            class="h-1.5 w-1.5 rounded-full bg-rose-500"
                            aria-hidden="true"
                          ></span>
                        </span>
                        <span class="ml-3.5 font-medium text-gray-900"
                          >Bug</span
                        >
                      </a>
                      <a
                        href="#"
                        class="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                      >
                        <span
                          class="absolute flex-shrink-0 flex items-center justify-center"
                        >
                          <span
                            class="h-1.5 w-1.5 rounded-full bg-pink-500"
                            aria-hidden="true"
                          ></span>
                        </span>
                        <span class="ml-3.5 font-medium text-gray-900"
                          >Accessibility</span
                        >
                      </a>
                    </span>
                    <span class="whitespace-nowrap">6h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div class="relative pb-8">
              <div class="relative flex items-start space-x-3">
                <div class="relative">
                  <img
                    class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                    alt=""
                  />

                  <span
                    class="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px"
                  >
                    <!-- Heroicon name: solid/chat-alt -->
                    <svg
                      class="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
                <div class="min-w-0 flex-1">
                  <div>
                    <div class="text-sm">
                      <a href="#" class="font-medium text-gray-900"
                        >Jason Meyers</a
                      >
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">Commented 2h ago</p>
                  </div>
                  <div class="mt-2 text-sm text-gray-700">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Tincidunt nunc ipsum tempor purus vitae id. Morbi in
                      vestibulum nec varius. Et diam cursus quis sed purus nam.
                      Scelerisque amet elit non sit ut tincidunt condimentum.
                      Nisl ultrices eu venenatis diam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from "nuxt-graphql-request";
import { DateTime } from "luxon";

export default {
  async asyncData({ $graphql, params }) {
    const postId = params.id;

    const query = gql`
      query getPost($id: ID!) {
        getPost(id: $id) {
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
          comments {
            id
            text
            commentsOn {
              comments {
                id
                text
                author {
                  username
                  displayName
                  avatarImg
                }
              }
            }
            author {
              username
              displayName
              avatarImg
            }
          }
        }
      }
    `;
    const variables = { id: postId };

    const gqlRequest = await $graphql.default.request(query, variables);
    const post = gqlRequest.getPost;
    return { post };
  },
  methods: {
    getAvatarUrl: (img) =>
      img ?? "/images/" + Math.floor(Math.random() * (9 - 1) + 1) + ".svg",
    getDateStr(date) {
      let dateStr = "at some unknown time";
      if (date) {
        dateStr = DateTime.fromISO(date).toRelative() ?? dateStr;
      }
      return dateStr;
    },
    async deletePost(postId) {
      const mutation = gql`
        mutation deletePost($filter: PostFilter!) {
          deletePost(filter: $filter) {
            msg
          }
        }
      `;

      const variables = { filter: { id: postId } };
      const gqlRequest = await this.$graphql.default.request(
        mutation,
        variables
      );

      if (gqlRequest.deletePost.msg === "Deleted") {
        this.$router.push("/");
      }
      console.log(gqlRequest);
    },
  },
};
</script>
