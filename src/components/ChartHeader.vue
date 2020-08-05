<template>
  <div class="chart-header row">
    <div class="chart-title col-9">{{ title }}</div>
    <div class="chart-header-buttons col-3">
      <button type="button" class="btn btn-secondary btn-info" data-container="body" data-toggle="popover" data-html="true" data-placement="bottom" :data-content="info">
        i
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartHeader',
  props: {
    title: String,
    info: String,
    bg: String,
    color: String
  }
}
</script>

<style scoped lang="scss">
$color_TI: #0d506b;
$color_TI_darker: darken( $color_TI, 20% );
.chart-header {
  padding: 10px 5px;
  margin: 0;
  background: #fafafa;
  .chart-title {
    font-size: 19px;
    text-align: left;
    text-transform: uppercase;
    color: $color_TI_darker;
    @media only screen and (max-width: 1410px) {
      font-size: 18px;
    }
    @media only screen and (max-width: 1300px) {
      font-size: 16px;
    }
    @media only screen and (max-width: 767px) {
      font-size: 18px;
    }
  }
  .chart-header-buttons {
    text-align: right;
    .btn-info {
      padding: 0px 10px;
      border-radius: 2px;
      font-weight: 600;
      background: $color_TI;
      border: none;
    }
  }
}
</style>

