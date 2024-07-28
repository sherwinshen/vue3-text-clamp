<template>
  <main class="main-wrapper">
    <!-- info -->
    <div class="info-wrapper">
      <div class="flex">
        <h1>{{ t("title") }}</h1>
        <div class="btn-group">
          <button
            class="btn btn-sm"
            :class="{
              active: lang === LANG_TYPE.EN_US,
            }"
            @click="handleLang(LANG_TYPE.EN_US)"
          >
            English
          </button>
          <button
            class="btn btn-sm"
            :class="{
              active: lang === LANG_TYPE.ZH_CN,
            }"
            @click="handleLang(LANG_TYPE.ZH_CN)"
          >
            中文
          </button>
        </div>
      </div>

      <p>{{ t("desc") }}</p>
      <p>
        <a class="github" href="https://github.com/sherwinshen/vue3-text-clamp" target="_blank">GitHub →</a>
        <a class="github" href="https://github.com/Justineo/vue-clamp" target="_blank">{{ t("vue2") }} →</a>
      </p>
    </div>

    <!-- Function -->
    <section>
      <h2 id="function">
        <a href="#function">#</a>
        {{ t("functionTitle") }}
      </h2>
      <ul>
        <li>{{ t("function1") }}</li>
        <li>{{ t("function2") }}</li>
        <li>{{ t("function3") }}</li>
        <li>{{ t("function4") }}</li>
        <li>{{ t("function5") }}</li>
      </ul>
    </section>

    <!-- Demo -->
    <section>
      <h2 id="demo">
        <a href="#demo">#</a>
        {{ t("demoTitle") }}
      </h2>
      <!-- Demo1 -->
      <div class="divider text-center" data-content="↓ max-lines & max-height" />
      <div class="form-horizontal">
        <div class="form-group">
          <label class="form-label col-4 col-sm-12" for="lines">{{ t("maxLines") }}</label>
          <div class="col-8 col-sm-12">
            <input
              id="lines"
              v-model.number="state.maxLines1"
              class="form-input"
              type="number"
              min="1"
              max="8"
              step="1"
            />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label col-4 col-sm-12" for="width1">{{ t("containerWidth") }}</label>
          <div class="col-8 col-sm-12 tooltip" :data-tooltip="`${state.width1}px`">
            <input id="width1" v-model="state.width1" class="slider" type="range" min="240" max="640" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label col-4 col-sm-12">{{ t("clampStatus") }}</label>
          <div class="col-8 col-sm-12 form-text">
            {{ state.clamped1 ? t("clampYes") : t("clampNo") }}
          </div>
        </div>
      </div>
      <text-clamp
        class="demo"
        :text="t('text')"
        :max-lines="state.maxLines1"
        auto-resize
        :style="{
          width: `${state.width1}px`,
        }"
        @clamp-change="state.clamped1 = $event"
      ></text-clamp>
      <div class="form-horizontal">
        <div class="form-group">
          <label class="form-label col-4 col-sm-12" for="lines">{{ t("maxHeight") }}</label>
          <div class="col-8 col-sm-12">
            <input id="lines" v-model="state.maxHeight1" class="form-input" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label col-4 col-sm-12" for="width2">{{ t("containerWidth") }}</label>
          <div class="col-8 col-sm-12 tooltip" :data-tooltip="`${state.width2}px`">
            <input id="width2" v-model="state.width2" class="slider" type="range" min="240" max="640" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label col-4 col-sm-12">{{ t("clampStatus") }}</label>
          <div class="col-8 col-sm-12 form-text">
            {{ state.clamped2 ? t("clampYes") : t("clampNo") }}
          </div>
        </div>
      </div>
      <text-clamp
        class="demo"
        :text="t('text')"
        :max-height="state.maxHeight1"
        auto-resize
        :style="{
          width: `${state.width2}px`,
        }"
        @clamp-change="state.clamped2 = $event"
      ></text-clamp>
      <!-- Demo2 -->
      <div class="divider text-center" data-content="↓ slot `after` & slot `before` & toggle inside" />
      <div class="form-horizontal">
        <div class="form-group">
          <label class="form-label col-4 col-sm-12" for="lines">{{ t("maxLines") }}</label>
          <div class="col-8 col-sm-12">
            <input
              id="lines"
              v-model.number="state.maxLines2"
              class="form-input"
              type="number"
              min="1"
              max="8"
              step="1"
            />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label col-4 col-sm-12" for="width3">{{ t("containerWidth") }}</label>
          <div class="col-8 col-sm-12 tooltip" :data-tooltip="`${state.width3}px`">
            <input id="width3" v-model="state.width3" class="slider" type="range" min="240" max="640" />
          </div>
        </div>
      </div>
      <text-clamp
        class="demo"
        :text="t('text')"
        :max-lines="state.maxLines2"
        auto-resize
        :style="{
          width: `${state.width3}px`,
        }"
      >
        <template #before>
          <span class="featured label label-rounded label-primary">{{ t("featured") }}</span>
        </template>
        <template #after="{ toggle, expanded, clamped }">
          <button v-if="expanded || clamped" class="toggle btn btn-sm" @click="toggle">
            {{ t("toggle") }}
          </button>
        </template>
      </text-clamp>
      <!-- Demo3 -->
      <div class="divider text-center" data-content="↓ ellipsis & location" />
      <div class="form-horizontal">
        <div class="form-group">
          <label class="form-label col-4 col-sm-12" for="ellipsis">{{ t("ellipsis") }}</label>
          <div class="col-8 col-sm-12">
            <input id="ellipsis" v-model="state.ellipsis" class="form-input" maxlength="6" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label col-4 col-sm-12" for="location">{{ t("location") }}</label>
          <div class="col-auto col-sm-12">
            <label class="form-radio">
              <input v-model="state.location" type="radio" value="start" />
              <i class="form-icon" />
              {{ t("start") }}
            </label>
          </div>
          <div class="col-auto col-sm-12">
            <label class="form-radio">
              <input v-model="state.location" type="radio" value="middle" />
              <i class="form-icon" />
              {{ t("middle") }}
            </label>
          </div>
          <div class="col-auto col-sm-12">
            <label class="form-radio">
              <input v-model="state.location" type="radio" value="end" />
              <i class="form-icon" />
              {{ t("end") }}
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label col-4 col-sm-12" for="lines">{{ t("maxLines") }}</label>
          <div class="col-8 col-sm-12">
            <input
              id="lines"
              v-model.number="state.maxLines3"
              class="form-input"
              type="number"
              min="1"
              max="8"
              step="1"
            />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label col-4 col-sm-12" for="width4">{{ t("containerWidth") }}</label>
          <div class="col-8 col-sm-12 tooltip" :data-tooltip="`${state.width4}px`">
            <input id="width4" v-model="state.width4" class="slider" type="range" min="240" max="640" />
          </div>
        </div>
      </div>
      <text-clamp
        class="demo"
        :text="t('text')"
        :max-lines="state.maxLines3"
        :ellipsis="state.ellipsis"
        :location="state.location"
        auto-resize
        :style="{
          width: `${state.width4}px`,
        }"
      ></text-clamp>
    </section>

    <!-- Usage -->
    <section>
      <h2 id="usage">
        <a href="#usage">#</a>
        {{ t("usageTitle") }}
      </h2>
      <div class="divider text-center" :data-content="t('usageText')"></div>
      <highlightjs :autodetect="false" language="shell" code="$ npm i --save vue3-text-clamp" />
      <div class="divider text-center" :data-content="t('usage1')"></div>
      <highlightjs
        :autodetect="false"
        language="ts"
        code="
