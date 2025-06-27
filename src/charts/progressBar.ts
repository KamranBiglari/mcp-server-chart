import { z } from "zod";
import { zodToJsonSchema } from "../utils/index";

// Define the schema for the progress bar chart
// {
//   type: 'progressBar',
//   data: {
//     datasets: [
//       {
//         data: [50],
//       },
//     ],
//   },
// }

const schema = {
  type: z.literal("progressBar").default("progressBar"),
  data: z.object({
    datasets: z.array(
      z.object({
        data: z.array(z.number()).describe("Progress value (typically 0-100)"),
        backgroundColor: z.string().optional().describe("Background color of the progress bar"),
        borderColor: z.string().optional().describe("Border color of the progress bar"),
        borderWidth: z.number().optional().describe("Width of the progress bar border"),
        label: z.string().optional().describe("Label for the dataset"),
        barColor: z.string().optional().describe("Color of the progress bar fill"),
        barBackgroundColor: z.string().optional().describe("Background color of the empty progress bar"),
      })
    ),
  }),
};

const tool = {
  name: "progressBar",
  description: `Generates a progress bar chart with the provided value.
  example input:
\`\`\`json
{
  "type": "progressBar",
  "data": {
    "datasets": [
      {
        "data": [50]
      }
    ]
  }
}
\`\`\`
  `,
  inputSchema: zodToJsonSchema(schema),
};

export const progressBar = {
  schema,
  tool,
};
