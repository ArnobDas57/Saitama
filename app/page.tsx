"use client";

import { useState } from "react";
import Image from "next/image";
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
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

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
    <div className="min-h-screen relative bg-background text-foreground flex flex-col items-center px-4 py-10 overflow-hidden">
      {/* FlickeringGrid as full background */}
      <div className="absolute inset-0 -z-20">
        <FlickeringGrid />
      </div>

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm -z-10" />

      {/* Main content card */}
      <Card className="w-full max-w-2xl shadow-lg border rounded-2xl p-6 z-10">
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
          {/* Prompt input */}
          <Label htmlFor="prompt">Enter prompt</Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your image..."
            rows={3}
            className="w-full"
          />

          {/* Guidance slider */}
          <div>
            <Label htmlFor="guidance">
              Guidance Scale: {guidance.toFixed(1)}
            </Label>
            <Slider
              id="guidance"
              value={[guidance]} // Pass as single-element array
              min={1}
              max={20}
              step={0.1}
              onValueChange={(value) => {
                setGuidance(value[0]); // value is always an array, so pick first element
              }}
            />
          </div>

          {/* Generate button */}
          <Button onClick={generateImage} disabled={loading || !prompt.trim()}>
            {loading ? "Generating..." : "Generate Image"}
          </Button>
        </CardContent>
      </Card>

      {/* Output card */}
      <div className="w-full max-w-2xl z-10 mt-8">
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
              <Image
                src={image}
                alt="Generated"
                width={512}
                height={512}
                className="rounded-md shadow"
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
