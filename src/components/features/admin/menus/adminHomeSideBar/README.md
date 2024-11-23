import { Sidebar } from "@/components/menus/sideBar";
import { SidebarItem } from "@/components/menus/sideBar/sideBarItem/types";
import { ArchiveBoxIcon, CalendarIcon, CogIcon, HomeIcon, UserIcon, CurrencyDollarIcon } from "@heroicons/react/16/solid";

export const SideBar = ({ children }: {children: React.ReactNode}) => {
	const sidebarItems: SidebarItem[] = [
		{
			icon: <HomeIcon className="h-6 w-6" />,
			text: "Панель керування",
			path: "/admin"
		},
		{
			icon: <CalendarIcon className="h-6 w-6" />,
			text: "Appointments",
			children: [
				{
					icon: <CalendarIcon className="h-6 w-6" />,
					text: "Scheduled",
					path: "/admin/scheduled"
				},
				{
					icon: <CalendarIcon className="h-6 w-6" />,
					text: "History",
					path: "/admin/history"
				},
			],
		},
	];

	return (
		<div className="flex h-screen">
			<Sidebar items={sidebarItems} />
			<div className="flex-1 p-6 overflow-y-auto">
				{children}
			</div>
		</div>
	);
};
