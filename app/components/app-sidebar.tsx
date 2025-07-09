import {
	Calendar,
	ChartArea,
	CirclePlus,
	Compass,
	Grid2X2,
	Lightbulb,
	Megaphone,
	Sparkles,
	SquarePen,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";

const data = {
	navCreate: [
		{
			title: "Nouveau Post",
			url: "#",
			icon: CirclePlus,
		},
		{
			title: "Editeur",
			url: "#",
			icon: SquarePen,
		},
		{
			title: "Accroches",
			url: "#",
			icon: Megaphone,
		},
	],
	navDiscover: [
		{
			title: "Idées",
			url: "#",
			icon: Lightbulb,
		},
		{
			title: "Inspirations",
			url: "#",
			icon: Compass,
		},
	],
	navManage: [
		{
			title: "Mes Posts",
			url: "#",
			icon: Grid2X2,
		},
		{
			title: "Métriques",
			url: "#",
			icon: ChartArea,
		},
		{
			title: "Calendrier",
			url: "#",
			icon: Calendar,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<a href="#">
								<Sparkles className="!size-5" />
								<span className="text-base font-bold">MagicPost_</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navCreate} title="Créer" />
				<NavMain items={data.navDiscover} title="Découvrir" />
				<NavMain items={data.navManage} title="Métriques" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser/>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
