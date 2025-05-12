import React from "react";

type Tag = {
  id: number;
  name: string;
};

type TagListDisplayProps = {
  listTag: Tag[];
  tagIdList?: number[] | null;
};

function stableColorHue(id: number): number {
  const hash = Math.abs(Math.sin(id * 9999) * 10000);
  return Math.floor(hash % 360);
}

export const TagList: React.FC<TagListDisplayProps> = ({ listTag, tagIdList }) => {
  if (!Array.isArray(tagIdList) || tagIdList.length === 0) return null;

  return (
    <>
      {tagIdList.map((tagId) => {
        const tag = listTag.find((t) => t.id === tagId);
        if (!tag) return null;

        const hue = stableColorHue(tagId);
        const bgColor = `hsl(${hue}, 70%, 70%)`;
        const textColor = `hsl(${hue}, 30%, 20%)`;

        return (
          <span
            key={`tag-${tagId}`}
            className="inline-block px-2 py-0.5 rounded text-sm font-medium mr-1"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {tag.name}
          </span>
        );
      })}
    </>
  );
};
