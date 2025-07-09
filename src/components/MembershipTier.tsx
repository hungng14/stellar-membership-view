import { Trophy, Crown, Star, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MembershipTierProps {
  tier: "bronze" | "silver" | "gold" | "platinum";
  className?: string;
}

const tierConfig = {
  bronze: {
    name: "Bronze",
    icon: Trophy,
    bgClass: "bg-gradient-bronze",
    textClass: "text-bronze",
    borderClass: "border-bronze/30"
  },
  silver: {
    name: "Silver", 
    icon: Star,
    bgClass: "bg-gradient-silver",
    textClass: "text-silver",
    borderClass: "border-silver/30"
  },
  gold: {
    name: "Gold",
    icon: Award,
    bgClass: "bg-gradient-gold", 
    textClass: "text-gold",
    borderClass: "border-gold/30"
  },
  platinum: {
    name: "Platinum",
    icon: Crown,
    bgClass: "bg-gradient-platinum",
    textClass: "text-platinum", 
    borderClass: "border-platinum/30"
  }
};

export function MembershipTier({ tier, className }: MembershipTierProps) {
  const config = tierConfig[tier];
  const Icon = config.icon;

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "px-3 py-1.5 border-2 font-semibold text-sm animate-fade-in",
        config.borderClass,
        config.textClass,
        className
      )}
    >
      <Icon className="w-4 h-4 mr-1.5" />
      {config.name}
    </Badge>
  );
}