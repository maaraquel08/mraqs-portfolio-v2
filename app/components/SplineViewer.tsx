"use client";

import { useEffect } from "react";

export default function SplineViewer({ url }: { url: string }) {
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "module";
        script.src =
            "https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js";
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="w-full h-full">
            <spline-viewer url={url} />
        </div>
    );
}
