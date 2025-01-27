import { registerDetailedDynamicViews, registerDynamicViews } from "../../unigraph-react";
import { BacklinkView } from "../../components/ObjectView/BacklinkView";
import { Html } from "./Html";
import { InterfaceSemantic } from "./InterfaceSemantic";
import { Markdown } from "./Markdown";
import { Tag } from "./Tag";

export const init = () => {
    registerDetailedDynamicViews({"$/schema/html": {view: Html}});
    registerDetailedDynamicViews({"$/schema/tag": {view: BacklinkView}});
    registerDetailedDynamicViews({"$/schema/markdown": {view: Markdown}});
    registerDynamicViews({"$/schema/markdown": Markdown});
    registerDynamicViews({"$/schema/tag": {view: Tag}});
    registerDynamicViews({"$/schema/interface/semantic": InterfaceSemantic})
}