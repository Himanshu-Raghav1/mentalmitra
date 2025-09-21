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
  exerciseMinutes: number;
  meditationMinutes: number;
  drinkingHabit: string;
  smokingHabit: string;
  confidenceLevel: string;
  depressionLevel: string;
  detailedProblems: string;
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
    const exerciseMinutes = localStorage.getItem("exerciseMinutes");
    const meditationMinutes = localStorage.getItem("meditationMinutes");
    const drinkingHabit = localStorage.getItem("drinkingHabit");
    const smokingHabit = localStorage.getItem("smokingHabit");
    const confidenceLevel = localStorage.getItem("confidenceLevel");
    const depressionLevel = localStorage.getItem("depressionLevel");
    const detailedProblems = localStorage.getItem("detailedProblems");

    if (!userName || !screenTime || !socialMediaTime || !strangersFollowed || 
        !exerciseMinutes || !meditationMinutes || !drinkingHabit || 
        !smokingHabit || !confidenceLevel || !depressionLevel) {
      navigate("/userinfo");
      return;
    }

    const data: AnalysisData = {
      userName,
      screenTime: parseFloat(screenTime),
      socialMediaTime: parseFloat(socialMediaTime),
      strangersFollowed: parseInt(strangersFollowed),
      exerciseMinutes: parseFloat(exerciseMinutes),
      meditationMinutes: parseFloat(meditationMinutes),
      drinkingHabit,
      smokingHabit,
      confidenceLevel,
      depressionLevel,
      detailedProblems: detailedProblems || "",
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
      recommendations.push("Set strict screen time limits using phone settings. Take a 20-20-20 break: every 20 minutes, look at something 20 feet away for 20 seconds. Create designated 'phone-free' zones in your home.");
      concerns.push({
        issue: "High Screen Time",
        severity: "high",
        description: `${data.screenTime} hours daily can lead to eye strain, sleep issues, and reduced physical activity. This puts you at risk for digital eye syndrome and disrupted circadian rhythms.`
      });
    } else if (data.screenTime > 6) {
      score -= 15;
      recommendations.push("Try using the Pomodoro Technique: 25 minutes of screen work followed by 5-minute breaks.");
      concerns.push({
        issue: "Moderate Screen Time",
        severity: "medium",
        description: `${data.screenTime} hours is above recommended limits. Consider taking regular breaks to prevent eye strain and maintain better posture.`
      });
    }

    // Social media analysis
    if (data.socialMediaTime > 3) {
      score -= 20;
      risks.push("Heavy social media usage");
      recommendations.push("Implement a 'digital detox' day once a week. Use app timers to limit social media to 1-2 hours daily. Replace scrolling time with real-world activities like reading, walking, or calling friends.");
      concerns.push({
        issue: "Excessive Social Media Use",
        severity: "high",
        description: `${data.socialMediaTime} hours on social media can increase anxiety, depression, and FOMO. Studies show this level of usage correlates with decreased life satisfaction and increased comparison behaviors.`
      });
    } else if (data.socialMediaTime > 2) {
      score -= 10;
      recommendations.push("Be mindful of your social media consumption. Unfollow accounts that make you feel negative about yourself. Follow accounts that inspire and educate you instead.");
      concerns.push({
        issue: "High Social Media Use",
        severity: "medium",
        description: `${data.socialMediaTime} hours may affect your real-world relationships and self-esteem. Consider curating your feed to include more positive, educational content.`
      });
    }

    // Exercise analysis
    if (data.exerciseMinutes < 30) {
      score -= 20;
      risks.push("Insufficient physical activity");
      recommendations.push("Start with 10-minute walks daily and gradually increase. Try bodyweight exercises like push-ups, squats, and planks. Consider joining a local sports club or gym. Even dancing to your favorite music counts as exercise!");
      concerns.push({
        issue: "Low Physical Activity",
        severity: "high",
        description: `Only ${data.exerciseMinutes} minutes of daily exercise is below WHO recommendations. This can lead to increased risk of depression, anxiety, cardiovascular issues, and poor sleep quality.`
      });
    } else if (data.exerciseMinutes < 60) {
      score -= 10;
      recommendations.push("You're doing well! Try adding strength training 2-3 times per week and consider increasing to 45-60 minutes daily for optimal mental health benefits.");
      concerns.push({
        issue: "Moderate Exercise Level",
        severity: "medium",
        description: `${data.exerciseMinutes} minutes is good but could be improved. Adding more movement can significantly boost your mood and energy levels.`
      });
    } else {
      recommendations.push("Excellent exercise routine! Make sure to include rest days and vary your activities to prevent burnout. Your physical activity is supporting your mental health beautifully.");
    }

    // Meditation analysis
    if (data.meditationMinutes === 0) {
      score -= 15;
      risks.push("No mindfulness practice");
      recommendations.push("Start with just 5 minutes daily using apps like Headspace or Calm. Try simple breathing exercises: breathe in for 4 counts, hold for 4, exhale for 6. Practice gratitude journaling for 2-3 minutes before bed.");
      concerns.push({
        issue: "No Meditation Practice",
        severity: "medium",
        description: "Lack of mindfulness practice can lead to increased stress, poor emotional regulation, and difficulty managing anxiety. Even 5 minutes daily can make a significant difference."
      });
    } else if (data.meditationMinutes < 10) {
      recommendations.push("Great start! Try to gradually increase to 10-15 minutes daily. Experiment with different types: guided meditation, body scans, or loving-kindness meditation.");
    } else {
      recommendations.push("Wonderful meditation practice! This is excellent for your mental health. Consider exploring advanced techniques like mindful walking or meditation retreats.");
    }

    // Substance use analysis
    if (data.drinkingHabit === "daily") {
      score -= 25;
      risks.push("Daily alcohol consumption");
      recommendations.push("Consider speaking with a healthcare provider about your drinking habits. Try alcohol-free days, replace alcoholic drinks with mocktails, and find alternative stress-relief methods like exercise or meditation.");
      concerns.push({
        issue: "Daily Alcohol Use",
        severity: "high",
        description: "Daily alcohol consumption can significantly impact mental health, leading to increased anxiety, depression, disrupted sleep, and potential dependency issues."
      });
    } else if (data.drinkingHabit === "weekly") {
      score -= 10;
      recommendations.push("Monitor your drinking patterns and ensure you have alcohol-free days. Be mindful of using alcohol as a coping mechanism for stress or emotions.");
    }

    if (data.smokingHabit === "heavy") {
      score -= 30;
      risks.push("Heavy smoking habit");
      recommendations.push("Strongly consider quitting smoking with professional help. Contact a smoking cessation program, consider nicotine replacement therapy, and identify your smoking triggers. Your mental and physical health will improve dramatically.");
      concerns.push({
        issue: "Heavy Smoking",
        severity: "high",
        description: "Heavy smoking severely impacts mental health by increasing anxiety, reducing oxygen to the brain, and creating dependency cycles that worsen stress and mood."
      });
    } else if (data.smokingHabit === "daily") {
      score -= 20;
      risks.push("Daily smoking habit");
      recommendations.push("Consider a gradual quit plan. Replace smoking breaks with breathing exercises or short walks. Seek support from friends, family, or quitlines.");
      concerns.push({
        issue: "Daily Smoking",
        severity: "high",
        description: "Daily smoking affects mental clarity, increases anxiety levels, and creates stress cycles that negatively impact overall wellbeing."
      });
    } else if (data.smokingHabit === "occasionally") {
      score -= 5;
      recommendations.push("Even occasional smoking can impact your health. Try to eliminate these instances by finding alternative stress-relief methods.");
    }

    // Confidence level analysis
    if (data.confidenceLevel === "very-low" || data.confidenceLevel === "low") {
      score -= 20;
      risks.push("Low self-confidence");
      recommendations.push("Practice positive self-talk and challenge negative thoughts. Set small, achievable goals and celebrate your wins. Consider therapy or counseling. Join social groups or classes to build connections. Write down 3 things you did well each day.");
      concerns.push({
        issue: "Low Self-Confidence",
        severity: "high",
        description: "Low confidence can create cycles of self-doubt, social withdrawal, and missed opportunities, further impacting mental health and life satisfaction."
      });
    } else if (data.confidenceLevel === "moderate") {
      recommendations.push("Build confidence through skill development and positive affirmations. Step outside your comfort zone regularly with small challenges.");
    } else {
      recommendations.push("Great confidence level! Use this strength to help others and take on new challenges that align with your values.");
    }

    // Depression analysis
    if (data.depressionLevel === "extremely" || data.depressionLevel === "quite-a-bit") {
      score -= 30;
      risks.push("Significant depression symptoms");
      recommendations.push("Please consider speaking with a mental health professional immediately. Depression is treatable. Maintain a daily routine, get sunlight exposure, connect with supportive people, and avoid isolating yourself. Consider joining support groups or calling a mental health helpline.");
      concerns.push({
        issue: "Severe Depression Symptoms",
        severity: "high",
        description: "Significant depression symptoms require professional attention. This level of depression can severely impact daily functioning, relationships, and overall quality of life."
      });
    } else if (data.depressionLevel === "moderately") {
      score -= 20;
      risks.push("Moderate depression symptoms");
      recommendations.push("Consider counseling or therapy. Practice self-care routines, maintain social connections, and engage in activities you once enjoyed. Create a daily structure and prioritize sleep hygiene.");
      concerns.push({
        issue: "Moderate Depression",
        severity: "medium",
        description: "Moderate depression symptoms can worsen without proper support. Early intervention with professional help and lifestyle changes can prevent escalation."
      });
    } else if (data.depressionLevel === "slightly") {
      recommendations.push("Monitor your mood and maintain healthy coping strategies. Increase social activities, outdoor time, and physical exercise to support your mental health.");
    }

    // Strangers followed analysis
    if (data.strangersFollowed > 100) {
      score -= 15;
      risks.push("Following too many unknown people");
      recommendations.push("Unfollow accounts that don't add value to your life or make you feel inadequate. Focus on following people who inspire, educate, or genuinely connect with you. Quality over quantity in your social feeds.");
      concerns.push({
        issue: "Parasocial Relationships",
        severity: "medium",
        description: `Following ${data.strangersFollowed} unknown people can create unrealistic comparisons, FOMO, and decreased satisfaction with your own life.`
      });
    }

    // Additional detailed problems analysis
    if (data.detailedProblems) {
      recommendations.push("Thank you for sharing your specific concerns. Consider journaling about these issues to better understand patterns and triggers. Professional counseling can provide personalized strategies for your unique situation.");
    }

    // Holistic recommendations
    recommendations.push("Create a daily wellness routine: morning sunlight exposure, regular meals, consistent sleep schedule (7-9 hours), and evening wind-down time without screens.");
    recommendations.push("Build a support network: regularly connect with family and friends, consider joining community groups or clubs, and don't hesitate to reach out when you need help.");
    recommendations.push("Practice stress management: deep breathing exercises, progressive muscle relaxation, time in nature, creative hobbies, or listening to calming music.");

    if (score < 50) {
      recommendations.push("Your results indicate several areas that need attention. Please consider speaking with a healthcare provider or mental health professional for personalized guidance and support.");
    } else if (score < 70) {
      recommendations.push("You're on the right track but there's room for improvement. Focus on the areas highlighted above and make gradual, sustainable changes.");
    } else {
      recommendations.push("You're doing well overall! Continue maintaining these healthy habits and use them as a foundation to help others in your community.");
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