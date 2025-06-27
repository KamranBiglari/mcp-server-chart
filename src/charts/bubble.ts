import { z } from "zod";
import { zodToJsonSchema } from "../utils/index";

// Define the schema for the bubble chart
// {
//   type: 'bubble',
//   data: {
//     datasets: [
//       {
//         label: 'Data 1',
//         data: [
//           { x: 1, y: 4, r: 9 },
//           { x: 2, y: 4, r: 6 },
//           { x: 3, y: 8, r: 30 },
//           { x: 0, y: 10, r: 1 },
//           { x: 10, y: 5, r: 5 },
//         ],
//       },
//     ],
//   },
// }

const bubbleDataPointSchema = z.object({
  x: z.number(),
  y: z.number(),
  r: z.number().describe("Radius of the bubble"),
});

const schema = {
  type: z.literal("bubble").default("bubble"),
  data: z.object({
    datasets: z.array(
      z.object({
        label: z.string().describe("Label for the dataset"),
        data: z.array(bubbleDataPointSchema).describe("Array of {x, y, r} bubble points"),
        backgroundColor: z.string().optional().describe("Background color of the bubbles"),
        borderColor: z.string().optional().describe("Border color of the bubbles"),
        borderWidth: z.number().optional().describe("Width of the bubble borders"),
        hoverBackgroundColor: z.string().optional().describe("Background color when hovering"),
        hoverBorderColor: z.string().optional().describe("Border color when hovering"),
        hoverBorderWidth: z.number().optional().describe("Border width when hovering"),
        hoverRadius: z.number().optional().describe("Radius when hovering"),
      })
    ),
  }),
};

const tool = {
  name: "bubble",
  description: `Generates a bubble chart with the provided data points.
  example input:
\`\`\`json
{
  "type": "bubble",
  "data": {
    "datasets": [
      {
        "label": "Data 1",
        "data": [
          {"x": 1, "y": 4, "r": 9},
          {"x": 2, "y": 4, "r": 6},
          {"x": 3, "y": 8, "r": 30},
          {"x": 0, "y": 10, "r": 1},
          {"x": 10, "y": 5, "r": 5}
        ]
      }
    ]
  }
}
\`\`\`
  `,
  inputSchema: zodToJsonSchema(schema),
};

export const bubble = {
  schema,
  tool,
};
