import type { App, Plugin } from "vue";
import TextClampComp from "./text-clamp.vue";

type SFCWithInstall<T> = T & Plugin;
export const withInstall = <T>(comp: T) => {
  (comp as SFCWithInstall<T>).install = function (app: App) {
    app.component((comp as any).__name, comp);
  };
  return comp;
};

const TextClamp = withInstall(TextClampComp);

export default TextClamp;
