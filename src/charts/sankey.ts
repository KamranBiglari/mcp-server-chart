import { z } from "zod";
import { zodToJsonSchema } from "../utils/index";

// Define the schema for the sankey chart
// {
//   type: 'sankey',
//   data: {
//     datasets: [
//       {
//         data: [
//           { from: 'Step A', to: 'Step B', flow: 10 },
//           { from: 'Step A', to: 'Step C', flow: 5 },
//           { from: 'Step B', to: 'Step C', flow: 10 },
//           { from: 'Step D', to: 'Step C', flow: 7 },
//         ]
//       },
//     ],
//   },
// }

const sankeyDataPointSchema = z.object({
  from: z.string().describe("Source node"),
  to: z.string().describe("Target node"),
  flow: z.number().describe("Flow value between nodes"),
});

const schema = {
  type: z.literal("sankey").default("sankey"),
  data: z.object({
    datasets: z.array(
      z.object({
        data: z.array(sankeyDataPointSchema).describe("Array of flow connections between nodes"),
        label: z.string().optional().describe("Label for the dataset"),
        colorFrom: z.string().optional().describe("Color scheme for source nodes"),
        colorTo: z.string().optional().describe("Color scheme for target nodes"),
        colorMode: z.string().optional().describe("Color mode for the flows"),
        borderWidth: z.number().optional().describe("Width of the flow borders"),
      })
    ),
  }),
};

const tool = {
  name: "sankey",
  description: `Generates a sankey diagram with the provided flow data.
  example input:
\`\`\`json
{
  "type": "sankey",
  "data": {
    "datasets": [
      {
        "data": [
          {"from": "Step A", "to": "Step B", "flow": 10},
          {"from": "Step A", "to": "Step C", "flow": 5},
          {"from": "Step B", "to": "Step C", "flow": 10},
          {"from": "Step D", "to": "Step C", "flow": 7}
        ]
      }
    ]
  }
}
\`\`\`
  `,
  inputSchema: zodToJsonSchema(schema),
};

export const sankey = {
  schema,
  tool,
};
