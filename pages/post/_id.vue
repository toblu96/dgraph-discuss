<template>
  <div class="lg:px-12 p-6 space-y-8">
    <p v-if="$fetchState.pending">Fetching post...</p>
    <p v-else-if="$fetchState.error">
      An error occurred :( <br />
      {{ $fetchState }}
    </p>
    <div v-else>
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
          <div class="space-x-1">
            <button
              v-show="post.author.username === $store.state.auth.user.username"
              type="button"
              @click="deletePost(post.id)"
              class="inline-flex items-center p-2 border border-gray-200 rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
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
            <button
              type="button"
              @click="toggleLike()"
              :class="
                userHasLikedPost(
                  $store.state.auth.user.username,
                  this.post.likes
                )
                  ? 'border-transparent text-white bg-pink-600 hover:bg-pink-700 '
                  : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50 '
              "
              class="inline-flex items-center p-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <!-- Heroicon name: outline/heart -->
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
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
                  {{ post.author.displayName || "Darth Vader" }}
                </p>
                <p class="flex items-center text-sm text-gray-500">
                  {{ getDateStr(post.datePublished) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Post text -->
        <div class="mt-4 mb-8">
          <p>
            {{ post.text }}
          </p>
        </div>
      </div>
      <!-- Activity -->
      <div class="bg-white p-4 rounded-md">
        <div class="flow-root">
          <ul class="-mb-4">
            <!-- Post created -->
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
                        <!-- Heroicon name: solid/sparkles -->
                        <svg
                          class="h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="min-w-0 flex-1 py-1.5">
                    <div class="text-sm text-gray-500">
                      <a href="#" class="font-medium text-gray-900">{{
                        post.author.displayName || "Darth Vader"
                      }}</a>
                      created this post
                      <span class="whitespace-nowrap">{{
                        getDateStr(post.datePublished)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <!-- Iterating Comments -->
            <li v-for="comment in post.comments" :key="comment.id">
              <div class="relative pb-8">
                <span
                  class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                ></span>
                <div class="relative flex items-start space-x-3">
                  <div class="relative">
                    <img
                      class="h-10 w-10 rounded-full bg-white flex items-center justify-center ring-8 ring-white"
                      :src="getAvatarUrl(comment.author.avatarImg)"
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
                        <a href="#" class="font-medium text-gray-900">{{
                          comment.author.displayName
                        }}</a>
                      </div>
                      <p class="mt-0.5 text-sm text-gray-500">
                        Commented {{ getDateStr(comment.datePublished) }}
                      </p>
                    </div>
                    <div class="mt-2 text-sm text-gray-700">
                      <p>
                        {{ comment.text }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <!-- Write your own comment -->
            <li class="-mx-4">
              <div class="relative bg-gray-200 p-4 rounded-md">
                <div class="relative flex items-start space-x-3">
                  <div class="relative">
                    <img
                      class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-gray-200"
                      :src="getAvatarUrl($store.state.auth.user.avatarImg)"
                      alt="Avatar Image"
                    />

                    <span
                      class="absolute -bottom-0.5 -right-1 bg-gray-200 rounded-tl px-0.5 py-px"
                    >
                      <!-- Heroicon name: solid/chat-alt -->
                      <svg
                        class="h-5 w-5 text-gray-600"
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
                        <a href="#" class="font-medium text-gray-900">{{
                          $store.state.auth.user.displayName || "Darth Vader"
                        }}</a>
                      </div>
                      <p class="mt-0.5 text-sm text-gray-500">
                        Not Published yet
                      </p>
                    </div>
                    <div class="mt-4 text-sm text-gray-700">
                      <ValidationObserver
                        ref="observer"
                        v-slot="{ handleSubmit }"
                      >
                        <form @submit.prevent="handleSubmit(createComment)">
                          <ValidationProvider
                            class="sm:col-span-6"
                            name="text"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <div class="mt-1 relative">
                              <textarea
                                id="comment_message"
                                name="comment_message"
                                rows="5"
                                v-model="commentText"
                                placeholder="Write a comment"
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

                            <p
                              v-show="errors[0]"
                              class="mt-2 text-sm text-red-600"
                              id="comment-error"
                            >
                              {{ errors[0] }}
                            </p>
                          </ValidationProvider>
                          <div class="pt-3">
                            <div class="flex justify-end">
                              <button
                                type="submit"
                                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                              >
                                Comment
                              </button>
                            </div>
                          </div>
                        </form>
                      </ValidationObserver>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from "nuxt-graphql-request";
import { DateTime } from "luxon";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import getAvatarUrl from "~/utils/user";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      post: {},
      commentText: "",
    };
  },
  async fetch() {
    const postId = this.$route.params.id;

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
            datePublished
            author {
              username
              displayName
              avatarImg
            }
          }
          likes {
            username
          }
        }
      }
    `;
    const variables = { id: postId };

    const gqlRequest = await this.$graphql.default.request(query, variables);
    this.post = gqlRequest.getPost;
  },
  methods: {
    userHasLikedPost(username, likes) {
      return likes.findIndex((element) => element.username === username) == -1
        ? false
        : true;
    },
    getAvatarUrl,
    getDateStr(date) {
      let dateStr = "at some unknown time";
      if (date) {
        dateStr = DateTime.fromISO(date).toRelative() ?? dateStr;
      }
      return dateStr;
    },
    async deletePost(id) {
      const mutation = gql`
        mutation deletePostWithComments($postId: ID!) {
          deletePost(filter: { id: [$postId] }) {
            numUids
            msg
          }
          deleteComment(filter: { not: { has: commentsOn } }) {
            numUids
            msg
          }
        }
      `;

      const variables = { postId: id };
      const gqlRequest = await this.$graphql.default.request(
        mutation,
        variables
      );

      if (gqlRequest.deletePost.msg === "Deleted") {
        this.$router.push("/");
      }
      console.log(gqlRequest);
    },
    async toggleLike() {
      // detect if like is set or deleted
      let mutationType = "set";
      if (
        this.userHasLikedPost(
          this.$store.state.auth.user.username,
          this.post.likes
        )
      ) {
        mutationType = "remove";
      }

      const mutation = gql`
        mutation updatePost($username: String!, $postId: ID!) {
          updatePost(
            input: 
              {filter: {id: [$postId]},
              ${mutationType}: { likes: { username: $username } }
            }
          ) {
            post {
              title
              id
              text
              datePublished
            }
          }
        }
      `;

      const variables = {
        username: this.$store.state.auth.user.username,
        postId: this.post.id,
      };

      let gqlRequest = "";
      try {
        gqlRequest = await this.$graphql.default.request(mutation, variables);
      } catch (error) {
        console.log(error);
        // this.errors = error.response?.errors;
      }

      if (gqlRequest.updatePost?.post[0]) {
        this.$fetch();
      }
    },
    async createComment() {
      if (!this.commentText) return;

      // add Comment
      const mutation = gql`
        mutation addComment(
          $text: String!
          $commentsOnId: ID!
          $username: String!
          $datePublished: DateTime!
        ) {
          addComment(
            input: {
              text: $text
              author: { username: $username }
              commentsOn: { id: $commentsOnId }
              datePublished: $datePublished
            }
          ) {
            comment {
              text
              datePublished
            }
          }
        }
      `;

      const variables = {
        text: this.commentText,
        commentsOnId: this.post.id,
        username: this.$store.state.auth.user.username,
        datePublished: DateTime.now(),
      };
      const gqlRequest = await this.$graphql.default.request(
        mutation,
        variables
      );

      if (gqlRequest.addComment?.comment?.length > 0) {
        this.$fetch();
      }

      this.commentText = "";
      this.$refs.observer.reset();
    },
  },
};
</script>
