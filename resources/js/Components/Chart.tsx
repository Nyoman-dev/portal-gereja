"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    masuk: {
        label: "Pemasukan",
        color: "#050303",
    },
    keluar: {
        label: "Pengeluaran",
        color: "#050303",
    },
} satisfies ChartConfig;

type Laporan = {
    id: number;
    tanggal: string;
    keterangan: string;
    total_masuk: string;
    total_keluar: string;
};

export function ChartBarInteractive({ laporans }: { laporans: Laporan[] }) {
    const chartData = React.useMemo(
        () =>
            laporans.map((lap) => ({
                date: lap.tanggal,
                masuk: Number(lap.total_masuk),
                keluar: Number(lap.total_keluar),
            })),
        [laporans]
    );
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("masuk");

    const total = React.useMemo(
        () => ({
            masuk: chartData.reduce((acc, curr) => acc + curr.masuk, 0),
            keluar: chartData.reduce((acc, curr) => acc + curr.keluar, 0),
        }),
        [chartData]
    );
    return (
        <Card className="py-0">
            <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                    <CardTitle>Alur kas Gereja</CardTitle>
                    <CardDescription>
                        Ringkasan pemasukan dan pengeluaran
                    </CardDescription>
                </div>
                <div className="flex">
                    {["masuk", "keluar"].map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-muted-foreground text-xs">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg leading-none font-bold sm:text-3xl">
                                    {total[chart].toLocaleString()}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("id-ID", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey={activeChart}
                                    labelFormatter={(value) =>
                                        new Date(value).toLocaleDateString(
                                            "id-ID",
                                            {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )
                                    }
                                />
                            }
                        />
                        <Bar
                            dataKey={activeChart}
                            fill={`var(--color-${activeChart})`}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
