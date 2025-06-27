import { z } from "zod";
import { zodToJsonSchema } from "../utils/index";

// Define the schema for the radial gauge chart
// {
//   type: 'radialGauge',
//   data: { datasets: [{ data: [70], backgroundColor: 'green' }] },
// }

const schema = {
  type: z.literal("radialGauge").default("radialGauge"),
  data: z.object({
    datasets: z.array(
      z.object({
        data: z.array(z.number()).describe("Single value array representing the gauge value"),
        backgroundColor: z.string().optional().describe("Background color of the gauge"),
        borderColor: z.string().optional().describe("Border color of the gauge"),
        borderWidth: z.number().optional().describe("Width of the gauge border"),
        label: z.string().optional().describe("Label for the dataset"),
      })
    ),
  }),
};

const tool = {
  name: "radialGauge",
  description: `Generates a radial gauge chart with the provided value.
  example input:
\`\`\`json
{
  "type": "radialGauge",
  "data": {
    "datasets": [
      {
        "data": [70],
        "backgroundColor": "green"
      }
    ]
  }
}
\`\`\`
  `,
  inputSchema: zodToJsonSchema(schema),
};

export const radialGauge = {
  schema,
  tool,
};
