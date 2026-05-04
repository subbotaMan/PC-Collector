"use server";

import { CurrentBuild } from "./components/current-build";
import { PopularBuildCard } from "./components/popular-build-card";

export default async function Dashboard() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-center max-w-9xl mx-auto">
      <div className="min-w-0 flex-1 lg:max-w-4xl">
        <CurrentBuild />
      </div>

      <aside className="shrink-0 lg:sticky lg:top-6 lg:w-60">
        <PopularBuildCard />
      </aside>
    </div>
  );
}
