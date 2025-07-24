"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import FaultyTerminal from "@/components/ui/FaultyTerminal";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [guidance, setGuidance] = useState(7.5);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    // Simulate image generation
    setTimeout(() => {
      setImage("https://placekitten.com/512/512"); // Replace with actual API response
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-10 flex flex-col items-center gap-10">
      <Card className="w-full max-w-2xl shadow-lg border rounded-2xl p-6">
        <CardHeader>
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-primary">
              Saitama
            </h1>
            <p className="text-muted-foreground text-lg mt-1">
              AI Image Generator
            </p>
          </div>
          <CardDescription>
            Generate stunning images from your imagination!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prompt">Your Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="A futuristic cityscape with flying cars..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Creativity / Guidance</Label>
            <Slider
              defaultValue={[guidance]}
              max={20}
              step={0.5}
              onValueChange={(val) => setGuidance(val[0])}
            />
            <p className="text-sm text-muted-foreground">
              Current value: {guidance}
            </p>
          </div>

          <div className="flex justify-end">
            <Button onClick={generateImage} disabled={loading}>
              {loading ? "Generating..." : "Generate Image"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="w-full max-w-2xl">
        <Separator className="my-6" />
        <Card className="w-full overflow-hidden rounded-xl border p-4 shadow">
          <CardHeader>
            <CardTitle>Output</CardTitle>
            <CardDescription>Preview of your generated image</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center min-h-[300px]">
            {loading ? (
              <Skeleton className="w-[512px] h-[512px] rounded-md" />
            ) : image ? (
              <img
                src={image}
                alt="Generated"
                className="w-full max-w-md rounded-md shadow"
              />
            ) : (
              <p className="text-muted-foreground">No image generated yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
