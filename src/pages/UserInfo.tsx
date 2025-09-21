import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, MapPin, Calendar } from "lucide-react";

export default function UserInfo() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name && age && city) {
      // Store user info in localStorage for now
      localStorage.setItem("userName", name);
      localStorage.setItem("userAge", age);
      localStorage.setItem("userCity", city);
      
      toast({
        title: "Information saved",
        description: "Let's continue to your welcome screen",
      });
      navigate("/welcome");
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
          <div className="text-4xl mb-4">🧠</div>
          <h1 className="text-3xl font-bold text-mental-700">Welcome to MentalMitra</h1>
          <p className="text-mental-600">Let's get to know you better</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-mental-700 flex items-center">
              <User className="h-4 w-4 mr-2" />
              Full Name
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
              Age
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
              City
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