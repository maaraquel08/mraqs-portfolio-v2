"use client";

import { useState, useRef, useEffect } from "react";
import { Clock } from "lucide-react";

interface TimePickerProps {
    value?: string;
    onChange?: (time: string) => void;
    format?: "12h" | "24h";
    className?: string;
    placeholder?: string;
}

interface TimeState {
    hours: number;
    minutes: number;
    period: "AM" | "PM";
}

export function TimePicker({
    value = "",
    onChange,
    format = "12h",
    className = "",
    placeholder = "Select time",
}: TimePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState<TimeState>(() => {
        if (value) return parseTime(value, format);
        return format === "24h"
            ? { hours: 0, minutes: 0, period: "AM" }
            : { hours: 12, minutes: 0, period: "AM" };
    });
    const [inputValue, setInputValue] = useState(() => {
        if (value) return value;
        const initialTime =
            format === "24h"
                ? { hours: 0, minutes: 0, period: "AM" as const }
                : { hours: 12, minutes: 0, period: "AM" as const };
        return formatTime(initialTime, format);
    });
    const [isTyping, setIsTyping] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Generate hours based on format
    const hours =
        format === "24h"
            ? Array.from({ length: 24 }, (_, i) => i)
            : Array.from({ length: 12 }, (_, i) => i + 1);

    // Generate minutes (00-59)
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    function parseTime(timeString: string, format: "12h" | "24h"): TimeState {
        const [hoursStr, minutesStr] = timeString.split(":");
        let hours = parseInt(hoursStr);
        const minutes = parseInt(minutesStr) || 0;

        if (format === "24h") {
            // For 24h format, keep hours as 0-23 and set period for internal consistency
            const period = hours >= 12 ? "PM" : "AM";
            return { hours, minutes, period };
        } else {
            const period = (timeString.includes("PM") ? "PM" : "AM") as
                | "AM"
                | "PM";
            return { hours, minutes, period };
        }
    }

    function formatTime(time: TimeState, format: "12h" | "24h") {
        if (format === "24h") {
            // For 24h format, hours are already stored as 0-23
            return `${time.hours.toString().padStart(2, "0")}:${time.minutes
                .toString()
                .padStart(2, "0")}`;
        } else {
            return `${time.hours}:${time.minutes.toString().padStart(2, "0")} ${
                time.period
            }`;
        }
    }

    function updateTime(newTime: TimeState) {
        setTime(newTime);
        const formattedTime = formatTime(newTime, format);
        setInputValue(formattedTime);
        if (onChange) {
            onChange(formattedTime);
        }
    }

    function validateAndParseInput(input: string): TimeState | null {
        const trimmedInput = input.trim();

        if (format === "24h") {
            // 24h format: HH:MM (e.g., "14:30", "09:15")
            const match = trimmedInput.match(/^(\d{1,2}):(\d{1,2})$/);
            if (match) {
                const hours = parseInt(match[1]);
                const minutes = parseInt(match[2]);

                if (
                    hours >= 0 &&
                    hours <= 23 &&
                    minutes >= 0 &&
                    minutes <= 59
                ) {
                    return {
                        hours,
                        minutes,
                        period: hours >= 12 ? "PM" : "AM",
                    };
                }
            }
        } else {
            // 12h format: H:MM AM/PM (e.g., "2:30 PM", "12:00 AM")
            const match = trimmedInput.match(
                /^(\d{1,2}):(\d{1,2})\s*(AM|PM)$/i
            );
            if (match) {
                const hours = parseInt(match[1]);
                const minutes = parseInt(match[2]);
                const period = match[3].toUpperCase() as "AM" | "PM";

                if (
                    hours >= 1 &&
                    hours <= 12 &&
                    minutes >= 0 &&
                    minutes <= 59
                ) {
                    return { hours, minutes, period };
                }
            }
        }

        return null;
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value;
        setInputValue(newValue);
        setIsTyping(true);
    }

    function handleInputBlur() {
        setIsTyping(false);

        const parsed = validateAndParseInput(inputValue);
        if (parsed) {
            setTime(parsed);
            const formattedTime = formatTime(parsed, format);
            setInputValue(formattedTime);
            if (onChange) {
                onChange(formattedTime);
            }
        } else {
            // Reset to current time if invalid input
            const currentFormatted = formatTime(time, format);
            setInputValue(currentFormatted);
        }
    }

    function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleInputBlur();
            setIsOpen(false);
        } else if (e.key === "Escape") {
            e.preventDefault();
            const currentFormatted = formatTime(time, format);
            setInputValue(currentFormatted);
            setIsTyping(false);
            setIsOpen(false);
        }
    }

    function handleInputClick() {
        setIsOpen(!isOpen);
    }

    function handleHourSelect(hour: number) {
        if (format === "24h") {
            updateTime({
                hours: hour,
                minutes: time.minutes,
                period: hour >= 12 ? "PM" : "AM",
            });
        } else {
            updateTime({
                hours: hour,
                minutes: time.minutes,
                period: time.period,
            });
        }
    }

    function handleMinuteSelect(minute: number) {
        updateTime({
            hours: time.hours,
            minutes: minute,
            period: time.period,
        });
    }

    function handlePeriodSelect(period: "AM" | "PM") {
        updateTime({
            hours: time.hours,
            minutes: time.minutes,
            period: period,
        });
    }

    const formatNumber = (num: number) => num.toString().padStart(2, "0");

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Update internal time when value prop changes
    useEffect(() => {
        if (value && !isTyping) {
            setTime(parseTime(value, format));
            setInputValue(value);
        }
    }, [value, format, isTyping]);

    // Update placeholder based on format
    const formatPlaceholder =
        format === "24h" ? "HH:MM (e.g., 14:30)" : "H:MM AM/PM (e.g., 2:30 PM)";

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {/* Input Field */}
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    placeholder={placeholder || formatPlaceholder}
                    onClick={handleInputClick}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
                    className="w-full px-3 py-2 pl-10 border border-[#d5d5d5] rounded-lg bg-white text-[#1f2122] placeholder-[#52575c] focus:outline-none focus:ring-2 focus:ring-[#1f2122] focus:border-transparent font-medium"
                />
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#52575c] pointer-events-none" />
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-[#d5d5d5] rounded-2xl shadow-lg h-[260px] flex">
                    {/* Hours Column */}
                    <div className="flex-1 flex flex-col">
                        {/* Header */}
                        <div className="border-b border-[#d5d5d5] px-3 py-3 flex items-center justify-center">
                            <span className="text-[#52575c] text-sm font-semibold uppercase tracking-wider">
                                Hours
                            </span>
                        </div>

                        {/* Scrollable List */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="flex flex-col gap-2 items-center">
                                {hours.map((hour) => {
                                    const isSelected = time.hours === hour;

                                    return (
                                        <button
                                            key={hour}
                                            onClick={() =>
                                                handleHourSelect(hour)
                                            }
                                            className={`
                    size-10 rounded-lg font-semibold text-base transition-colors
                    ${
                        isSelected
                            ? "bg-[#1f2122] text-white"
                            : "bg-white text-[#1f2122] border border-[#d5d5d5]"
                    }
                  `}
                                        >
                                            {formatNumber(hour)}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Minutes Column */}
                    <div className="flex-1 flex flex-col border-l border-[#d5d5d5]">
                        {/* Header */}
                        <div className="border-b border-[#d5d5d5] px-3 py-3 flex items-center justify-center">
                            <span className="text-[#52575c] text-sm font-semibold uppercase tracking-wider">
                                Minutes
                            </span>
                        </div>

                        {/* Scrollable List */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="flex flex-col gap-2 items-center">
                                {minutes.map((minute) => {
                                    const isSelected = time.minutes === minute;

                                    return (
                                        <button
                                            key={minute}
                                            onClick={() =>
                                                handleMinuteSelect(minute)
                                            }
                                            className={`
                    size-10 rounded-lg font-semibold text-base transition-colors
                    ${
                        isSelected
                            ? "bg-[#1f2122] text-white"
                            : "bg-white text-[#1f2122] border border-[#d5d5d5]"
                    }
                  `}
                                        >
                                            {formatNumber(minute)}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Period Column (only for 12h format) */}
                    {format === "12h" && (
                        <div className="flex-1 flex flex-col border-l border-[#d5d5d5]">
                            {/* Header */}
                            <div className="border-b border-[#d5d5d5] px-3 py-3 flex items-center justify-center">
                                <span className="text-[#52575c] text-sm font-semibold uppercase tracking-wider">
                                    Period
                                </span>
                            </div>

                            {/* Period Options */}
                            <div className="flex-1 p-4">
                                <div className="flex flex-col gap-2 items-center">
                                    {(["AM", "PM"] as const).map((period) => {
                                        const isSelected =
                                            time.period === period;

                                        return (
                                            <button
                                                key={period}
                                                onClick={() =>
                                                    handlePeriodSelect(period)
                                                }
                                                className={`
                      size-10 rounded-lg font-semibold text-base transition-colors
                      ${
                          isSelected
                              ? "bg-[#1f2122] text-white"
                              : "bg-white text-[#1f2122] border border-[#d5d5d5]"
                      }
                    `}
                                            >
                                                {period}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
