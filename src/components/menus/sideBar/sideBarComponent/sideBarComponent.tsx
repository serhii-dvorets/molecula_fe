import { useState } from "react";
import { SidebarItem as SidebarItemType } from "../sideBarItem/types";
import { SidebarItem } from "../sideBarItem";

interface SidebarProps {
  items: SidebarItemType[];
}

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
	const [collapsed, setCollapsed] = useState(false);

	const toggleSidebar = () => {
		setCollapsed(!collapsed);
	};

	return (
		<div
			className={`relative h-full bg-gray-800 text-white transition-all duration-300 ${
				collapsed ? "w-20" : "w-64"
			}`}
		>
			<div
				className="absolute top-4 right-[10px] bg-gray-700 rounded-full p-2 cursor-pointer"
				onClick={toggleSidebar}
			>
				<span className="text-xl">{collapsed ? ">" : "<"}</span>
			</div>

			<div className="flex flex-col mt-10">
				{items.map((item, index) => (
					<SidebarItem
						key={index}
						item={item}
						collapsed={collapsed}
						path={item.path}
					/>
				))}
			</div>
		</div>
	);
};
