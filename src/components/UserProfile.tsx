import { useState, useEffect } from "react";
import { User, Coins, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MembershipTier } from "./MembershipTier";
import { ProgressBar } from "./ProgressBar";
import { OrderHistory } from "./OrderHistory";
import { RewardsGallery } from "./RewardsGallery";
import userAvatar from "@/assets/user-avatar.jpg";

// Mock data - in real app this would come from API
const mockUserData = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah@example.com",
  avatar: userAvatar,
  currentTier: "gold" as const,
  nextTier: "platinum" as const,
  currentPoints: 8750,
  pointsToNextTier: 10000,
  totalLifetimePoints: 25600,
  memberSince: "January 2022"
};

const mockOrders = [
  {
    id: "1",
    date: "Dec 15, 2024",
    description: "Premium Coffee Subscription",
    amount: 89.99,
    pointsEarned: 450,
    type: "purchase" as const
  },
  {
    id: "2", 
    date: "Dec 10, 2024",
    description: "Holiday Bonus Points",
    amount: 0,
    pointsEarned: 1000,
    type: "bonus" as const
  },
  {
    id: "3",
    date: "Dec 5, 2024", 
    description: "Friend Referral Bonus",
    amount: 0,
    pointsEarned: 500,
    type: "referral" as const
  },
  {
    id: "4",
    date: "Nov 28, 2024",
    description: "Black Friday Purchase",
    amount: 156.50,
    pointsEarned: 780,
    type: "purchase" as const
  }
];

const mockRewards = [
  {
    id: "1",
    name: "Premium Coffee Tumbler",
    description: "Insulated stainless steel tumbler with premium branding",
    imageUrl: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop",
    dateReceived: "Nov 15, 2024",
    pointsCost: 2500,
    category: "product" as const
  },
  {
    id: "2",
    name: "VIP Tasting Experience",
    description: "Exclusive coffee tasting session with our master roaster",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop",
    dateReceived: "Oct 20, 2024",
    pointsCost: 5000,
    category: "experience" as const
  },
  {
    id: "3",
    name: "20% Off Next Order",
    description: "Special discount for loyal members",
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=200&fit=crop",
    dateReceived: "Sep 30, 2024", 
    pointsCost: 1000,
    category: "discount" as const
  }
];

export function UserProfile() {
  const [pointsCounter, setPointsCounter] = useState(0);

  // Animate points counter on load
  useEffect(() => {
    const timer = setInterval(() => {
      setPointsCounter(prev => {
        if (prev < mockUserData.currentPoints) {
          return Math.min(prev + 150, mockUserData.currentPoints);
        }
        clearInterval(timer);
        return prev;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Elegant Welcome Header */}
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-luxury bg-clip-text text-transparent mb-2">
            Welcome Back, VIP
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Your exclusive membership experience awaits
          </p>
        </div>

        {/* Profile Header */}
        <Card className="relative overflow-hidden bg-gradient-card backdrop-blur-sm border-2 border-white/20 shadow-luxury animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-luxury opacity-10 rounded-full blur-3xl" />
          <CardContent className="relative p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative animate-scale-in">
                <Avatar className="w-32 h-32 border-4 border-white shadow-glow-luxury">
                  <AvatarImage src={mockUserData.avatar} alt={mockUserData.name} />
                  <AvatarFallback className="text-3xl font-bold bg-gradient-luxury text-white">
                    {mockUserData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-luxury rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg animate-pulse">
                  ★
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <h1 className="text-3xl font-bold animate-slide-up">
                      {mockUserData.name}
                    </h1>
                    <MembershipTier tier={mockUserData.currentTier} />
                  </div>
                  <p className="text-muted-foreground animate-slide-up" style={{ animationDelay: "100ms" }}>
                    Member since {mockUserData.memberSince}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Coins className="w-4 h-4" />
                      <span className="text-sm">Current Points</span>
                    </div>
                    <p className="text-3xl font-bold text-primary animate-float">
                      {pointsCounter.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Target className="w-4 h-4" />
                      <span className="text-sm">Points to {mockUserData.nextTier}</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {(mockUserData.pointsToNextTier - mockUserData.currentPoints).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">Lifetime Points</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {mockUserData.totalLifetimePoints.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <Button variant="premium" size="lg" className="animate-scale-in" style={{ animationDelay: "300ms" }}>
                <User className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress to Next Tier */}
        <Card className="bg-gradient-card backdrop-blur-sm border-2 border-white/20 shadow-luxury animate-slide-up" style={{ animationDelay: "400ms" }}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl bg-gradient-luxury bg-clip-text text-transparent">
                Journey to {mockUserData.nextTier.charAt(0).toUpperCase() + mockUserData.nextTier.slice(1)}
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Elite Status Progression
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ProgressBar 
              current={mockUserData.currentPoints}
              target={mockUserData.pointsToNextTier}
              tier={mockUserData.currentTier}
            />
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OrderHistory orders={mockOrders} />
          <RewardsGallery rewards={mockRewards} />
        </div>
      </div>
    </div>
  );
}