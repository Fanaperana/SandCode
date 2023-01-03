import { FC, Dispatch, SetStateAction } from "react";

interface FavProps {
    name: string;
    classStyle: string
}

const FavoritItem: FC<FavProps> = ({name, classStyle}) => {
    return (
            <div className={classStyle}>{name}</div>
    );
}

export default FavoritItem;