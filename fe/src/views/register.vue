<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>회원가입</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <form>
              <v-text-field
                v-model="form.name"
                v-validate="'required|min:2|max:40'"
                :counter="40"
                :error-messages="errors.collect('name')"
                label="이름"
                data-vv-name="name"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.id"
                v-validate="'required|min:4|max:20'"
                :counter="30"
                :error-messages="errors.collect('id')"
                label="아이디"
                data-vv-name="id"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.pwd"
                v-validate="'required|min:4|max:30'"
                type="password"
                :counter="30"
                :error-messages="errors.collect('pwd')"
                label="패스워드"
                data-vv-name="pwd"
                required
              ></v-text-field>
              <v-checkbox
                v-model="agree"
                v-validate="'required'"
                :error-messages="errors.collect('agree')"
                value="1"
                label="이용약관: 암호는 저장되지 않습니다."
                data-vv-name="agree"
                type="checkbox"
                required
              ></v-checkbox>
              <v-btn color="primary" @click="submit">가입</v-btn>
              <v-btn color="secondary" @click="clear">취소</v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="sb.act"
    >
      {{ sb.msg }}
      <v-btn
        color="sb.color"
        flat
        @click="sb.act = false"
      >
        닫기
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>

import ko from 'vee-validate/dist/locale/ko'

export default {
  $_veeValidate: {
    validator: 'new'
  },

  data: () => ({
    sb: {
      act: false,
      color: 'warning',
      msg: ''
    },
    form: {
      id: '',
      pwd: '',
      name: ''
    },
    agree: null,
    dictionary: {
      messages: ko.messages,
      attributes: {
        id: '아이디 ',
        pwd: '패스워드 ',
        name: '이름 ',
        agree: '이용약관 '
        // custom attributes
      },
      custom: {
        // name: {
        //   required: () => '테스트'
        //   // max: 'The name field may not be greater than 30 characters'
        //   // custom messages
        // },
        // select: {
        //   required: 'Select field is required'
        // }
      }
    }
  }),

  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },

  methods: {
    submit () {
      this.$validator.validateAll()
        .then(r => {
          if (!r) throw new Error('필수항목을 입력하세요')
          return this.$axios.post('register', this.form)
        })
        .then(r => {
          if (!r.data.success) {
            return this.pop('서버에러', 'warning')
          }
          this.pop('성공', 'success')
          this.$router.push('/sign')
        })
        .catch(e => {
          this.pop(e.message, 'error')
        })
    },
    clear () {
      this.form.id = ''
      this.form.pwd = ''
      this.form.name = ''
      this.agree = null
      this.$validator.reset()
    },
    pop (msg, cl) {
      this.sb.act = true
      this.sb.msg = msg
      this.sb.color = cl
    }
  }
}
</script>
