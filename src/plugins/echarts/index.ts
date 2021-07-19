import { App } from 'vue'
import * as echarts from 'echarts/core'

import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  GaugeChart,
  GaugeSeriesOption
} from 'echarts/charts';
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TooltipComponent,
  ToolboxComponent,
  TitleComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  BrushComponent,
  BrushComponentOption
} from 'echarts/components';
import {
  CanvasRenderer
} from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  BarSeriesOption
  | GaugeSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | LegendComponentOption
  | BrushComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  GridComponent,
  LegendComponent,
  BrushComponent,
  BarChart,
  GaugeChart,
  CanvasRenderer
]);

const components = [
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  GaugeChart,
  CanvasRenderer
]

export default {
  install: (app: App<ECOption>) => {
    // 注册组件
    app.config.globalProperties.$echarts = echarts
    app.provide('echarts', echarts)
  }
}

