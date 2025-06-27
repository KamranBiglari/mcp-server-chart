import { z } from "zod";
import { zodToJsonSchema } from "../utils/index";

// Define the schema for the bar chart
// {
//   type: 'bar',
//   data: {
//     labels: ['January', 'February', 'March', 'April', 'May'],
//     datasets: [
//       { label: 'Dogs', data: [50, 60, 70, 180, 190] },
//       { label: 'Cats', data: [100, 200, 300, 400, 500] },
//     ],
//   },
// }
const schema = {
  type: z.literal("bar").default("bar"),
  data: z.object({
    labels: z.array(z.string()).describe("Labels for the x-axis"),
    datasets: z.array(
      z.object({
        label: z.string().describe("Label for the dataset"),
        data: z.array(z.number()).describe("Data points for the dataset"),
      })
    ),
  }),
};

const tool = {
    name: "bar",
    description: `Generates a bar chart with the provided data.
    example input:
  \`\`\`json
    {
    "labels": ["January", "February", "March", "April", "May"],
    "datasets": [
      { "label": "Dogs", "data": [50, 60, 70, 180, 190] },
      { "label": "Cats", "data": [100, 200, 300, 400, 500] }
    ]
  }
    \`\`\`
    `,
    inputSchema: zodToJsonSchema(schema),
}

export const bar = {
    schema,
    tool,
}