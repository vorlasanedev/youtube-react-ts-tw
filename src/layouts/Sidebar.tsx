import {
  ChevronDown,
  ChevronUp,
  Home,
  Library,
  Repeat,
  Clapperboard,
  History,
  PlaySquare,
  Clock,
  ListVideo,
} from "lucide-react";
import buttonStyles from "../components/Button";
import { twMerge } from "tailwind-merge";
import React, { ElementType, useState } from "react";
import Button from "../components/Button";
import { playlists } from "../data/sidebar";

export function Sidebar() {
  return (
    <>
      <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden">
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>
      <aside
        className={`w-72 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-4 `}
      >
        <LargeSidebarSection
        // visibleItemCount={1}
        >
          <LargeSidebarItem IconOnImgUrl={Home} title="Home" url="/" />
          <LargeSidebarItem
            IconOnImgUrl={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem IconOnImgUrl={Library} title="Library" url="/library" />
          <LargeSidebarItem IconOnImgUrl={History} title="History" url="/history" />
          <LargeSidebarItem IconOnImgUrl={PlaySquare} title="Your Videos" url="/your-videos" />
          <LargeSidebarItem IconOnImgUrl={Clock} title="Watch Later" url="/playlist?lsi=wl" />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              IconOnImgUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions">
          
          <LargeSidebarItem
            IconOnImgUrl={PlaySquare}
            title="YouTube Premium"
            url="/premium"
          />
          <LargeSidebarItem
            IconOnImgUrl={PlaySquare}
            title="Live"
            url="/live"
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
}

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSideBarSectionProps = {
  children: React.ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSideBarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = React.Children.toArray(children).flat();
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
}

type LargeSideBarItemProps = {
  IconOnImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  IconOnImgUrl,
  title,
  url,
  isActive = false,
}: LargeSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `flex items-center py-3 px-4 gap-4 rounded-lg 
         ${
           isActive
             ? "bg-gray-100 text-gray-900"
             : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
         }`
      )}
    >
      {typeof IconOnImgUrl === "string" ? (
        <img src={IconOnImgUrl} alt={title} className="w-6 h-6" />
      ) : (
        <IconOnImgUrl className="w-6 h-6" />
      )}
      
      {/* <IconOnImgUrl className="w-6 h-6" />
      <div className="text-base">{title}</div> */}
    </a>
  );
}
