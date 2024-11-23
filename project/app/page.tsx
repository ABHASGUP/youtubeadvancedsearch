import { SearchBar } from "@/components/search-bar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Filters } from "@/components/filters";
import { VideoGrid } from "@/components/video-grid";
import { Youtube } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Youtube className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold">Advanced YouTube Search</h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex flex-col items-center gap-4 mb-8">
          <SearchBar />
          <Filters />
        </div>

        <VideoGrid />
      </div>
    </main>
  );
}