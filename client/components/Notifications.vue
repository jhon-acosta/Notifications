<template>
  <section v-if="state" class="control">
    <BDropdown aria-role="list" class="mt-3">
      <template #trigger>
        <BButton
          icon-left="bell"
          style="border: none"
          :type="allNotifications.length !== 0 ? 'is-primary' : ''"
          rounded
        />
      </template>
      <BDropdownItem v-for="item in allNotifications" :key="item.modulo">
        <div class="media">
          <BIcon class="media-left" icon="earth" size="is-small" />
          <div class="media-content">
            <h3>{{ item.modulo }}</h3>
            <small>{{ item.description }}</small>
          </div>
        </div>
      </BDropdownItem>
      <BDropdown-item v-if="allNotifications.length === 0">
        <div class="content has-text-grey has-text-centered is-unselectable">
          <small> Sin Notificaciones </small>
        </div>
      </BDropdown-item>
      <div
        v-if="allNotifications.length !== 0"
        class="columns"
      >
        <div class="column is-four-fifths">
          <span class="is-size-7 has-text-grey is-unselectable ml-2">
            Total: {{ allNotifications.length }}
          </span>
        </div>
        <div class="column" @click="clearNotifications">
          <BIcon
            size="is-small"
            icon="notification-clear-all"
            class="mr-2 is-clickable"
            type="is-primary"
          />
        </div>
      </div>
    </BDropdown>
  </section>
</template>

<script>
export default {
  name: 'Notifications',
  data () {
    return {
      state: false,
      allNotifications: []
    }
  },
  mounted () {
    if (!window.Notification) {
      console.warn('El navegador no soporta notificaciones.')
    } else {
      this.permissionGranted()
    }
    setTimeout(() => {
      this.allNotifications.push(
        { modulo: 'Nomina', description: 'Pagos pendientes' },
        { modulo: 'Contabilidad', description: 'Cuentas pendientes' },
        { modulo: 'Producción', description: 'Sin stock' },
        { modulo: 'Tesoría', description: 'Pagos pendientes' })
    }, 5000)
  },
  methods: {
    permissionGranted () {
      if (Notification.permission === 'granted') {
        // Apartado de Notificaciones
        return new Notification('Upconta', {
          body: 'Segunda Notificacion',
          icon: 'https://upconta.com/wp-content/uploads/2020/05/logook2.png'
        })
      } else {
        Notification.requestPermission()
          .then((response) => {
            if (response === 'granted') {
              this.state = true
              return new Notification('Upconta', {
                body: 'Notificaciones activas',
                icon:
                  'https://upconta.com/wp-content/uploads/2020/05/logook2.png'
              })
            } else {
              console.log('Notificaciones denegadas.')
            }
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
    clearNotifications () {
      for (let i = this.allNotifications.length; i > 0; i--) {
        this.allNotifications.pop()
      }
    }
  }
}
</script>

<style scoped>
.is-clickable {
  cursor: pointer;
}
</style>
