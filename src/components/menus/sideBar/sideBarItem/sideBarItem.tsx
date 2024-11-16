import { useState } from "react";
import { SidebarItem as SidebarItemType } from "./types";
import Link from "next/link";
import { usePathname } from 'next/navigation'

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
  path?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ item, collapsed }) => {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	const toggleSubmenu = () => {
		setOpen(!open);
	};

	const isActive = item.path === pathname;

	return (
		<div>
			<div
				className={`flex items-center p-4 ${
					isActive ? "bg-teal-600" : "hover:bg-teal-600"
				} cursor-pointer transition-colors duration-200 ${
					item.children ? "justify-between" : ""
				}`}
				onClick={item.children ? toggleSubmenu : undefined}
			>
				<div
					className={`flex items-center p-3 cursor-pointer rounded-md transition-all duration-200 ${
						isActive ? "bg-teal-600" : ""
					}`}
				>
					<span className="text-xl">{item.icon}</span>
					{item.path ? (
						<Link href={item.path}>
							{!collapsed && <span className="ml-4">{item.text}</span>}
						</Link>
					) : (
						<>{!collapsed && <span className="ml-4">{item.text}</span>}</>
					)}
				</div>
				{item.children && (
					<span
						className={`transform transition-transform duration-300 ${
							open ? "rotate-90" : ""
						}`}
					>
            ▶
					</span>
				)}
			</div>

			{open && item.children && (
				<div className="pl-8">
					{item.children.map((child, index) => (
						<SidebarItem
							key={index}
							item={child}
							collapsed={collapsed}
							path={child.path}
						/>
					))}
				</div>
			)}
		</div>
	);
};
