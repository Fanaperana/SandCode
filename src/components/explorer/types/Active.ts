import { Dispatch, SetStateAction } from 'react';

export interface ActiveType {
    index: number;
    type: "folder" | "favorite" | "tag";
}

export interface ActiveContextType {
    active: ActiveType;
    setActive: Dispatch<SetStateAction<ActiveType>>;
}