import { Dispatch, SetStateAction } from 'react';

export enum ExplorerType {
    FOLDER = "folder",
    FAVORITE = "favorite",
    TAG = "tag"
}
export interface ActiveType {
    index: number;
    type: ExplorerType;
}

export interface ActiveContextType {
    active: ActiveType;
    setActive: Dispatch<SetStateAction<ActiveType>>;
}