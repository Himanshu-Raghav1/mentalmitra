import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, MapPin, Calendar, Activity, Brain, Wine, Heart, MessageSquare } from "lucide-react";

export default function UserInfo() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [exerciseMinutes, setExerciseMinutes] = useState("");
  const [meditationMinutes, setMeditationMinutes] = useState("");
  const [drinkingHabit, setDrinkingHabit] = useState("");
  const [smokingHabit, setSmokingHabit] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState("");
  const [depressionLevel, setDepressionLevel] = useState("");
  const [detailedProblems, setDetailedProblems] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name && age && city && exerciseMinutes && meditationMinutes && 
        drinkingHabit && smokingHabit && confidenceLevel && depressionLevel) {
      // Store user info in localStorage for now
      localStorage.setItem("userName", name);
      localStorage.setItem("userAge", age);
      localStorage.setItem("userCity", city);
      localStorage.setItem("exerciseMinutes", exerciseMinutes);
      localStorage.setItem("meditationMinutes", meditationMinutes);
      localStorage.setItem("drinkingHabit", drinkingHabit);
      localStorage.setItem("smokingHabit", smokingHabit);
      localStorage.setItem("confidenceLevel", confidenceLevel);
      localStorage.setItem("depressionLevel", depressionLevel);
      localStorage.setItem("detailedProblems", detailedProblems);
      
      toast({
        title: "Information saved",
        description: "Let's continue to your welcome screen",
      });
      navigate("/welcome");
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mental-50 to-mental-100 p-8 flex items-center justify-center">
      <Card className="w-full max-w-lg p-8 space-y-6 bg-card/80 backdrop-blur-sm max-h-screen overflow-hidden">
        <div className="text-center space-y-2">
          <div className="text-4xl mb-4">🧠</div>
          <h1 className="text-3xl font-bold text-mental-700">Welcome to MentalMitra</h1>
          <p className="text-mental-600">Let's get to know you better</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-mental-700 flex items-center">
              <User className="h-4 w-4 mr-2" />
              Full Name *
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-mental-200 focus:border-mental-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="age" className="text-sm font-medium text-mental-700 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Age *
            </label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="13"
              max="100"
              className="border-mental-200 focus:border-mental-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium text-mental-700 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              City *
            </label>
            <Input
              id="city"
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="border-mental-200 focus:border-mental-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="exercise" className="text-sm font-medium text-mental-700 flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Daily Exercise (minutes) *
            </label>
            <Input
              id="exercise"
              type="number"
              placeholder="e.g., 30"
              value={exerciseMinutes}
              onChange={(e) => setExerciseMinutes(e.target.value)}
              required
              min="0"
              max="300"
              className="border-mental-200 focus:border-mental-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="meditation" className="text-sm font-medium text-mental-700 flex items-center">
              <Brain className="h-4 w-4 mr-2" />
              Daily Meditation (minutes) *
            </label>
            <Input
              id="meditation"
              type="number"
              placeholder="e.g., 10"
              value={meditationMinutes}
              onChange={(e) => setMeditationMinutes(e.target.value)}
              required
              min="0"
              max="120"
              className="border-mental-200 focus:border-mental-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-mental-700 flex items-center">
              <Wine className="h-4 w-4 mr-2" />
              Do you drink alcohol? *
            </label>
            <Select value={drinkingHabit} onValueChange={setDrinkingHabit} required>
              <SelectTrigger className="border-mental-200 focus:border-mental-500">
                <SelectValue placeholder="Select drinking habit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="occasionally">Occasionally (1-2 times/month)</SelectItem>
                <SelectItem value="weekly">Weekly (1-3 times/week)</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-mental-700 flex items-center">
              <Wine className="h-4 w-4 mr-2" />
              Do you smoke? *
            </label>
            <Select value={smokingHabit} onValueChange={setSmokingHabit} required>
              <SelectTrigger className="border-mental-200 focus:border-mental-500">
                <SelectValue placeholder="Select smoking habit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="occasionally">Occasionally</SelectItem>
                <SelectItem value="daily">Daily (less than 5 cigarettes)</SelectItem>
                <SelectItem value="heavy">Heavy (5+ cigarettes daily)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-mental-700 flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              How confident do you feel? *
            </label>
            <Select value={confidenceLevel} onValueChange={setConfidenceLevel} required>
              <SelectTrigger className="border-mental-200 focus:border-mental-500">
                <SelectValue placeholder="Select confidence level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="very-low">Very Low</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="very-high">Very High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-mental-700 flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Are you feeling depressed or demotivated? *
            </label>
            <Select value={depressionLevel} onValueChange={setDepressionLevel} required>
              <SelectTrigger className="border-mental-200 focus:border-mental-500">
                <SelectValue placeholder="Select your current state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-at-all">Not at all</SelectItem>
                <SelectItem value="slightly">Slightly</SelectItem>
                <SelectItem value="moderately">Moderately</SelectItem>
                <SelectItem value="quite-a-bit">Quite a bit</SelectItem>
                <SelectItem value="extremely">Extremely</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="problems" className="text-sm font-medium text-mental-700 flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Tell us about your problems (optional)
            </label>
            <Textarea
              id="problems"
              placeholder="Describe any specific issues you're facing..."
              value={detailedProblems}
              onChange={(e) => setDetailedProblems(e.target.value)}
              className="border-mental-200 focus:border-mental-500 min-h-20"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-mental-500 hover:bg-mental-600 text-white"
          >
            Continue
          </Button>
        </form>
      </Card>
    </div>
  );
}