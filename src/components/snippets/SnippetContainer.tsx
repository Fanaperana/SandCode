import { useState, FC } from "react";
import SeachInput from "./SeachInput";
import SnippetItem from "./SnippetItem";
import "./SnippetContainer.css"

const Snippet: FC = () => {

    const snippetList = [
        {
            id: 1,
            title: "Vue Application Modal Creation",
            file: "Uncategorized",
            time: "12:00 PM",
        },
        {
            id: 2,
            title: "Tauri APP",
            file: "Rust",
            time: "12/09/22",
        },
        {
            id: 3,
            title: "SQL Reports",
            file: "MySQL",
            time: "01/10/23",
        },
        {
            id: 4,
            title: "My ReactApp",
            file: "Typescript",
            time: "01/01/22",
        },
    ];

    const [activeIndex, setActiveIndex] = useState(1);
    
    const handleActive = (id: number) => {
        setActiveIndex(id);
        console.log(id);
    }

    return (
    <div className="w-[250px]">
        <div className="flex flex-col h-full">
            <div className="shrink block border-b border-[#4d4d4d]">
                <SeachInput />
            </div>
            <div className="grow" id="snippets">
                <div className="mx-2 py-2 h-full">
                    <div className="flex flex-col snippet-list divide-y divide-[rgb(63,63,63)] h-full">
                            {snippetList.map((s) => (
                            <div
                                key={s.id}
                                onClick={() => handleActive(s.id)}
                                >    
                                <SnippetItem
                                    title={s.title}
                                    fileName={s.file}
                                    time={s.time}
                                    activeIndex={activeIndex}
                                    className={s.id === activeIndex ? 'active' : ''}
                                />
                            </div>
                         ))       
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}


export default Snippet;