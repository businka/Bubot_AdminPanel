import HighchartsVue from 'highcharts-vue'

import Highcharts from 'highcharts';
// import exportingInit from 'highcharts/modules/exporting';
import StockModule from "highcharts/modules/stock";

StockModule(Highcharts);
// exportingInit(Highcharts);

export default HighchartsVue
