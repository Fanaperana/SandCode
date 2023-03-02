import { FC } from "react";
import { EditorInputTag } from "./EditorInputTag";
import {
  GoListUnordered,
  GoCloudDownload,
  GoFold,
  GoRepo,
} from "react-icons/go";

export const EditorHeader: FC = () => {
  return (
    <div className="divide-y divide-slate-700/70 w-full">
      <div className="flex flex-row p-3 w-full items-center">
        <h3 className="grow truncate text-gray-400 hover:text-gray-300/90 font-bold w-full cursor-pointer">
          <GoRepo size="20" className="inline-block mr-3 text-gray-500" />
          Vue Application Modal
        </h3>
        <div className="shrink">
          <div className="flex gap-2">
            <button
              title="Fold all snippets"
              className="border border-slate-600/20 p-1 rounded-sm text-slate-600 hover:text-slate-200 hover:bg-slate-700/50"
            >
              <GoFold />
            </button>
            <button
              title="Download all snippets"
              className="border border-slate-600/20 p-1 rounded-sm text-slate-600 hover:text-slate-200 hover:bg-slate-700/50"
            >
              <GoCloudDownload />
            </button>
            <button
              title="View all snippets"
              className="border border-slate-600/20 p-1 rounded-sm text-slate-600 hover:text-slate-200 hover:bg-slate-700/50"
            >
              <GoListUnordered />
            </button>
          </div>
        </div>
      </div>
      <div>
        <EditorInputTag />
      </div>
    </div>
  );
};
