"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const months = Array.from({ length: 12 }, (_, i) => i);

export function MonthPicker({
    value,
    onChange,
    className = "",
    years = [2023, 2024, 2025], // default range tahun, bisa kamu sesuaikan
}: {
    value?: Date;
    onChange: (date?: Date) => void;
    className?: string;
    years?: number[];
}) {
    const [selectedYear, setSelectedYear] = React.useState(
        value?.getFullYear() ?? new Date().getFullYear()
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!value}
                    className={cn(
                        className,
                        "data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? (
                        format(value, "MMMM yyyy", { locale: id })
                    ) : (
                        <span>Pilih Bulan & Tahun</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-3 space-y-3">
                {/* Dropdown Tahun */}
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="w-full rounded-md border px-2 py-1"
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>

                {/* Grid Bulan */}
                <div className="grid grid-cols-3 gap-2">
                    {months.map((monthIdx) => {
                        const monthDate = new Date(selectedYear, monthIdx, 1);
                        const isActive =
                            value?.getFullYear() === selectedYear &&
                            value?.getMonth() === monthIdx;

                        return (
                            <Button
                                key={monthIdx}
                                variant={isActive ? "default" : "outline"}
                                className="w-full"
                                onClick={() => onChange(monthDate)}
                            >
                                {format(monthDate, "MMM", { locale: id })}
                            </Button>
                        );
                    })}
                </div>
            </PopoverContent>
        </Popover>
    );
}
