import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CornerUpLeft } from "lucide-react";
import { DatePicker } from "@/app/components/ui/datepicker";
import { Button } from "@/app/components/ui/button";

export const metadata: Metadata = {
    title: "Datepicker Showcase",
    description: "Datepicker Component Demo",
};

export default function DatepickerShowcase() {
    return (
        <div className="container py-10">
            <Link href="/showcase" className="inline-block mb-8">
                <Button variant="ghost">
                    <CornerUpLeft className="mr-2 h-4 w-4" />
                    Back to Showcase
                </Button>
            </Link>

            <div className="flex justify-center">
                <DatePicker
                    selected={new Date(2025, 3, 1)}
                    events={[new Date(2025, 3, 27), new Date(2025, 4, 5)]}
                />
            </div>
        </div>
    );
}
