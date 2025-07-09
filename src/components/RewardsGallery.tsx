import { Gift, Calendar, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Reward {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dateReceived: string;
  pointsCost: number;
  category: "product" | "experience" | "discount";
}

interface RewardsGalleryProps {
  rewards: Reward[];
}

const categoryConfig = {
  product: {
    color: "bg-blue-500/10 text-blue-700 border-blue-200",
    label: "Product"
  },
  experience: {
    color: "bg-purple-500/10 text-purple-700 border-purple-200",
    label: "Experience"
  },
  discount: {
    color: "bg-green-500/10 text-green-700 border-green-200", 
    label: "Discount"
  }
};

export function RewardsGallery({ rewards }: RewardsGalleryProps) {
  return (
    <Card className="bg-gradient-card backdrop-blur-sm border-2 border-white/20 shadow-luxury animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl bg-gradient-luxury bg-clip-text text-transparent">
          <Gift className="w-5 h-5 text-primary" />
          VIP Rewards Collection
        </CardTitle>
        <p className="text-sm text-muted-foreground">Your exclusive benefits showcase</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((reward, index) => {
            const config = categoryConfig[reward.category];
            
            return (
              <div 
                key={reward.id}
                className="group relative overflow-hidden rounded-lg border bg-gradient-subtle hover:shadow-card transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img 
                    src={reward.imageUrl} 
                    alt={reward.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-white/90 border-white/50">
                      <Check className="w-3 h-3 mr-1 text-green-600" />
                      Claimed
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {reward.name}
                    </h3>
                    <Badge variant="outline" className={config.color}>
                      {config.label}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {reward.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {reward.dateReceived}
                    </div>
                    <span className="font-medium text-primary">
                      {reward.pointsCost} pts
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {rewards.length === 0 && (
          <div className="text-center py-12">
            <Gift className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No rewards claimed yet</p>
            <p className="text-sm text-muted-foreground mt-1">Start earning points to unlock amazing rewards!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}