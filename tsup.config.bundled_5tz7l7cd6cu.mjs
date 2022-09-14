// tsup.config.ts
import { defineConfig } from "tsup";
import babel from "esbuild-plugin-babel";
var tsup_config_default = defineConfig({
  name: "tsup",
  entry: [
    "./src/index.ts"
  ],
  target: "es6",
  format: [
    "cjs",
    "esm"
  ],
  shims: false,
  clean: true,
  dts: "./src/index.ts",
  legacyOutput: true,
  splitting: false,
  esbuildPlugins: [
    babel()
  ]
});
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3RzdXAnO1xuaW1wb3J0IGJhYmVsIGZyb20gJ2VzYnVpbGQtcGx1Z2luLWJhYmVsJztcblxuLy8gaHR0cHM6Ly90c3VwLmVnb2lzdC5zaC9cbi8vIGh0dHBzOi8vZXNidWlsZC5naXRodWIuaW8vXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIG5hbWU6ICd0c3VwJyxcbiAgZW50cnk6IFtcbiAgICAnLi9zcmMvaW5kZXgudHMnLFxuICBdLFxuICB0YXJnZXQ6ICdlczYnLFxuICBmb3JtYXQ6IFtcbiAgICAnY2pzJyxcbiAgICAnZXNtJyxcbiAgXSxcbiAgc2hpbXM6IGZhbHNlLFxuICBjbGVhbjogdHJ1ZSxcbiAgZHRzOiAnLi9zcmMvaW5kZXgudHMnLFxuICAvLyBzb3VyY2VtYXA6IHRydWUsXG4gIGxlZ2FjeU91dHB1dDogdHJ1ZSxcbiAgc3BsaXR0aW5nOiBmYWxzZSxcbiAgLy8gbWluaWZ5OiB0cnVlLFxuICBlc2J1aWxkUGx1Z2luczogW1xuICAgIGJhYmVsKCksXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFLbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsRUFDUixRQUFRO0FBQUEsSUFDTjtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsRUFDUCxPQUFPO0FBQUEsRUFDUCxLQUFLO0FBQUEsRUFFTCxjQUFjO0FBQUEsRUFDZCxXQUFXO0FBQUEsRUFFWCxnQkFBZ0I7QUFBQSxJQUNkLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
