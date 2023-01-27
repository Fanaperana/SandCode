import { Dispatch, SetStateAction } from 'react';

export interface ActiveType {
    index: number;
    type: "folder" | "favorit" | "tag";
}

export interface ActiveContextType {
    active: ActiveType;
    setActive: Dispatch<SetStateAction<ActiveType>>;
}