<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-btn color="primary" @click="pop('click test')">sss</v-btn>
      </v-flex>
      <v-flex xs12 sm6 md4 v-for="user in users" :key="user._id">
        <user-card :user="user" @sbOpen="pop"></user-card>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="sb.act">
      {{ sb.msg }}
    </v-snackbar>
  </v-container>
</template>
<script>

import userCard from '@/components/user'

export default {
  components: {
    userCard
  },
  data () {
    return {
      users: [],
      sb: {
        act: false,
        msg: 'fefw'
      }
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.$axios.get(`${this.$apiRootPath}manage/user`)
        .then((r) => {
          this.users = r.data.users
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    pop (msg) {
      this.sb.act = true
      this.sb.msg = msg
    }
  }
}
</script>
