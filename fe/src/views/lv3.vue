<template>
  <v-container>
    <v-alert type="info" :value="true">
      레벨 3 관리자
    </v-alert>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  mounted () {
    console.log(moment().toDate())
    console.log(moment().format('YYMMDD'))
    console.log(moment().minutes())
    console.log(moment().add(3, 'hours').toString())
    moment.locale('ko')
    console.log(moment().fromNow())
    console.log(moment().add(-4, 'year').fromNow())
    const bt = moment().add(-4, 'hours')
    console.log(moment().diff(bt, 'seconds'))
  }
}
</script>
