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
  Flame,
  ShoppingBag,
  Music2,
  Film,
  Radio,
  Gamepad2,
  Trophy,
  Lightbulb,
  Shirt,
  Podcast,
  Newspaper,
} from "lucide-react";
import buttonStyles from "../components/Button";
import { twMerge } from "tailwind-merge";
import React, { ElementType, useState } from "react";
import Button from "../components/Button";
import { playlists } from "../data/sidebar";
import { useSidebarContext } from "../contexts/SidebarContext";
import { PageHeaderFirstSection } from "./PageHeder";

export function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1  ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>

      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}

      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-4  ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white mix-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderFirstSection hidden={false} />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem IconOrImgUrl={Home} title="Home" url="/" />
          <LargeSidebarItem
            IconOrImgUrl={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImgUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            IconOrImgUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconOrImgUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/playlist?lsi=wl"
          />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              IconOrImgUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions">
          {/* {subscriptions.map(subscription => (
            <LargeSidebarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))} */}

          <LargeSidebarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSidebarItem
            IconOrImgUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" />
          <LargeSidebarItem
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
        </LargeSidebarSection>
        <hr />

        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSidebarItem
            IconOrImgUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" />
          <LargeSidebarItem
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSidebarItem
            IconOrImgUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItem
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSidebarItem
            IconOrImgUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
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
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  IconOrImgUrl,
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
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} alt={title} className="w-6 h-6" />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}

      {/* <IconOrImgUrl className="w-6 h-6" />
      <div className="text-base">{title}</div> */}
    </a>
  );
}
