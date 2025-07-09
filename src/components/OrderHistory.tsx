import { Calendar, ShoppingBag, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: string;
  date: string;
  description: string;
  amount: number;
  pointsEarned: number;
  type: "purchase" | "bonus" | "referral";
}

interface OrderHistoryProps {
  orders: Order[];
}

const typeConfig = {
  purchase: {
    icon: ShoppingBag,
    label: "Purchase",
    color: "bg-blue-500/10 text-blue-700 border-blue-200"
  },
  bonus: {
    icon: TrendingUp,
    label: "Bonus",
    color: "bg-green-500/10 text-green-700 border-green-200"
  },
  referral: {
    icon: TrendingUp,
    label: "Referral",
    color: "bg-purple-500/10 text-purple-700 border-purple-200"
  }
};

export function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Points History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order, index) => {
            const config = typeConfig[order.type];
            const Icon = config.icon;
            
            return (
              <div 
                key={order.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-gradient-subtle hover:shadow-card transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{order.description}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                </div>
                
                <div className="text-right flex flex-col items-end gap-2">
                  <Badge variant="outline" className={config.color}>
                    {config.label}
                  </Badge>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-bold text-primary">+{order.pointsEarned}</span>
                    <span className="text-sm text-muted-foreground">${order.amount}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}