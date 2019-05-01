<template>
  <v-container>
    <v-btn @click="headerSend">헤더 전송</v-btn>
    <v-btn @click="headerSend2">auth 헤더 전송</v-btn>
    <v-btn @click="lsWrite">로컬스토리지 저장</v-btn>
    <v-btn @click="lsRead">로컬스토리지 읽기</v-btn>
    <v-btn @click="lsRemove">로컬스토리지 삭제</v-btn>
    <v-btn @click="lsClear">로컬스토리지 전체삭제</v-btn>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  mounted () {
    // console.log(window)
    if (!window.localStorage) alert('이 브라우저는 지원되지 않습니다')
  },
  methods: {
    headerSend () {
      axios.get(`${this.$apiRootPath}test`, { headers: { xxx: 1234 } })
        .then(r => console.log(r))
        .catch(e => console.log(e))
    },
    headerSend2 () {
      axios.get(`http://localhost:3000/api/test`, { headers: {Authorization: 'fake token!'} })
        .then(r => console.log(r))
        .catch(e => console.log(e))
    },
    lsWrite () {
      localStorage.setItem('token', 123)
      localStorage.setItem('token2', 1234)
    },
    lsRead () {
      console.log(localStorage.getItem('token'))
    },
    lsRemove () {
      localStorage.removeItem('token')
    },
    lsClear () {
      localStorage.clear()
    }
  }
}
</script>
