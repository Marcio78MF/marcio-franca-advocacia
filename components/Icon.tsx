'use client';
import React from 'react';
import {
  ShieldCheck,
  Landmark,
  Wallet,
  Zap,
  BadgeAlert,
  Users,
  Scale,
  CarFront,
  HeartPulse,
  Briefcase,
  MapPinned,
  Leaf,
  CircleHelp,
  Star,
  Quote,
  ExternalLink,
  ChevronDown,
  Phone,
  Search,
  BookOpen,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Clock,
  Mail,
  Check,
  FileText,
  MessageCircle
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  ShieldCheck,
  Landmark,
  Wallet,
  Zap,
  BadgeAlert,
  Users,
  Scale,
  CarFront,
  HeartPulse,
  Briefcase,
  MapPinned,
  Leaf,
  CircleHelp,
  Star,
  Quote,
  ExternalLink,
  ChevronDown,
  Phone,
  Search,
  BookOpen,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Clock,
  Mail,
  Check,
  FileText,
  MessageCircle
};

type IconProps = {
  name: string;
  size?: number | string;
  className?: string;
  strokeWidth?: number;
  [key: string]: any;
};

export default function Icon({ name, size = 20, strokeWidth = 1.5, className = '', ...props }: IconProps) {
  // Se o nome for vazio ou não existir no mapa, use CircleHelp como fallback
  const LucideIcon = (name && iconMap[name]) ? iconMap[name] : CircleHelp;

  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
}
