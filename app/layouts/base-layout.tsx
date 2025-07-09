import { Outlet } from "react-router";

export default function BaseLayout() {
	return (
		<div className={"h-screen"}>
			<main>
				<Outlet />
			</main>
		</div>
	);
}
