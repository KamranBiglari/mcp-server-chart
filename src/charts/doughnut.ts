import { z } from "zod";
import { zodToJsonSchema } from "../utils/index";

// Define the schema for the doughnut chart
// {
//   type: 'doughnut',
//   data: {
//     labels: ['January', 'February', 'March', 'April', 'May'],
//     datasets: [{ data: [50, 60, 70, 180, 190] }],
//   },
//   options: {
//     plugins: {
//       doughnutlabel: {
//         labels: [{ text: '550', font: { size: 20 } }, { text: 'total' }],
//       },
//     },
//   },
// }

const fontSchema = z.object({
  size: z.number().optional(),
  weight: z.string().optional(),
});

const doughnutLabelItemSchema = z.object({
  text: z.string(),
  font: fontSchema.optional(),
  color: z.string().optional(),
});

const datalabelsSchema = z.object({
  color: z.string().optional(),
  anchor: z.string().optional(),
  align: z.string().optional(),
  formatter: z.function().optional(),
  font: fontSchema.optional(),
});

const pluginsSchema = z.object({
  doughnutlabel: z.object({
    labels: z.array(doughnutLabelItemSchema).optional(),
  }).optional(),
  datalabels: datalabelsSchema.optional(),
});

const layoutSchema = z.object({
  padding: z.number().optional(),
});

const legendSchema = z.object({
  display: z.boolean().optional(),
});

const optionsSchema = z.object({
  circumference: z.number().optional(),
  rotation: z.number().optional(),
  cutoutPercentage: z.number().optional(),
  layout: layoutSchema.optional(),
  legend: legendSchema.optional(),
  plugins: pluginsSchema.optional(),
});

const schema = {
  type: z.literal("doughnut").default("doughnut"),
  data: z.object({
    labels: z.array(z.string()).describe("Labels for each doughnut slice"),
    datasets: z.array(
      z.object({
        data: z.array(z.number()).describe("Data values for each slice"),
        label: z.string().optional().describe("Label for the dataset"),
        backgroundColor: z.union([z.string(), z.array(z.string())]).optional().describe("Background colors for slices"),
        borderColor: z.union([z.string(), z.array(z.string())]).optional().describe("Border colors for slices"),
        borderWidth: z.number().optional().describe("Width of the slice borders"),
        hoverBackgroundColor: z.array(z.string()).optional().describe("Background colors when hovering"),
        hoverBorderColor: z.array(z.string()).optional().describe("Border colors when hovering"),
        hoverBorderWidth: z.number().optional().describe("Border width when hovering"),
      })
    ),
  }),
  options: optionsSchema.optional(),
};

const tool = {
  name: "doughnut",
  description: `Generates a doughnut chart with the provided data.
  example input:
\`\`\`json
{
  "type": "doughnut",
  "data": {
    "labels": ["January", "February", "March", "April", "May"],
    "datasets": [
      {
        "data": [50, 60, 70, 180, 190]
      }
    ]
  },
  "options": {
    "plugins": {
      "doughnutlabel": {
        "labels": [
          {"text": "550", "font": {"size": 20}},
          {"text": "total"}
        ]
      }
    }
  }
}
\`\`\`
  `,
  inputSchema: zodToJsonSchema(schema),
};

export const doughnut = {
  schema,
  tool,
};
