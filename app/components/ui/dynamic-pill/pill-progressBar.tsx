import React from "react";

interface PillProgressBarProps {
    currentTime: string;
    totalTime: string;
    progress: number; // 0-100 percentage
}

export const PillProgressBar: React.FC<PillProgressBarProps> = ({
    currentTime,
    totalTime,
    progress,
}) => {
    // Calculate width based on progress percentage
    const progressWidth = `${progress}%`;

    return (
        <div className="items-center flex w-full gap-1 mt-4">
            <div className="text-[#E1E1E1] text-[12px] font-normal self-stretch my-auto tabular-nums min-w-[4ch] text-center">
                {currentTime}
            </div>
            <div
                className="bg-[#585858] self-stretch flex min-w-60 flex-col overflow-hidden flex-1 shrink basis-[0%] my-auto rounded-[999px]"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div
                    className="bg-[rgba(225,225,225,1)] flex shrink-0 h-2"
                    style={{ width: progressWidth }}
                />
            </div>
            <div className="text-[#E1E1E1] text-[12px] font-normal self-stretch my-auto tabular-nums min-w-[4ch] text-center">
                {totalTime}
            </div>
        </div>
    );
};
