import AboutSection from "./components/AboutSection";
import { HolographicCard } from "./components/ui/holographic-card";

export default function Page() {
    return (
        <section>
            <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
                My Portfolio
            </h1>

            <div className="flex justify-center my-8">
                <HolographicCard
                    backgroundGradient={{
                        from: "from-gray-100",
                        via: "via-gray-200",
                        to: "to-gray-300",
                    }}
                    content={{
                        topSection: (
                            <>
                                <div className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-2 ">
                                    Senior Product Designer
                                </div>
                                <h2 className="text-4xl font-bold mb-4 text-gray-700 text-sticker-shadow">
                                    Michael Anthony Raquel
                                </h2>
                            </>
                        ),
                    }}
                />
            </div>
            <AboutSection />
        </section>
    );
}
