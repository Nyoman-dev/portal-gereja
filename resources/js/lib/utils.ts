import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatBreadcrumbText = (word: string): string => {
    const formattedText = word
        .split("-")
        .map((w) => capitalizeFirstLetter(w))
        .join(" ");
    return formattedText;
};

export const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};
