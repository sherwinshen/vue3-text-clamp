import { createI18n } from "vue-i18n";

import zh_CN from "./locales/zh-CN";
import en_EN from "./locales/en-US";

export enum LANG_TYPE {
  ZH_CN = "zh-CN",
  EN_US = "en-US",
}

// 语言库
const messages = {
  [LANG_TYPE.ZH_CN]: zh_CN,
  [LANG_TYPE.EN_US]: en_EN,
};

// 默认语言
export const langDefault = LANG_TYPE.EN_US;

const i18n = createI18n({
  legacy: false,
  locale: langDefault, //默认显示的语言
  messages,
});

export default i18n;
