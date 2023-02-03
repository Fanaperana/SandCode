import { FC, Dispatch, SetStateAction } from "react";
import { GoPackage, GoBookmark, GoArchive, GoLink } from "react-icons/go";

interface FavProps {
  name: string;
  classStyle: string;
  icon: string;
}

const FavoritItem: FC<FavProps> = ({ name, icon, classStyle }) => {
  let ico: JSX.Element | null = null;

  if (icon === "GoPackage") {
    ico = <GoPackage className="text-sky-600" size="18" />;
  } else if (icon === "GoBookmark") {
    ico = <GoBookmark className="text-sky-600" size="18" />;
  } else if (icon === "GoArchive") {
    ico = <GoArchive className="text-sky-600" size="18" />;
  } else {
    ico = <GoLink className="text-sky-600" size="18" />;
  }

  return (
    // <div className={"text-[13px] text-slate-300 " + classStyle}>{name}</div>
    <div
      className={`flex gap-1 m-1 items-center ${classStyle}`}
      style={{
        cursor: "pointer",
      }}
    >
      {ico}
      <span className="px-1 text-[13px] text-slate-200">{name}</span>
    </div>
  );
};

export default FavoritItem;
