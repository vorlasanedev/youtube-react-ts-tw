import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";

type CategoryPillsPros = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;

export default function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillsPros) {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const container = entries[0];
      if (container == null) return;

      setIsLeftVisible(translate > 0);
      setIsRightVisible(translate + container.target.clientWidth < container.target.scrollWidth);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [categories, translate]);

  return (
    <>
      <div ref={containerRef} className="overflow-x-hidden relative">
        <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]" style={{ transform: `translateX(-${translate}px)` }}>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => onSelect(category)}
              variant={selectedCategory === category ? "dark" : "default"}
              className="py-1 px-3 rounded-lg whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
        {isLeftVisible && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white to-transparent w-24 h-full">
            <Button
              variant="ghost"
              size="icon"
              className="h-full aspect-square w-auto p-1.5"
              onClick={() => {
                setTranslate((prevTranslate) => Math.max(prevTranslate - TRANSLATE_AMOUNT, 0));
              }}
            >
              <ChevronLeft />
            </Button>
          </div>
        )}
        {isRightVisible && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white to-transparent w-24 h-full flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="h-full aspect-square w-auto p-1.5"
              onClick={() => {
                setTranslate((prevTranslate) => {
                  if (!containerRef.current) return prevTranslate;

                  const newTranslate = prevTranslate + TRANSLATE_AMOUNT;
                  const edge = containerRef.current.scrollWidth;
                  const width = containerRef.current.clientWidth;

                  return Math.min(newTranslate, edge - width);
                });
              }}
            >
              <ChevronRight />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
