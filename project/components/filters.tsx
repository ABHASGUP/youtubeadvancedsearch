"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Clock, Calendar, Tv2, Shield, Languages, User2 } from "lucide-react";
import { useSearchStore } from "@/lib/store";

export function Filters() {
  const {
    duration,
    setDuration,
    sortBy,
    setSortBy,
    uploadDate,
    setUploadDate,
    videoQuality,
    setVideoQuality,
    contentRating,
    setContentRating,
    language,
    setLanguage,
  } = useSearchStore();

  return (
    <div className="flex flex-wrap gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Duration
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter by duration</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={duration} onValueChange={setDuration}>
            <DropdownMenuRadioItem value="any">Any</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="short">Short (&lt; 4 minutes)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="medium">Medium (4-20 minutes)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="long">Long (&gt; 20 minutes)</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Sort results</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
            <DropdownMenuRadioItem value="relevance">Relevance</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="date">Upload Date</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rating">Rating</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="viewCount">View Count</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Upload Date
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter by upload date</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={uploadDate} onValueChange={setUploadDate}>
            <DropdownMenuRadioItem value="any">Any time</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="hour">Last hour</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="today">Today</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="week">This week</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="month">This month</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="year">This year</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Tv2 className="mr-2 h-4 w-4" />
            Quality
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter by video quality</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={videoQuality} onValueChange={setVideoQuality}>
            <DropdownMenuRadioItem value="any">Any quality</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="hd">HD (720p or higher)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="4k">4K</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Shield className="mr-2 h-4 w-4" />
            Content Rating
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter by content rating</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={contentRating} onValueChange={setContentRating}>
            <DropdownMenuRadioItem value="any">Any rating</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="family">Family-friendly</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="teen">Teen</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="mature">Mature</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Languages className="mr-2 h-4 w-4" />
            Language
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter by language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
            <DropdownMenuRadioItem value="any">Any language</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="es">Spanish</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="fr">French</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="de">German</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="it">Italian</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="pt">Portuguese</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="ru">Russian</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="ja">Japanese</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="ko">Korean</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="hi">Hindi</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}