import { FC } from "react";
import EditorInputTag from "./EditorInputTag";
import { GoListUnordered, GoCloudDownload, GoFold } from "react-icons/go";

const EditorHeader: FC = () => {
  return (
    <div className="divide-y divide-slate-700/70">
      <div className="flex justify-between p-3">
        <div className="">
          <h3 className="text-slate-400">Vue Application Modal Creation</h3>
        </div>
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
      <div>
        <EditorInputTag />
      </div>
    </div>
  );
};

export default EditorHeader;
