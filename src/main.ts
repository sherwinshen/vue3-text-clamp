import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./plugins/i18n";
/* style */
import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-exp.min.css";
import "highlight.js/styles/atom-one-light.css";
import "highlight.js/lib/common";
import hljs from "highlight.js/lib/core";
import vueStyle from "./plugins/vue-style";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "./style.less";

hljs.registerLanguage("vue", vueStyle);
createApp(App).use(i18n).use(hljsVuePlugin).mount("#app");