import { createApp } from 'vue';
import TextClamp from 'vue3-text-clamp';
import App from './App.vue';

createApp(App).use(TextClamp).mount('#app');"
      ></highlightjs>
      <div class="divider text-center" :data-content="t('usage2')"></div>
      <highlightjs
        :autodetect="false"
        language="vue"
        code="
<template>
  <text-clamp text='hello world' :max-lines='2' />
</template>

<script lang='ts' setup>
import TextClamp from 'vue3-text-clamp';
</script>
      "
      />
    </section>

    <!-- API -->
    <section>
      <h2 id="api">
        <a href="#api">#</a>
        API
      </h2>
      <div class="divider text-center" :data-content="t('api1')"></div>
      <ul>
        <li>
          <p>
            <code>text: string</code>
          </p>
          <p>{{ t("props1") }}</p>
        </li>
        <li>
          <p>
            <code>max-lines: number</code>
          </p>
          <p>{{ t("props2") }}</p>
        </li>
        <li>
          <p>
            <code>max-height: number | string</code>
          </p>
          <p>{{ t("props3") }}</p>
        </li>
        <li>
          <p>
            <code>ellipsis: string</code>
          </p>
          <p>{{ t("props4") }}</p>
          <p>
            {{ t("default") }}
            <code>'…'</code>
          </p>
        </li>
        <li>
          <p>
            <code>location: 'start' | 'middle' | 'end'</code>
          </p>
          <p>{{ t("props5") }}</p>
          <p>
            {{ t("default") }}
            <code>'end'</code>
          </p>
        </li>
        <li>
          <p>
            <code>autoResize: boolean</code>
          </p>
          <p>{{ t("props6") }}</p>
          <p>
            {{ t("default") }}
            <code>false</code>
          </p>
        </li>
        <li>
          <p>
            <code>expanded: boolean</code>
          </p>
          <p>{{ t("props7") }}</p>
          <p>
            {{ t("default") }}
            <code>false</code>
          </p>
        </li>
        <li>
          <p>
            <code>html: boolean</code>
          </p>
          <p>{{ t("props8") }}</p>
          <p>
            {{ t("default") }}
            <code>false</code>
          </p>
        </li>
      </ul>
      <div class="divider text-center" :data-content="t('api2')"></div>
      <ul>
        <li>
          <p><code>before</code></p>
          <p>{{ t("beforeSlot") }}</p>
          <p>
            {{ t("beforeScope") }}
            <code>{ expand, collapse, toggle, clamped, expanded }</code>
          </p>
          <section class="secondary">
            <p><code>expand: function(): void</code> - {{ t("scope1") }}</p>
            <p><code>collapse: function(): void</code> - {{ t("scope2") }}</p>
            <p><code>toggle: function(): void</code> - {{ t("scope3") }}</p>
            <p><code>clamped: Boolean</code> - {{ t("scope4") }}</p>
            <p><code>expanded: Boolean</code> - {{ t("scope5") }}</p>
          </section>
        </li>
        <li>
          <p><code>after</code></p>
          <p>{{ t("afterSlot") }}</p>
          <p>{{ t("afterScope") }}</p>
        </li>
      </ul>
      <div class="divider text-center" :data-content="t('api3')"></div>
      <ul>
        <li>
          <p>
            <code>clampchange</code>
          </p>
          <p>{{ t("events1") }}</p>
          <p>
            {{ t("parameterText") }}
            <code>(clamped: Boolean)</code>
          </p>
        </li>
      </ul>
    </section>

    <!-- footer -->
    <footer>
      {{ t("madeBy") }}
      <a href="https://github.com/sherwinshen" target="_blank">@sherwin shen</a>
      {{ t("create") }} ({{ t("reference") }}
      <a href="https://github.com/Justineo/vue-clamp" target="_blank">vue-clamp</a>)
    </footer>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import i18n, { langDefault, LANG_TYPE } from "./plugins/i18n";
import { useI18n } from "vue-i18n";
import TextClamp from "./../package/text-clamp.vue";

const { t } = useI18n();
const lang = ref(langDefault);
const handleLang = (language: LANG_TYPE) => {
  lang.value = language;
  (i18n as any).global.locale.value = language;
};

const state = reactive({
  clamped1: false,
  clamped2: false,
  maxLines1: 3,
  maxLines2: 3,
  maxLines3: 3,
  maxHeight1: "94px",
  width1: 640,
  width2: 640,
  width3: 640,
  width4: 640,
  ellipsis: "…",
  location: "end" as any,
});
</script>
