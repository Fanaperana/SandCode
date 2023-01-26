import { FC, Dispatch, SetStateAction } from "react";

interface FavProps {
  name: string;
  classStyle: string;
}

const FavoritItem: FC<FavProps> = ({ name, classStyle }) => {
  return (
    <div className={"text-[13px] text-slate-300 " + classStyle}>{name}</div>
  );
};

export default FavoritItem;
