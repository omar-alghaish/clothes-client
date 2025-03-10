import Video from "./Video";

export default function VideoSec() {
    const videoOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                type: "video/mp4",
            },
        ],
    };

    return (
        <section className="mx-auto mt-14 max-w-[1400px] px-4">
            <div className="flex flex-col items-center space-y-6 text-center">
                {/* Section Title */}
                <h1 className="text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
                    How It Works
                </h1>

                {/* Video Container */}
                <div className="w-full max-w-[355px] md:max-w-[730px] lg:max-w-[1200px] rounded-lg overflow-hidden shadow-lg">
                    <Video options={videoOptions} />
                </div>
            </div>
        </section>
    );
}
