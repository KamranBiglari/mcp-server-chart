import { z } from "zod";
import { zodToJsonSchema } from "../utils/index";

// Define the schema for the line chart
// {
//   type: 'line',
//   data: {
//     labels: ['January', 'February', 'March', 'April', 'May'],
//     datasets: [
//       {
//         label: 'Dogs',
//         data: [50, 60, 70, 180, 190],
//         fill: false,
//         borderColor: 'blue',
//       },
//       {
//         label: 'Cats',
//         data: [100, 200, 300, 400, 500],
//         fill: false,
//         borderColor: 'green',
//       },
//     ],
//   },
// }

const schema = {
  type: z.literal("line").default("line"),
  data: z.object({
    labels: z.array(z.string()).describe("Labels for the x-axis"),
    datasets: z.array(
      z.object({
        label: z.string().describe("Label for the dataset"),
        data: z.array(z.number()).describe("Data points for the dataset"),
        fill: z.boolean().optional().describe("Whether to fill the area under the line"),
        borderColor: z.string().optional().describe("Color of the line border"),
        backgroundColor: z.string().optional().describe("Background color of the line"),
        borderWidth: z.number().optional().describe("Width of the line border"),
        pointRadius: z.number().optional().describe("Radius of the data points"),
        pointBackgroundColor: z.string().optional().describe("Background color of the data points"),
        pointBorderColor: z.string().optional().describe("Border color of the data points"),
        tension: z.number().optional().describe("Bezier curve tension of the line"),
      })
    ),
  }),
};

const tool = {
  name: "line",
  description: `Generates a line chart with the provided data.
  example input:
\`\`\`json
{
  "type": "line",
  "data": {
    "labels": ["January", "February", "March", "April", "May"],
    "datasets": [
      {
        "label": "Dogs",
        "data": [50, 60, 70, 180, 190],
        "fill": false,
        "borderColor": "blue"
      },
      {
        "label": "Cats",
        "data": [100, 200, 300, 400, 500],
        "fill": false,
        "borderColor": "green"
      }
    ]
  }
}
\`\`\`
  `,
  inputSchema: zodToJsonSchema(schema),
};

export const line = {
  schema,
  tool,
};
