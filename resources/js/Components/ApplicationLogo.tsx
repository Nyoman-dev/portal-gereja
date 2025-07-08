import { SVGAttributes } from "react";
import { Tent } from "lucide-react";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <div className="font-bold text-xl flex items-center flex-col">
            <Tent className="h-20 w-20 fill-current text-gray-500" />
            Gereja Toraja
        </div>
    );
}
