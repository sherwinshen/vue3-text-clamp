<template>
  <div
    ref="textClampRef"
    class="text-clamp"
    :style="{
      overflow: 'hidden',
      maxHeight: realMaxHeight,
    }"
  >
    <span ref="contentRef">
      <slot
        name="before"
        :expand="expand"
        :collapse="collapse"
        :toggle="toggle"
        :clamped="isClamped"
        :expanded="state.localExpanded"
      ></slot>
      <span ref="textRef" :aria-label="text"></span>
      <slot
        name="after"
        :expand="expand"
        :collapse="collapse"
        :toggle="toggle"
        :clamped="isClamped"
        :expanded="state.localExpanded"
      ></slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onMounted, onUnmounted, watch, nextTick } from "vue";
import { addListener, removeListener } from "resize-detector";

const props = withDefaults(
  defineProps<{
    text: string;
    maxHeight?: string | number;
    maxLines?: number;
    expanded?: boolean;
    location?: "start" | "middle" | "end";
    ellipsis?: string;
    autoResize?: boolean;
    html?: boolean;
  }>(),
  {
    expanded: false,
    location: "end",
    ellipsis: "…",
    autoResize: false,
    html: false,
  }
);
const emits = defineEmits<{
  (e: "clamp-change", data: boolean): void;
  (e: "update:expanded", data: boolean): void;
}>();

const textClampRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);
const state = reactive({
  offset: 0,
  localExpanded: !!props.expanded,
  unregisterResizeCallback: null as null | Function,
});

const realMaxHeight = computed(() => {
  if (state.localExpanded) return undefined;
  if (!props.maxHeight) return undefined;
  return typeof props?.maxHeight === "number" ? `${props?.maxHeight}px` : props?.maxHeight;
});

const applyChange = () => {
  textRef.value && (props?.html ? textRef.value.innerHTML = realText.value : textRef.value.textContent = realText.value);
};
const update = () => {
  if (state.localExpanded) return;
  applyChange();
  if (isOverflow() || isClamped.value) {
    search();
  }
};
const init = () => {
  if (!props.text) return;
  state.offset = props.text.length;
  cleanUp();
  if (props.autoResize && textClampRef.value) {
    addListener(textClampRef.value, update);
    state.unregisterResizeCallback = () => {
      textClampRef.value && removeListener(textClampRef.value, update);
    };
  }
  update();
};
const cleanUp = () => {
  state.unregisterResizeCallback?.();
};

const isOverflow = () => {
  if (!props.maxLines && !props.maxHeight) return false;
  if (!textClampRef.value) return false;
  if (props.maxLines && getLines() > props.maxLines) return true;
  if (props.maxHeight && textClampRef.value.scrollHeight > textClampRef.value.offsetHeight) return true;
  return false;
};
const getLines = () => {
  if (!contentRef.value) return 0;
  // see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getClientRects
  return Object.keys(
    Array.prototype.slice.call(contentRef.value.getClientRects()).reduce((prev, { top, bottom }) => {
      const key = `${top}/${bottom}`;
      if (!prev[key]) {
        prev[key] = true;
      }
      return prev;
    }, {})
  ).length;
};
const search = (...range: number[]) => {
  const [from = 0, to = state.offset] = range;
  if (to - from <= 3) {
    stepToFit();
    return;
  }
  const target = Math.floor((to + from) / 2);
  clampAt(target);
  if (isOverflow()) {
    search(from, target);
  } else {
    search(target, to);
  }
};
const clampAt = (offset: number) => {
  state.offset = offset;
  applyChange();
};
const stepToFit = () => {
  fill();
  clamp();
};
const fill = () => {
  while ((!isOverflow() || getLines() < 2) && state.offset < props.text.length) {
    moveEdge(1);
  }
};
const clamp = () => {
  while (isOverflow() && getLines() > 1 && state.offset > 0) {
    moveEdge(-1);
  }
};
const moveEdge = (steps: number) => {
  clampAt(state.offset + steps);
};

const isClamped = computed(() => {
  if (!props.text) return false;
  return state.offset !== props.text.length;
});
watch(
  () => isClamped.value,
  (val: boolean) => {
    setTimeout(() => {
      emits("clamp-change", val);
    }, 0);
  },
  { immediate: true }
);
const realText = computed(() => {
  return isClamped.value ? clampedText.value : props.text;
});
const clampedText = computed(() => {
  if (props.location === "start") {
    return props.ellipsis + (props.text.slice(-state.offset) || "").trim();
  }
  if (props.location === "middle") {
    const split = Math.floor(state.offset / 2);
    return (props.text.slice(0, split) || "").trim() + props.ellipsis + (props.text.slice(-split) || "").trim();
  }
  return (props.text.slice(0, state.offset) || "").trim() + props.ellipsis;
});

const expand = () => {
  state.localExpanded = true;
};
const collapse = () => {
  state.localExpanded = false;
};
const toggle = () => {
  state.localExpanded = !state.localExpanded;
};
watch(
  () => props.expanded,
  (val: boolean) => {
    state.localExpanded = val;
  }
);
watch(
  () => state.localExpanded,
  (val: boolean) => {
    if (val) {
      clampAt(props.text.length);
    } else {
      update();
    }
    if (props.expanded !== val) {
      emits("update:expanded", val);
    }
  }
);

watch(
  () => [props.maxLines, props.maxHeight, props.ellipsis, props.location, isClamped.value].join(),
  () => {
    nextTick(() => {
      update();
    });
  }
);
watch(
  () => [props.text, props.autoResize].join(),
  () => {
    nextTick(() => {
      init();
    });
  }
);
onUnmounted(() => {
  cleanUp();
});
onMounted(() => {
  init();
});
</script>
