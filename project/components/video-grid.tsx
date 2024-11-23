"use client";

import { useEffect, useState } from "react";
import { useSearchStore } from "@/lib/store";
import { searchVideos, type Video } from "@/lib/youtube";
import { VideoCard } from "./video-card";
import { useDebounce } from "@/hooks/use-debounce";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function VideoGrid() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    searchQuery,
    duration,
    sortBy,
    uploadDate,
    videoQuality,
    contentRating,
    language,
    channelId,
  } = useSearchStore();
  const debouncedQuery = useDebounce(searchQuery, 500);
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    async function fetchVideos() {
      if (loading) return;
      
      setLoading(true);
      setError(null);

      try {
        const data = await searchVideos({
          query: debouncedQuery,
          duration,
          sortBy,
          uploadDate,
          videoQuality,
          contentRating,
          language,
          channelId,
        });

        if (isMounted && data.items) {
          const transformedVideos = data.items.map((item: any) => ({
            id: typeof item.id === 'object' ? item.id : { videoId: item.id },
            snippet: item.snippet,
          }));
          setVideos(transformedVideos);
        }
      } catch (error) {
        if (isMounted) {
          const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
          setError(errorMessage);
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
          setVideos([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchVideos();

    return () => {
      isMounted = false;
    };
  }, [
    debouncedQuery,
    duration,
    sortBy,
    uploadDate,
    videoQuality,
    contentRating,
    language,
    channelId,
    toast,
  ]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[300px] rounded-lg bg-muted animate-pulse flex items-center justify-center"
          >
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ))}
      </div>
    );
  }

  if (!loading && videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          {debouncedQuery 
            ? "No videos found. Try adjusting your search criteria." 
            : "Trending videos will appear here. Start searching to find specific content."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <VideoCard key={typeof video.id === 'string' ? video.id : video.id.videoId} video={video} />
      ))}
    </div>
  );
}