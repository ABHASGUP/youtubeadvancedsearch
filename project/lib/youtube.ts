import { z } from "zod";

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || 'AIzaSyAO__FCCh1AxC8xAr9U7q8seRFCqUDaAnU';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

const YouTubeError = z.object({
  error: z.object({
    code: z.number(),
    message: z.string(),
    errors: z.array(
      z.object({
        message: z.string(),
        domain: z.string(),
        reason: z.string(),
      })
    ),
  }),
});

export const videoSchema = z.object({
  id: z.object({
    videoId: z.string(),
  }).or(z.string()),
  snippet: z.object({
    title: z.string(),
    description: z.string(),
    thumbnails: z.object({
      medium: z.object({
        url: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
      }),
    }),
    channelTitle: z.string(),
    channelId: z.string(),
    publishedAt: z.string(),
  }),
});

export type Video = z.infer<typeof videoSchema>;
type YouTubeErrorType = z.infer<typeof YouTubeError>;

interface SearchParams {
  query: string;
  duration?: string;
  sortBy?: string;
  maxResults?: number;
  uploadDate?: string;
  videoQuality?: string;
  contentRating?: string;
  language?: string;
  channelId?: string;
}

async function handleYouTubeResponse(response: Response) {
  const data = await response.json();

  if (!response.ok) {
    const parsedError = YouTubeError.safeParse(data);
    if (parsedError.success) {
      const error = parsedError.data;
      throw new Error(
        `YouTube API Error (${error.error.code}): ${error.error.message}`
      );
    }
    throw new Error('Failed to fetch data from YouTube API');
  }

  return data;
}

export async function searchVideos({
  query,
  duration = 'any',
  sortBy = 'relevance',
  maxResults = 12,
  uploadDate = 'any',
  videoQuality = 'any',
  contentRating = 'any',
  language = 'any',
  channelId = '',
}: SearchParams) {
  try {
    // Base parameters for both trending and search
    const baseParams = {
      part: 'snippet',
      maxResults: maxResults.toString(),
      key: YOUTUBE_API_KEY,
      type: 'video',
      videoEmbeddable: 'true',
    };

    // If no query and no channelId, fetch trending videos
    if (!query && !channelId) {
      const params = new URLSearchParams({
        ...baseParams,
        chart: 'mostPopular',
        regionCode: 'US',
      });

      const response = await fetch(`${YOUTUBE_API_URL}/videos?${params}`);
      return handleYouTubeResponse(response);
    }

    // Regular search parameters
    const searchParams = new URLSearchParams({
      ...baseParams,
      q: query || '',
    });

    // Add optional parameters
    if (channelId) searchParams.append('channelId', channelId);
    if (duration !== 'any') searchParams.append('videoDuration', duration);
    if (sortBy !== 'relevance') searchParams.append('order', sortBy);
    if (language !== 'any') searchParams.append('relevanceLanguage', language);
    if (videoQuality === 'hd') searchParams.append('videoDefinition', 'high');

    // Handle upload date filter
    if (uploadDate !== 'any') {
      const date = new Date();
      switch (uploadDate) {
        case 'hour':
          date.setHours(date.getHours() - 1);
          break;
        case 'today':
          date.setDate(date.getDate() - 1);
          break;
        case 'week':
          date.setDate(date.getDate() - 7);
          break;
        case 'month':
          date.setMonth(date.getMonth() - 1);
          break;
        case 'year':
          date.setFullYear(date.getFullYear() - 1);
          break;
      }
      searchParams.append('publishedAfter', date.toISOString());
    }

    const response = await fetch(`${YOUTUBE_API_URL}/search?${searchParams}`);
    return handleYouTubeResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`YouTube API Error: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while fetching videos');
  }
}