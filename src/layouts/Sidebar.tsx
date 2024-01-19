import {
  Clapperboard,
  Home,
  Library,
  ReceiptEuro,
  Repeat,
  Underline,
} from "lucide-react";
import buttonStyles from "../components/Button";
import { twMerge } from "tailwind-merge";
import React, { ElementType } from "react";

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
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 `}
      >
        <LargeSideBarSection>
          <LargeSidebarItem isActive Icon={Home} title="Home" url="/" />
        </LargeSideBarSection>
      </aside>
    </>
  );
}

type SmallSidebarItemProps = {
  Icon: React.ComponentType<React.ComponentProps<"svg">>;
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

// type LargeSideBarSectionProps = {
//   children: React.ReactNode;
//   tittle?: string;
//   visibleItemCount?: number;
// };

function LargeSideBarSection({ children }) {
  return children;
}

type LargeSideBarItemProps = {
  Icon: React.ComponentType<React.ComponentProps<"svg">>;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  Icon,
  title,
  url,
  isActive = false,
}: LargeSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3
         ${isActive ? "font-bold bg-neutral-100 hover:text-red-400 hover:bg-secondary" : undefined }`,
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}
