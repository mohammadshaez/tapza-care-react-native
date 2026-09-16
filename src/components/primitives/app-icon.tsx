import {
  AlarmClock,
  Calendar,
  CalendarPlus,
  Check,
  ChevronRight,
  ClipboardList,
  HeartPulse,
  Home,
  Pill,
  ShieldPlus,
  Stethoscope,
  TestTube,
  User,
  Users,
  type LucideIcon,
} from "lucide-react-native";

const iconMap: Record<string, LucideIcon> = {
  "alarm-clock": AlarmClock,
  calendar: Calendar,
  "calendar-plus": CalendarPlus,
  check: Check,
  "chevron-right": ChevronRight,
  "clipboard-list": ClipboardList,
  heart: HeartPulse,
  home: Home,
  pill: Pill,
  "shield-plus": ShieldPlus,
  stethoscope: Stethoscope,
  "test-tube": TestTube,
  user: User,
  users: Users,
};

type AppIconProps = {
  name: string;
  color: string;
  size: number;
};

export function AppIcon({ name, color, size }: AppIconProps) {
  const Icon = iconMap[name] ?? HeartPulse;

  return <Icon aria-hidden color={color} size={size} strokeWidth={2} />;
}
