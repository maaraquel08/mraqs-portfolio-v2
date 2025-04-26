"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type DatePickerProps = {
    selected?: Date;
    onSelect?: (date: Date) => void;
    events?: Date[];
    className?: string;
};

type ViewMode = "days" | "months" | "years";

// Reusable Header Button Component
interface HeaderButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

function HeaderButton({ children, className, ...props }: HeaderButtonProps) {
    return (
        <button
            type="button"
            className={cn(
                "inline-flex h-8 items-center justify-center rounded-md border border-gray-300 bg-background px-2 py-1 text-sm font-medium transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

// Helper function outside the component for clarity
const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
};

const getCalendarDays = (
    year: number,
    month: number
): { date: Date; currentMonth: boolean }[] => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const prevMonthDays = firstDayOfMonth;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

    const calendarDays = [];

    // Previous month days
    for (let i = 0; i < prevMonthDays; i++) {
        const day = daysInPrevMonth - prevMonthDays + i + 1;
        const date = new Date(prevMonthYear, prevMonth, day);
        calendarDays.push({ date, currentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        calendarDays.push({ date, currentMonth: true });
    }

    // Next month days
    // Ensure we always fill up to 6 weeks (42 days) for consistent height
    const totalDaysFilled = calendarDays.length;
    const remainingDays = 42 - totalDaysFilled;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;

    for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(nextMonthYear, nextMonth, i);
        calendarDays.push({ date, currentMonth: false });
    }

    return calendarDays;
};

export function DatePicker({
    selected,
    onSelect,
    events = [],
    className,
}: DatePickerProps) {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        selected || null
    );
    const [viewMode, setViewMode] = React.useState<ViewMode>("days");
    const [direction, setDirection] = React.useState<"left" | "right">("right");
    const [isViewTransition, setIsViewTransition] = React.useState(false);
    const contentRef = React.useRef<HTMLDivElement>(null);

    const months = [
        { name: "Jan", value: 0 },
        { name: "Feb", value: 1 },
        { name: "Mar", value: 2 },
        { name: "Apr", value: 3 },
        { name: "May", value: 4 },
        { name: "Jun", value: 5 },
        { name: "Jul", value: 6 },
        { name: "Aug", value: 7 },
        { name: "Sep", value: 8 },
        { name: "Oct", value: 9 },
        { name: "Nov", value: 10 },
        { name: "Dec", value: 11 },
    ] as const;

    const today = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const isCurrentYear = currentYear === today.getFullYear();

    const years = React.useMemo(() => {
        const startYear = currentYear - 6;
        return Array.from({ length: 12 }, (_, i) => startYear + i);
    }, [currentYear]);

    React.useEffect(() => {
        if (selected) {
            setSelectedDate(selected);
        }
    }, [selected]);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        onSelect?.(date);
    };

    const handleMonthClick = (month: number) => {
        setIsViewTransition(true);
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(month);
            return newDate;
        });
        setViewMode("days");
    };

    const handleYearClick = (year: number) => {
        setIsViewTransition(true);
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setFullYear(year);
            return newDate;
        });
        setViewMode("days");
    };

    const isDateSelected = (date: Date) => {
        return (
            selectedDate && date.toDateString() === selectedDate.toDateString()
        );
    };

    const isDateEvent = (date: Date) => {
        return events.some((d) => d.toDateString() === date.toDateString());
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const navigate = (direction: "prev" | "next") => {
        setIsViewTransition(false);
        setDirection(direction === "prev" ? "right" : "left");
        setCurrentDate((prev) => {
            const newDate = new Date(prev);

            if (viewMode === "days") {
                newDate.setMonth(
                    prev.getMonth() + (direction === "prev" ? -1 : 1)
                );
            } else if (viewMode === "months") {
                newDate.setFullYear(
                    prev.getFullYear() + (direction === "prev" ? -1 : 1)
                );
            } else if (viewMode === "years") {
                newDate.setFullYear(
                    prev.getFullYear() + (direction === "prev" ? -12 : 12)
                );
            }

            return newDate;
        });
    };

    const toggleMonthView = () => {
        setIsViewTransition(true);
        setViewMode(viewMode === "days" ? "months" : "days");
    };

    const toggleYearView = () => {
        setIsViewTransition(true);
        setViewMode(viewMode === "years" ? "months" : "years");
    };

    const handleTodayClick = () => {
        const today = new Date();
        if (
            currentDate.getFullYear() !== today.getFullYear() ||
            currentDate.getMonth() !== today.getMonth()
        ) {
            setIsViewTransition(false);
            // Determine the direction based on the current view and date position
            if (viewMode === "days") {
                // For month view, compare months
                const currentTimestamp = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth()
                ).getTime();
                const todayTimestamp = new Date(
                    today.getFullYear(),
                    today.getMonth()
                ).getTime();
                setDirection(
                    currentTimestamp > todayTimestamp ? "right" : "left"
                );
            } else if (viewMode === "months") {
                // For year view, compare years
                setDirection(
                    currentDate.getFullYear() > today.getFullYear()
                        ? "right"
                        : "left"
                );
            } else {
                // For years view, compare year ranges
                const currentYearStart =
                    Math.floor(currentDate.getFullYear() / 12) * 12;
                const todayYear = today.getFullYear();
                setDirection(currentYearStart > todayYear ? "right" : "left");
            }

            setCurrentDate(today);
            setViewMode("days");
        }
    };

    return (
        <div
            className={cn(
                "w-full rounded-lg border border-gray-300 overflow-hidden bg-white",
                className
            )}
        >
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-300">
                <div className="flex items-center space-x-2">
                    <HeaderButton type="button" onClick={toggleMonthView}>
                        {currentDate.toLocaleString("default", {
                            month: "long",
                        })}
                    </HeaderButton>
                    <HeaderButton type="button" onClick={toggleYearView}>
                        {currentDate.getFullYear()}
                    </HeaderButton>
                </div>
                <div className="flex items-center space-x-1">
                    <HeaderButton
                        type="button"
                        onClick={handleTodayClick}
                        className="mr-1"
                    >
                        Today
                    </HeaderButton>
                    <HeaderButton
                        type="button"
                        onClick={() => navigate("prev")}
                        aria-label="Previous"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </HeaderButton>
                    <HeaderButton
                        type="button"
                        onClick={() => navigate("next")}
                        aria-label="Next"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </HeaderButton>
                </div>
            </div>

            <div className="overflow-hidden relative h-[336px] overflow-x-auto">
                <AnimatePresence initial={false} mode="wait" custom={direction}>
                    <motion.div
                        key={`${viewMode}-${currentDate.getMonth()}-${currentDate.getFullYear()}`}
                        ref={contentRef}
                        className="absolute inset-0 p-4"
                        custom={direction}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={{
                            initial: (direction) => ({
                                opacity: 0,
                                x: isViewTransition
                                    ? 0
                                    : direction === "left"
                                    ? 50
                                    : -50,
                            }),
                            animate: {
                                opacity: 1,
                                x: 0,
                                transition: {
                                    duration: 0.2,
                                    ease: "easeInOut",
                                },
                            },
                            exit: (direction) => ({
                                opacity: 0,
                                x: isViewTransition
                                    ? 0
                                    : direction === "left"
                                    ? -50
                                    : 50,
                                transition: {
                                    duration: 0.2,
                                    ease: "easeInOut",
                                },
                            }),
                        }}
                        transition={{
                            duration: 0.2,
                            layout: {
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            },
                        }}
                    >
                        {viewMode === "days" && (
                            <div className="flex flex-col h-full">
                                <div className="grid grid-cols-7 text-center text-xs font-normal text-muted-foreground pb-2">
                                    {[
                                        "Su",
                                        "Mo",
                                        "Tu",
                                        "We",
                                        "Th",
                                        "Fr",
                                        "Sa",
                                    ].map((day) => (
                                        <div key={day}>{day}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-1 flex-1">
                                    {getCalendarDays(
                                        currentYear,
                                        currentMonth
                                    ).map(({ date, currentMonth }, index) => {
                                        const isSelected = isDateSelected(date);
                                        const hasEvent = isDateEvent(date);
                                        const isTodayDate = isToday(date);

                                        // --- Calculate Button Classes ---
                                        const buttonClasses = [
                                            "h-full w-full p-0 font-normal flex items-center justify-center rounded-md transition-colors duration-200 relative",
                                        ];
                                        if (isSelected) {
                                            buttonClasses.push("bg-green-600"); // Selected background
                                        } else {
                                            buttonClasses.push(
                                                "hover:bg-gray-100"
                                            ); // Hover effect for non-selected
                                        }

                                        // --- Calculate Span (Text) Classes ---
                                        const spanClasses = ["text-sm"];
                                        if (isSelected) {
                                            spanClasses.push("text-white"); // Selected text
                                        } else if (isTodayDate) {
                                            spanClasses.push(
                                                "text-green-600 font-medium"
                                            ); // Today's text (non-selected)
                                        } else if (currentMonth) {
                                            spanClasses.push("text-foreground"); // Current month text (default)
                                        } else {
                                            spanClasses.push(
                                                "text-muted-foreground"
                                            ); // Other month text
                                        }

                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                className={cn(buttonClasses)} // Apply computed button classes
                                                onClick={() =>
                                                    currentMonth &&
                                                    handleDateClick(date)
                                                } // Only allow clicks on current month days
                                                aria-selected={isSelected}
                                                aria-label={date.toDateString()}
                                                tabIndex={currentMonth ? 0 : -1} // Improve keyboard navigation
                                            >
                                                {/* Today Indicator (only if not selected) */}
                                                {isTodayDate && !isSelected && (
                                                    <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full bg-green-600" />
                                                )}
                                                {/* Date Number Span */}
                                                <span
                                                    className={cn(spanClasses)}
                                                >
                                                    {" "}
                                                    {/* Apply computed span classes */}
                                                    {date.getDate()}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {viewMode === "months" && (
                            <div className="grid grid-cols-4 gap-2 h-full">
                                {months.map((month) => (
                                    <button
                                        key={month.value}
                                        type="button"
                                        className={cn(
                                            "flex items-center justify-center rounded-lg border border-gray-300 text-center transition-all duration-200",
                                            currentMonth === month.value
                                                ? "bg-green-600 text-white"
                                                : "hover:bg-gray-100",
                                            isCurrentYear &&
                                                today.getMonth() ===
                                                    month.value &&
                                                !(
                                                    currentMonth === month.value
                                                ) &&
                                                "border-green-600"
                                        )}
                                        onClick={() =>
                                            handleMonthClick(month.value)
                                        }
                                    >
                                        {month.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        {viewMode === "years" && (
                            <div className="grid grid-cols-4 gap-2 h-full">
                                {years.map((year) => (
                                    <button
                                        key={year}
                                        type="button"
                                        className={cn(
                                            "flex items-center justify-center rounded-lg border border-gray-300 text-center transition-all duration-200",
                                            currentYear === year &&
                                                "bg-green-600 text-white",
                                            today.getFullYear() === year &&
                                                !(currentYear === year) &&
                                                "border-green-600",
                                            currentYear !== year &&
                                                "hover:bg-gray-100"
                                        )}
                                        onClick={() => handleYearClick(year)}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
