import AssetActionPlugin from "../AssetActionPlugin.js";
import { URI } from "stac-js/src/utils.js";
import i18n from "../../i18n";

const GRIDLOOK_SUPPORTED_TYPES = [
  'application/vnd+zarr',
  'application/vnd.zarr',
];

const DEFAULT_GRIDLOOK_URL = "https://grid4earth.github.io/gridlook/";

export default class Gridlook extends AssetActionPlugin {
  get show() {
    return this.component.isBrowserProtocol && GRIDLOOK_SUPPORTED_TYPES.includes(this.asset.type)
  }

  get uri() {
    // assets (or their item / collection) can ask for another Gridlook build, e.g. the
    // preview of a feature that is not deployed yet
    let uri = URI(this.asset.getMetadata("gridlook:url") || DEFAULT_GRIDLOOK_URL);
    const dataset_url = this.component.href;

    uri.hash(dataset_url);

    return uri;
  }

  get text() {
    return i18n.global.t("actions.openIn", { service: "gridlook" });
  }
}
