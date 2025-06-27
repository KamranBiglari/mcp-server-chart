import { z } from "zod";
import { zodToJsonSchema } from "../utils/index";

// Define the schema for the gauge chart
// {
//   type: 'gauge',
//   data: {
//     datasets: [
//       {
//         value: 50,
//         data: [20, 40, 60],
//         backgroundColor: ['green', 'orange', 'red'],
//         borderWidth: 2,
//       },
//     ],
//   },
//   options: {
//     valueLabel: {
//       fontSize: 22,
//       backgroundColor: 'transparent',
//       color: '#000',
//       formatter: function (value, context) {
//         return value + ' mph';
//       },
//       bottomMarginPercentage: 10,
//     },
//   },
// }

const valueLabelSchema = z.object({
  fontSize: z.number().optional(),
  backgroundColor: z.string().optional(),
  color: z.string().optional(),
  formatter: z.function().optional(),
  bottomMarginPercentage: z.number().optional(),
});

const optionsSchema = z.object({
  valueLabel: valueLabelSchema.optional(),
});

const schema = {
  type: z.literal("gauge").default("gauge"),
  data: z.object({
    datasets: z.array(
      z.object({
        value: z.number().describe("Current value of the gauge"),
        data: z.array(z.number()).describe("Threshold values for different sections"),
        backgroundColor: z.array(z.string()).describe("Background colors for each section"),
        borderWidth: z.number().optional().describe("Width of the gauge border"),
        label: z.string().optional().describe("Label for the dataset"),
      })
    ),
  }),
  options: optionsSchema.optional(),
};

const tool = {
  name: "gauge",
  description: `Generates a gauge chart with the provided value and thresholds.
  example input:
\`\`\`json
{
  "type": "gauge",
  "data": {
    "datasets": [
      {
        "value": 50,
        "data": [20, 40, 60],
        "backgroundColor": ["green", "orange", "red"],
        "borderWidth": 2
      }
    ]
  },
  "options": {
    "valueLabel": {
      "fontSize": 22,
      "backgroundColor": "transparent",
      "color": "#000",
      "bottomMarginPercentage": 10
    }
  }
}
\`\`\`
  `,
  inputSchema: zodToJsonSchema(schema),
};

export const gauge = {
  schema,
  tool,
};
