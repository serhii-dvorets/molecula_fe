import { Sidebar } from "@/components/menus/sideBar";
import { SidebarItem } from "@/components/menus/sideBar/sideBarItem/types";
import { CalendarIcon, CogIcon, HomeIcon, UserIcon, CurrencyDollarIcon } from "@heroicons/react/16/solid";

export const SideBar = ({ children }: {children: React.ReactNode}) => {
	const sidebarItems: SidebarItem[] = [
		{
			icon: <HomeIcon className="h-6 w-6" />,
			text: "Панель керування",
			path: "/admin"
		},
		{
			icon: <CurrencyDollarIcon className="h-6 w-6" />,
			text: "Тарифи",
			path: "/admin/tariff"
		},
		{
			icon: <UserIcon className="h-6 w-6" />,
			text: "Замовники",
			path: "/admin/customer"
		},
		{
			icon: <UserIcon className="h-6 w-6" />,
			text: "Співробітники",
			path: "/admin/stuff"
		},
		{
			icon: <CalendarIcon className="h-6 w-6" />,
			text: "Замовлення",
			path: "/admin/order"
		},
		{
			icon: <CogIcon className="h-6 w-6" />,
			text: "Settings",
			path: "/admin/settings"
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
