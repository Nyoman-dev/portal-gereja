"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { id } from "date-fns/locale";

export function DatePicker({
    value,
    onChange,
    className = "",
}: {
    value?: Date;
    onChange: (date?: Date) => void;
    placeholder?: string;
    className?: string;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!value}
                    className={`${className}data-[empty=true]:text-muted-foreground justify-start text-left font-normal`}
                >
                    <CalendarIcon />
                    {value ? (
                        format(value, "EEEE, dd-MM-yyyy", { locale: id })
                    ) : (
                        <span>Pilih tanggal</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
