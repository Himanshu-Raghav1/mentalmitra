import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Clock, Smartphone, Users, TrendingUp } from "lucide-react";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  const [screenTime, setScreenTime] = useState("");
  const [socialMediaTime, setSocialMediaTime] = useState("");
  const [strangersFollowed, setStrangersFollowed] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    } else {
      navigate("/userinfo");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (screenTime && socialMediaTime && strangersFollowed) {
      // Store digital habits data
      localStorage.setItem("screenTime", screenTime);
      localStorage.setItem("socialMediaTime", socialMediaTime);
      localStorage.setItem("strangersFollowed", strangersFollowed);
      
      toast({
        title: "Data collected",
        description: "Analyzing your digital habits...",
      });
      navigate("/analysis");
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mental-50 to-mental-100 p-8 flex items-center justify-center">
      <Card className="w-full max-w-md p-8 space-y-6 bg-card/80 backdrop-blur-sm">
        <div className="text-center space-y-2">
          <div className="text-4xl mb-4">👋</div>
          <h1 className="text-3xl font-bold text-mental-700">Welcome, {userName}!</h1>
          <p className="text-mental-600">Let's understand your digital habits</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="screentime" className="text-sm font-medium text-mental-700 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Daily Screen Time (hours)
            </label>
            <Input
              id="screentime"
              type="number"
              placeholder="e.g. 8"
              value={screenTime}
              onChange={(e) => setScreenTime(e.target.value)}
              required
              min="0"
              max="24"
              step="0.5"
              className="border-mental-200 focus:border-mental-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="socialmedia" className="text-sm font-medium text-mental-700 flex items-center">
              <Smartphone className="h-4 w-4 mr-2" />
              Social Media Time (hours)
            </label>
            <Input
              id="socialmedia"
              type="number"
              placeholder="e.g. 4"
              value={socialMediaTime}
              onChange={(e) => setSocialMediaTime(e.target.value)}
              required
              min="0"
              max="24"
              step="0.5"
              className="border-mental-200 focus:border-mental-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="strangers" className="text-sm font-medium text-mental-700 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Unknown People You Follow (count)
            </label>
            <Input
              id="strangers"
              type="number"
              placeholder="e.g. 150"
              value={strangersFollowed}
              onChange={(e) => setStrangersFollowed(e.target.value)}
              required
              min="0"
              className="border-mental-200 focus:border-mental-500"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-mental-500 hover:bg-mental-600 text-white"
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Analyze My Mental Health
          </Button>
        </form>
      </Card>
    </div>
  );
}