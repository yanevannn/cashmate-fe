export interface ProfileMenuItem {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  path: string;
  isLogout?: boolean;
}

export const navigateAndCloseDropdown = (
  item: ProfileMenuItem,
  onLogout: () => void,
  onNavigate: (path: string) => void
) => {
  if (item.isLogout) {
    onLogout();
  } else {
    onNavigate(item.path);
  }
};
