import { z } from "zod";
import { zodToJsonSchema } from "../utils/index";

// Define the schema for the violin chart
// {
//   type: 'violin',
//   data: {
//     labels: [2012, 2013, 2014, 2015],
//     datasets: [
//       {
//         label: 'Data',
//         data: [
//           [12, 6, 3, 4],
//           [1, 8, 8, 15],
//           [1, 1, 1, 2, 3, 5, 9, 8],
//           [19, -3, 18, 8, 5, 9, 9],
//         ],
//         backgroundColor: 'rgba(56,123,45,0.2)',
//         borderColor: 'rgba(56,123,45,1.9)',
//       },
//     ],
//   },
// }

const schema = {
  type: z.literal("violin").default("violin"),
  data: z.object({
    labels: z.array(z.union([z.string(), z.number()])).describe("Labels for each violin"),
    datasets: z.array(
      z.object({
        label: z.string().describe("Label for the dataset"),
        data: z.array(z.array(z.number())).describe("Array of data arrays for each violin"),
        backgroundColor: z.string().optional().describe("Background color of the violins"),
        borderColor: z.string().optional().describe("Border color of the violins"),
        borderWidth: z.number().optional().describe("Width of the violin borders"),
      })
    ),
  }),
};

const tool = {
  name: "violin",
  description: `Generates a violin chart with the provided distribution data.
  example input:
\`\`\`json
{
  "type": "violin",
  "data": {
    "labels": [2012, 2013, 2014, 2015],
    "datasets": [
      {
        "label": "Data",
        "data": [
          [12, 6, 3, 4],
          [1, 8, 8, 15],
          [1, 1, 1, 2, 3, 5, 9, 8],
          [19, -3, 18, 8, 5, 9, 9]
        ],
        "backgroundColor": "rgba(56,123,45,0.2)",
        "borderColor": "rgba(56,123,45,1.9)"
      }
    ]
  }
}
\`\`\`
  `,
  inputSchema: zodToJsonSchema(schema),
};

export const violin = {
  schema,
  tool,
};
