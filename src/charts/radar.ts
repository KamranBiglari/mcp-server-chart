import { z } from "zod";
import { zodToJsonSchema } from "../utils/index";

// Define the schema for the radar chart
// {
//   type: 'radar',
//   data: {
//     labels: ['January', 'February', 'March', 'April', 'May'],
//     datasets: [
//       { label: 'Dogs', data: [50, 60, 70, 180, 190] },
//       { label: 'Cats', data: [100, 200, 300, 400, 500] },
//     ],
//   },
// }

const schema = {
  type: z.literal("radar").default("radar"),
  data: z.object({
    labels: z.array(z.string()).describe("Labels for the radar chart axes"),
    datasets: z.array(
      z.object({
        label: z.string().describe("Label for the dataset"),
        data: z.array(z.number()).describe("Data points for each axis"),
        backgroundColor: z.string().optional().describe("Fill color of the radar area"),
        borderColor: z.string().optional().describe("Color of the radar border line"),
        borderWidth: z.number().optional().describe("Width of the border line"),
        pointBackgroundColor: z.string().optional().describe("Background color of the data points"),
        pointBorderColor: z.string().optional().describe("Border color of the data points"),
        pointRadius: z.number().optional().describe("Radius of the data points"),
        fill: z.boolean().optional().describe("Whether to fill the area"),
      })
    ),
  }),
};

const tool = {
  name: "radar",
  description: `Generates a radar chart with the provided data.
  example input:
\`\`\`json
{
  "type": "radar",
  "data": {
    "labels": ["January", "February", "March", "April", "May"],
    "datasets": [
      {
        "label": "Dogs",
        "data": [50, 60, 70, 180, 190]
      },
      {
        "label": "Cats",
        "data": [100, 200, 300, 400, 500]
      }
    ]
  }
}
\`\`\`
  `,
  inputSchema: zodToJsonSchema(schema),
};

export const radar = {
  schema,
  tool,
};
