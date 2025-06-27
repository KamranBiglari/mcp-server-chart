import { z } from "zod";
import { zodToJsonSchema } from "../utils/index";

// Define the schema for the scatter chart
// {
//   type: 'scatter',
//   data: {
//     datasets: [
//       {
//         label: 'Data 1',
//         data: [
//           { x: 2, y: 4 },
//           { x: 3, y: 3 },
//           { x: -10, y: 0 },
//           { x: 0, y: 10 },
//           { x: 10, y: 5 },
//         ],
//       },
//     ],
//   },
// }

const scatterDataPointSchema = z.object({
  x: z.number(),
  y: z.number(),
});

const schema = {
  type: z.literal("scatter").default("scatter"),
  data: z.object({
    datasets: z.array(
      z.object({
        label: z.string().describe("Label for the dataset"),
        data: z.array(scatterDataPointSchema).describe("Array of {x, y} coordinate points"),
        backgroundColor: z.string().optional().describe("Background color of the points"),
        borderColor: z.string().optional().describe("Border color of the points"),
        borderWidth: z.number().optional().describe("Width of the point borders"),
        pointRadius: z.number().optional().describe("Radius of the data points"),
        pointBackgroundColor: z.string().optional().describe("Background color of the data points"),
        pointBorderColor: z.string().optional().describe("Border color of the data points"),
        showLine: z.boolean().optional().describe("Whether to show lines connecting the points"),
      })
    ),
  }),
};

const tool = {
  name: "scatter",
  description: `Generates a scatter chart with the provided data points.
  example input:
\`\`\`json
{
  "type": "scatter",
  "data": {
    "datasets": [
      {
        "label": "Data 1",
        "data": [
          {"x": 2, "y": 4},
          {"x": 3, "y": 3},
          {"x": -10, "y": 0},
          {"x": 0, "y": 10},
          {"x": 10, "y": 5}
        ]
      }
    ]
  }
}
\`\`\`
  `,
  inputSchema: zodToJsonSchema(schema),
};

export const scatter = {
  schema,
  tool,
};
