<template>
  <section class="section">
    <h1 class="mb-5">
      Envio de Notificaciones
    </h1>
    <hr>
    <div class="columns">
      <div class="column is-6">
        <b-field horizontal label="Mensaje">
          <b-input
            v-model="message"
            name="Mensaje"
            placeholder="Mensaje"
            expanded
          />
        </b-field>
        <div class="is-flex">
          <b-button focused @click="sendNotifications">
            Envío
          </b-button>
        </div>
      </div>
      <div class="column is-6">
        <h1>hi</h1>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'HomePage',
  data () {
    return {
      PUBLIC_VAPID_KEY: 'BLrPYOapjsDjRcj_uxOqIWov0xI8LmpaGFi2rf-4sC9Q9hyfudUOqV5zDAk7idVMltwLbI1RWFw31QIxXTE9EWQ',
      message: ''
    }
  },
  mounted () {
    this.subscription()
  },
  methods: {
    urlBase64ToUint8Array (base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4)
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/')
      const rawData = window.atob(base64)
      const outputArray = new Uint8Array(rawData.length)
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
      }
      return outputArray
    },
    async subscription () {
      const register = await navigator.serviceWorker.register('/sw.js')
      console.log('new service worker')
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.PUBLIC_VAPID_KEY)
      })
      await fetch('/subscription', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // await this.$axios.$post('/subscription', JSON.stringify(subscription))
      console.log('Te encuentras subscrito!! :)')
    },
    async sendNotifications (e) {
      e.preventDefault()
      await this.$axios.$post('/new-message', JSON.stringify({ message: this.message }))
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      this.message = ''
    }
  }
}
</script>
