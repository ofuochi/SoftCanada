import * as Icons from "react-icons/fa";
export const getIconComponent = (iconName?: string) => {
  if (!iconName) return Icons.FaQuestion; // Default fallback icon

  const Icon = Icons[iconName as keyof typeof Icons];
  return Icon || Icons.FaQuestion;
};
