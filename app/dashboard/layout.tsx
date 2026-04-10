import bgPoster from "../../public/bg/dashboard-bg-poster.jpg";

type Props = {
  children: React.ReactNode;
};

// Next автоматически применяет эту обёртку к page.tsx,
export default function DashboardLayout({ children }: Props) {
  return (
    <>
      {/* Видео слой */}
      <div className="fixed inset-0 -z-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={bgPoster.src}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            backgroundImage: `url(${bgPoster.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <source src="/video/dashboard-bg-video.webm" type="video/webm" />
        </video>
      </div>

      {/* Затемняющий слой */}
      <div className="fixed inset-0 -z-10 bg-black/70" />

      {/* Контент */}
      <div className="container relative z-10 mx-auto mt-8 max-w-5xl px-4">
        {children}
      </div>
    </>
  );
}
