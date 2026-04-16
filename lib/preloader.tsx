"use client";

export const Preloader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Затемнение поверх фона */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Прелоадер поверх всего */}
      <div className="relative z-10">
        <img
          src="/my-loader.svg"
          alt="Загрузка треков"
          className="w-16 h-16 animate-spin opacity-90"
        />
      </div>
    </div>
  );
};
