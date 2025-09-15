"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type CustomDatePickerProps = {
    from?: Date | undefined;
    to?: Date | undefined;
    onSelect?: (from?: Date, to?: Date) => void;
    className?: string;
    placeholder?: string;
};
export function DateRangePicker({
    from,
    to,
    onSelect,
    className,
    placeholder,
}: CustomDatePickerProps) {
    const handleSelect = (date: DateRange | undefined) => {
        onSelect?.(date?.from, date?.to);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id="date"
                    variant={"outline"}
                    className={`justify-start text-center font-normal ${
                        !from && !to ? "text-muted-foreground" : ""
                    } ${className}`}
                >
                    <CalendarIcon />
                    {from ? (
                        to ? (
                            <>
                                {format(from, "yyyy-MM-dd")} -{" "}
                                {format(to, "yyyy-MM-dd")}
                            </>
                        ) : (
                            format(from, "yyyy-MM-dd")
                        )
                    ) : (
                        <span>{placeholder}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={from}
                    selected={{ from, to }}
                    onSelect={handleSelect}
                    numberOfMonths={1}
                />
            </PopoverContent>
        </Popover>
    );
}
