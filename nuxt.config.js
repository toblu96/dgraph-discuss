export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'DGraph Discuss',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  publicRuntimeConfig: {
    dgraphEndpointUrl: process.env.DGRAPH_ENDPOINT_URL
  },
  privateRuntimeConfig: {
    dgraphAuthKey: process.env.DRAPH_AUTH_CLIENT_KEY
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-portal.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    'nuxt-graphql-request'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      presets({ isServer }, [preset, options]) {
        // change options directly
        options.loose = true
      }
    }
  },

  graphql: {
    clients: {
      default: {
        endpoint: process.env.DGRAPH_ENDPOINT_URL,
        options: {
          headers: {
            'dg-auth': process.env.DRAPH_AUTH_CLIENT_KEY,
          },
        },
      },
    },
  },
}
