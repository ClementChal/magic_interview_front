import {
	type RouteConfig,
	index,
	route,
	layout,
	prefix,
} from "@react-router/dev/routes";

export default [
	layout("layouts/side-bar-layout.tsx", [index("routes/calendar.tsx")]),
	layout("layouts/base-layout.tsx", [route("login", "routes/login.tsx")]),
] satisfies RouteConfig;
