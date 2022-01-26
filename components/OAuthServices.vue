<template>
    <div>
        <button @click.prevent="OAuthservices('google')" class="bg-gray-300 hover:bg-gray-400 flex-1 px-4 py-2 border rounded-md">
            <img src="~/assets/google-logo.svg" alt="" class="mx-auto">
        </button>
        <button @click.prevent="OAuthservices('facebook')" class="bg-gray-300 hover:bg-gray-400 flex-1 px-4 py-2 border rounded-md">
            <img src="~/assets/facebook-logo.svg" alt="" class="mx-auto">
        </button>
        <button @click.prevent="OAuthservices('github')" class="bg-gray-300 hover:bg-gray-400 flex-1 px-4 py-2 border rounded-md">
            <img src="~/assets/github-logo.svg" alt="" class="mx-auto">
        </button>
    </div>
</template>

<script>
export default {
    
    mounted () {
        window.addEventListener('message', this.onMessage, false)
    },

    beforeDestroy () {
        window.removeEventListener('message', this.onMessage)
    },

    methods: {
        async OAuthservices(service) {
            await this.$axios.$get(`/api/oauth/${service}`)
                .then((res) => {
                    const newWindow = openWindow('', 'sign in')
                    newWindow.location.href = res.url
                })
        },

        /**
         * @param {MessageEvent} e
         */
        async onMessage (e) {

            if (e.data && e.data.token) {
                await this.$axios.$get('/sanctum/csrf-cookie')

                this.$axios.get('/api/oauth/login/' + e.data.token)
                    .then(async (res) => {
                        let form = {
                            email: res.data.user.email,
                            password: 'XXXXXXXXXX'
                        }

                        await this.$auth.loginWith('laravelSanctum', {data: form})
                })
            }
        },
        
    }
}

/**
 * @param  {Object} options
 * @return {Window}
 */
function openWindow (url, title, options = {}) {
  if (typeof url === 'object') {
    options = url
    url = ''
  }
  options = { url, title, width: 600, height: 720, ...options }
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top
  const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width
  const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height
  options.left = ((width / 2) - (options.width / 2)) + dualScreenLeft
  options.top = ((height / 2) - (options.height / 2)) + dualScreenTop
  const optionsStr = Object.keys(options).reduce((acc, key) => {
    acc.push(`${key}=${options[key]}`)
    return acc
  }, []).join(',')
  const newWindow = window.open(url, title, optionsStr)
  if (window.focus) {
    newWindow.focus()
  }
  return newWindow
}
</script>