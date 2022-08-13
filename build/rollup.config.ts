import resolve from "@rollup/plugin-node-resolve";
import vuePlugin from "rollup-plugin-vue"; // 处理 SFC 代码
import typescript from "rollup-plugin-typescript2"; // 处理 ts 代码
import { terser } from "rollup-plugin-terser"; // 压缩代码

// 打包入口
const input = "package/index.ts";
// 外部依赖(npm包不会参与打包)
const external = ["vue", "resize-detector"];
// 插件
const plugins = [
  resolve(),
  typescript({
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      exclude: ["node_modules", "src"],
      compilerOptions: {
        declaration: true, // 是否创建 typescript 声明文件
        declarationDir: "lib/types",
        skipLibCheck: true,
      },
    },
    exclude: ["node_modules"],
  }),
  vuePlugin(),
  terser(),
];

export default [
  // umd
  {
    input,
    output: {
      file: "lib/text-clamp.js",
      format: "umd",
      name: "text-clamp",
      sourcemap: false,
      globals: {
        vue: "Vue",
        "resize-detector": "resizeDetector",
      },
      exports: "named",
    },
    plugins,
    external,
  },
  // esm
  {
    input,
    output: {
      file: "lib/text-clamp.esm.js",
      format: "es",
      sourcemap: false,
    },
    plugins,
    external,
  },
];
