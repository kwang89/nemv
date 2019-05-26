<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{user.id}}</h3>
      </div>
    </v-card-title>
    <v-card-text primary-title>
      <div>
        <div>이름: {{user.name}}</div>
        <div>권한: {{user.lv}}</div>
        <div>나이: {{user.age}}</div>
        <div>로그인 횟수: {{user.inCnt}}</div>
        <div>암호: {{user.pwd}}</div>
        <div>salt: {{user._id}}</div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="red" @click="parent">component user</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>

export default {
  props: [ 'user' ],
  methods: {
    parent () {
      this.$emit('sbOpen', 'to mother')
    }
  }
}
</script>
