export type SidebarItem = {
  icon: React.ReactNode;
  text: string;
  path?: string;
  children?: SidebarItem[];
};