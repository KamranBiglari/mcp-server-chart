import { z } from "zod";
import { zodToJsonSchema } from "../utils/index";

// Define the schema for the polar area chart
// {
//   type: 'polarArea',
//   data: {
//     labels: ['January', 'February', 'March', 'April', 'May'],
//     datasets: [{ data: [50, 60, 70, 180, 190] }],
//   },
// }

const schema = {
  type: z.literal("polarArea").default("polarArea"),
  data: z.object({
    labels: z.array(z.string()).describe("Labels for each polar area segment"),
    datasets: z.array(
      z.object({
        data: z.array(z.number()).describe("Data values for each segment"),
        label: z.string().optional().describe("Label for the dataset"),
        backgroundColor: z.array(z.string()).optional().describe("Background colors for each segment"),
        borderColor: z.array(z.string()).optional().describe("Border colors for each segment"),
        borderWidth: z.number().optional().describe("Width of the segment borders"),
        hoverBackgroundColor: z.array(z.string()).optional().describe("Background colors when hovering"),
        hoverBorderColor: z.array(z.string()).optional().describe("Border colors when hovering"),
        hoverBorderWidth: z.number().optional().describe("Border width when hovering"),
      })
    ),
  }),
};

const tool = {
  name: "polarArea",
  description: `Generates a polar area chart with the provided data.
  example input:
\`\`\`json
{
  "type": "polarArea",
  "data": {
    "labels": ["January", "February", "March", "April", "May"],
    "datasets": [
      {
        "data": [50, 60, 70, 180, 190]
      }
    ]
  }
}
\`\`\`
  `,
  inputSchema: zodToJsonSchema(schema),
};

export const polarArea = {
  schema,
  tool,
};
