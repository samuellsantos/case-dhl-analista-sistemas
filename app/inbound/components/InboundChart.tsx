"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type InboundChartProps = {
  data: { day: string; volumes: number; pecas: number }[]
}

export function ChartInbound({ data }: InboundChartProps) {
  const chartConfig = {
    volumes: { label: "Volumes", color: "#FFCC00" },
    pecas: { label: "Peças", color: "#FF0000" },
  } satisfies ChartConfig

  return (
    <Card className="w-full flex items-center justify-center">
      <CardHeader className="w-full">
        <CardTitle>Inbounds Recebidos</CardTitle>
        <CardDescription>Quantidade por dia</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <BarChart width={300} height={180} data={data} barCategoryGap="20%">
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="volumes"
              fill="#FFCC00"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="pecas"
              fill="#FF0000"
              radius={[0, 0, 4, 4]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Total de volumes e peças recebidos
        </div>
      </CardFooter>
    </Card>
  )
}
