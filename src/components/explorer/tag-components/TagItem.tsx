import { FC } from "react";
import { GoTag } from "react-icons/go";

interface TagProps {
  name: string;
  color: string;
  classStyle?: string;
}

const TagItem: FC<TagProps> = ({ name, color, classStyle }) => {
  return (
    <div className={`flex gap-1 m-1 items-center ${classStyle}`}>
      <GoTag color={color} size="15" />
      <span className="text-[13px] text-slate-300">{name}</span>
    </div>
  );
};
export default TagItem;
