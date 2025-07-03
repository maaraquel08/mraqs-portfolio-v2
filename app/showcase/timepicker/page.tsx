"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CornerUpLeft } from "lucide-react";
import { TimePicker } from "@/app/components/ui/timepicker";
import { Button } from "@/app/components/ui/button";

export default function TimepickerShowcase() {
    const [time12h, setTime12h] = useState("");
    const [time24h, setTime24h] = useState("");
    const [timeDefault, setTimeDefault] = useState("");

    return (
        <div className="container py-10">
            <Link href="/showcase" className="inline-block mb-8">
                <Button variant="ghost">
                    <CornerUpLeft className="mr-2 h-4 w-4" />
                    Back to Showcase
                </Button>
            </Link>

            <h1 className="text-3xl font-bold tracking-tight mb-8">
                Time Picker Component
            </h1>

            <p className="text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl">
                A clean and interactive time picker component with input field
                trigger and dropdown selection. Supports both 12-hour and
                24-hour formats with keyboard and mouse interactions.
            </p>

            <div className="space-y-12 max-w-md">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">
                            12-Hour Format
                        </h2>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                            Selected:{" "}
                            <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                                {time12h || "None"}
                            </span>
                        </p>
                        <TimePicker
                            value={time12h}
                            format="12h"
                            onChange={setTime12h}
                            placeholder="Select time (12h)"
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">
                            24-Hour Format
                        </h2>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                            Selected:{" "}
                            <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                                {time24h || "None"}
                            </span>
                        </p>
                        <TimePicker
                            value={time24h}
                            format="24h"
                            onChange={setTime24h}
                            placeholder="Select time (24h)"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
