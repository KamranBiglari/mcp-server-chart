import { z } from "zod";
import { zodToJsonSchema } from "../utils/index";

// Define the schema for the sparkline chart
// {
//   type: 'sparkline',
//   data: { datasets: [{ data: [140, 60, 274, 370, 199] }] },
// }

const schema = {
  type: z.literal("sparkline").default("sparkline"),
  data: z.object({
    datasets: z.array(
      z.object({
        data: z.array(z.number()).describe("Data values for the sparkline"),
        backgroundColor: z.string().optional().describe("Background color of the sparkline"),
        borderColor: z.string().optional().describe("Border color of the sparkline"),
        borderWidth: z.number().optional().describe("Width of the sparkline border"),
        fill: z.boolean().optional().describe("Whether to fill the area under the line"),
        label: z.string().optional().describe("Label for the dataset"),
      })
    ),
  }),
};

const tool = {
  name: "sparkline",
  description: `Generates a sparkline chart with the provided data.
  example input:
\`\`\`json
{
  "type": "sparkline",
  "data": {
    "datasets": [
      {
        "data": [140, 60, 274, 370, 199]
      }
    ]
  }
}
\`\`\`
  `,
  inputSchema: zodToJsonSchema(schema),
};

export const sparkline = {
  schema,
  tool,
};
