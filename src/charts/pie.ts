import { z } from "zod";
import { zodToJsonSchema } from "../utils/index";

// Define the schema for the pie chart
// {
//   type: 'pie',
//   data: {
//     labels: ['January', 'February', 'March', 'April', 'May'],
//     datasets: [{ data: [50, 60, 70, 180, 190] }],
//   },
// }

const schema = {
  type: z.literal("pie").default("pie"),
  data: z.object({
    labels: z.array(z.string()).describe("Labels for each pie slice"),
    datasets: z.array(
      z.object({
        data: z.array(z.number()).describe("Data values for each pie slice"),
        label: z.string().optional().describe("Label for the dataset"),
        backgroundColor: z.array(z.string()).optional().describe("Background colors for each slice"),
        borderColor: z.array(z.string()).optional().describe("Border colors for each slice"),
        borderWidth: z.number().optional().describe("Width of the slice borders"),
        hoverBackgroundColor: z.array(z.string()).optional().describe("Background colors when hovering"),
        hoverBorderColor: z.array(z.string()).optional().describe("Border colors when hovering"),
        hoverBorderWidth: z.number().optional().describe("Border width when hovering"),
      })
    ),
  }),
};

const tool = {
  name: "pie",
  description: `Generates a pie chart with the provided data.
  example input:
\`\`\`json
{
  "type": "pie",
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

export const pie = {
  schema,
  tool,
};
