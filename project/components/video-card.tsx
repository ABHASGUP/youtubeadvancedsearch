"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Video } from "@/lib/youtube";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const videoId = typeof video.id === 'object' ? video.id.videoId : video.id;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <a href={videoUrl} target="_blank" rel="noopener noreferrer">
        <CardHeader className="p-0">
          <div className="relative aspect-video">
            <Image
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
            {video.snippet.title}
          </h3>
          <div className="text-sm text-muted-foreground">
            <p className="font-medium">{video.snippet.channelTitle}</p>
            <p>
              {formatDistanceToNow(new Date(video.snippet.publishedAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </CardContent>
      </a>
    </Card>
  );
}