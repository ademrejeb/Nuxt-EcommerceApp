import Vue from 'vue'
import { Pie } from 'vue-chartjs'

Vue.component(
  'my-pie',
  Pie.extend({
    props: ['data', 'options'],
    mounted() {
      this.renderChart(this.data, this.options)
    }
  })
)