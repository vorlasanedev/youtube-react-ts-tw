import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../utils/formatDuration";
import { formatTimeAgo } from "../utils/formatTimeAgo";

type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const VIEW_FORMATTER = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
});

export function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current == null) return;
    if (isVideoPlaying) {
      videoRef.current.currentTime = 0; // Use '=' instead of '()'
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseOut={() => setIsVideoPlaying(false)}
    >
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          alt=""
          className={`block w-full h-full object-cover
          transition-[border-radius] duration-200
           ${isVideoPlaying ? "rounded-none" : "rounded-xl"
        }`}
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-xs px-1 rounded">
          {formatDuration(duration)}
        </div>
        <video
          className={`block h-full object-cover absolute inset-0 transition-opacity
          duration-200 delay-200 ${isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"}`}
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}
        />
      </a>
      <div className="flex items-center gap-2">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img
            src={channel.profileUrl}
            alt={channel.name}
            className="w-12 h-12 rounded-full"
          />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold text-sm">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-secondary-text text-xs">
            {channel.name}
          </a>
        </div>
      </div>
      <div className="flex gap-1 text-xs text-secondary-text">
        {VIEW_FORMATTER.format(views)} views • {postedAt.toLocaleDateString()} • {formatTimeAgo(postedAt)}
      </div>
    </div>
  );
}
