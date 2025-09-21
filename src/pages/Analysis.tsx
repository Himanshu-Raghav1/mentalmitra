import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, XCircle, TrendingDown, ArrowLeft } from "lucide-react";

interface AnalysisData {
  screenTime: number;
  socialMediaTime: number;
  strangersFollowed: number;
  userName: string;
}

interface AnalysisResult {
  overallScore: number;
  risks: string[];
  recommendations: string[];
  concerns: Array<{
    issue: string;
    severity: "low" | "medium" | "high";
    description: string;
  }>;
}

export default function Analysis() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const screenTime = localStorage.getItem("screenTime");
    const socialMediaTime = localStorage.getItem("socialMediaTime");
    const strangersFollowed = localStorage.getItem("strangersFollowed");

    if (!userName || !screenTime || !socialMediaTime || !strangersFollowed) {
      navigate("/userinfo");
      return;
    }

    const data: AnalysisData = {
      userName,
      screenTime: parseFloat(screenTime),
      socialMediaTime: parseFloat(socialMediaTime),
      strangersFollowed: parseInt(strangersFollowed),
    };

    setAnalysisData(data);
    performAnalysis(data);
  }, [navigate]);

  const performAnalysis = (data: AnalysisData) => {
    setTimeout(() => {
      const result = analyzeDigitalHabits(data);
      setAnalysisResult(result);
      setLoading(false);
    }, 2000);
  };

  const analyzeDigitalHabits = (data: AnalysisData): AnalysisResult => {
    let score = 100;
    const risks: string[] = [];
    const recommendations: string[] = [];
    const concerns: AnalysisResult['concerns'] = [];

    // Screen time analysis
    if (data.screenTime > 8) {
      score -= 25;
      risks.push("Excessive screen time");
      recommendations.push("Try to limit screen time to 6-8 hours per day");
      concerns.push({
        issue: "High Screen Time",
        severity: "high",
        description: `${data.screenTime} hours daily can lead to eye strain, sleep issues, and reduced physical activity.`
      });
    } else if (data.screenTime > 6) {
      score -= 15;
      concerns.push({
        issue: "Moderate Screen Time",
        severity: "medium",
        description: `${data.screenTime} hours is above recommended limits. Consider taking regular breaks.`
      });
    }

    // Social media analysis
    if (data.socialMediaTime > 3) {
      score -= 20;
      risks.push("Heavy social media usage");
      recommendations.push("Limit social media to 1-2 hours per day");
      concerns.push({
        issue: "Excessive Social Media Use",
        severity: "high",
        description: `${data.socialMediaTime} hours on social media can increase anxiety, depression, and FOMO.`
      });
    } else if (data.socialMediaTime > 2) {
      score -= 10;
      concerns.push({
        issue: "High Social Media Use",
        severity: "medium",
        description: `${data.socialMediaTime} hours may affect your real-world relationships and self-esteem.`
      });
    }

    // Strangers followed analysis
    if (data.strangersFollowed > 100) {
      score -= 15;
      risks.push("Following too many unknown people");
      recommendations.push("Unfollow accounts that don't add value to your life");
      concerns.push({
        issue: "Parasocial Relationships",
        severity: "medium",
        description: `Following ${data.strangersFollowed} unknown people can create unrealistic comparisons and social pressure.`
      });
    }

    // Ratio analysis
    const socialMediaRatio = (data.socialMediaTime / data.screenTime) * 100;
    if (socialMediaRatio > 50) {
      score -= 10;
      risks.push("Social media dominates your screen time");
      recommendations.push("Diversify your digital activities with educational or productive content");
    }

    if (risks.length === 0) {
      recommendations.push("Great job! Your digital habits look healthy. Keep maintaining this balance.");
    }

    return {
      overallScore: Math.max(score, 0),
      risks,
      recommendations,
      concerns
    };
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-mental-600";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <XCircle className="h-5 w-5 text-red-500" />;
      case "medium": return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "low": return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mental-50 to-mental-100 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 text-center bg-card/80 backdrop-blur-sm">
          <div className="text-6xl mb-4 animate-spin">🧠</div>
          <h2 className="text-2xl font-bold text-mental-700 mb-2">Analyzing Your Digital Habits</h2>
          <p className="text-mental-600 mb-4">This may take a moment...</p>
          <Progress value={66} className="w-full" />
        </Card>
      </div>
    );
  }

  if (!analysisResult || !analysisData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mental-50 to-mental-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button
          onClick={() => navigate("/welcome")}
          variant="outline"
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="p-8 bg-card/80 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-mental-700 mb-2">
              Mental Health Analysis for {analysisData.userName}
            </h1>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-4xl">
                {analysisResult.overallScore >= 80 ? "😊" : 
                 analysisResult.overallScore >= 60 ? "😐" : "😟"}
              </div>
              <div>
                <div className="text-2xl font-bold text-mental-700">
                  {analysisResult.overallScore}/100
                </div>
                <p className="text-mental-600">Digital Wellness Score</p>
              </div>
            </div>
            <Progress value={analysisResult.overallScore} className="w-full max-w-md mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-mental-700 mb-4 flex items-center">
                <TrendingDown className="mr-2 h-5 w-5" />
                Identified Concerns
              </h3>
              {analysisResult.concerns.length > 0 ? (
                <div className="space-y-4">
                  {analysisResult.concerns.map((concern, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-mental-50">
                      {getSeverityIcon(concern.severity)}
                      <div>
                        <h4 className={`font-semibold ${getSeverityColor(concern.severity)}`}>
                          {concern.issue}
                        </h4>
                        <p className="text-sm text-mental-600 mt-1">
                          {concern.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-mental-600">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <p>No major concerns identified!</p>
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-mental-700 mb-4 flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Recommendations
              </h3>
              <div className="space-y-3">
                {analysisResult.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-green-50">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-sm text-green-700">{recommendation}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button 
              onClick={() => navigate("/symptoms")}
              className="bg-mental-500 hover:bg-mental-600 text-white"
            >
              Continue to Symptoms Assessment
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}