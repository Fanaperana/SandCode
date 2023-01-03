import { FC } from "react";
import { GoTag } from "react-icons/go";

interface TagProps {
    name: string;
    color: string;
    classStyle: string;
}

const TagItem: FC<TagProps> = ({name, color, classStyle}) => {
    return (
        <div className={`flex gap-1 m-1 ${classStyle}`}>
            <GoTag color={color} size="19" />
            <span>{ name }</span>
        </div>
    );
}
export default TagItem;