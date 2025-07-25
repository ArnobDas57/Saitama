"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Bookmark, Wand } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { FaMagic } from "react-icons/fa";

const models = [
  "FLUX.1-dev",
  "FLUX.1-schnell",
  "Stable Diffusion XL",
  "Stable Diffusion 1.5",
  "Openjourney",
];
const types = ["Image", "Art", "Illustration"];
const count = ["1 Image", "2 Images", "3 Images", "4 Images"];
const aspectRatios = ["1:1", "3:4", "16:9"];
const sideBarItems = [{ title: "Generate", icon: FaMagic }];
const examplePrompts = [
  "A magic forest with glowing plants and fairy homes among giant mushrooms",
  "An old steampunk airship floating through golden clouds at sunset",
  "A future Mars colony with glass domes and gardens against red mountains",
  "A dragon sleeping on gold coins in a crystal cave",
  "An underwater kingdom with merpeople and glowing coral buildings",
  "A floating island with waterfalls pouring into clouds below",
  "A witch's cottage in fall with magic herbs in the garden",
  "A robot painting in a sunny studio with art supplies around it",
  "A magical library with floating glowing books and spiral staircases",
  "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
  "A cosmic beach with glowing sand and an aurora in the night sky",
  "A medieval marketplace with colorful tents and street performers",
  "A cyberpunk city with neon signs and flying cars at night",
  "A peaceful bamboo forest with a hidden ancient temple",
  "A giant turtle carrying a village on its back in the ocean",
];

export default function Home() {
  const [selectedModel, setSelectedModel] = useState("FLUX.1");
  const [selectedType, setSelectedType] = useState("Image");
  const [selectedAspect, setSelectedAspect] = useState("1:1");
  const [prompt, setPrompt] = useState("");
  const [guidance, setGuidance] = useState(7.5);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    setTimeout(() => {
      setImage("https://placekitten.com/512/512"); // Replace with actual API response
      setLoading(false);
    }, 2000);
  };

  const handleRandomGenerate = () => {
    const randomPrompt =
      examplePrompts[Math.floor(Math.random() * examplePrompts.length)];

    setPrompt(randomPrompt);
  };

  return (
    <div className="animated-gradient-bg min-h-screen relative flex flex-col items-center px-4 py-10 overflow-hidden">
      {/* Main Card Content */}
      <Card className="w-7/8 shadow-lg border rounded-2xl p-6 z-10">
        <CardHeader>
          <div>
            <h1 className="gradient-text-ani text-7xl font-bold tracking-tight my-6 flex mx-auto justify-center">
              Saitama
            </h1>
            <p className="text-lg font-bold mt-2">AI Image Generator</p>
          </div>
          <CardDescription>
            <p className="text-lg">
              Bring your wildest ideas to life with a single prompt.
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 mt-2">
          {/* Prompt Input */}
          <div className="relative w-full">
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your imagination in detail..."
              rows={3}
              className="w-full pr-12"
            />
            <button
              type="button"
              onClick={handleRandomGenerate}
              className="absolute right-4 bottom-3 p-3 bg-gray-800 rounded-md shadow text-purple-200 hover:text-purple-800 hover:bg-amber-600 hover:cursor-pointer transition"
            >
              <Wand className="h-5 w-5" />
            </button>
          </div>

          {/* Guidance Slider */}
          <div className="mb-15">
            <Label htmlFor="guidance">
              Guidance Scale: {guidance.toFixed(1)}
            </Label>
            <Slider
              id="guidance"
              value={[guidance]} // Pass single-element array for Radix slider
              min={1}
              max={20}
              step={0.1}
              onValueChange={(value) => setGuidance(value[0])}
            />
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <div className="px-5 gap-2 flex flex-row">
              <Select>
                <SelectTrigger className="w-[180px] bg-amber-200">
                  <SelectValue placeholder="Select a Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Models</SelectLabel>
                    {models.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px] bg-amber-200">
                  <SelectValue placeholder="Image count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Image Count</SelectLabel>
                    {types.map((types) => (
                      <SelectItem key={types} value={types}>
                        {types}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px] bg-amber-200">
                  <SelectValue placeholder="Aspect Ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Aspect Ratio</SelectLabel>
                    {aspectRatios.map((ratio) => (
                      <SelectItem key={ratio} value={ratio}>
                        {ratio}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={generateImage}
              disabled={loading || !prompt.trim()}
              className="w-1/3 font-bold h-12 py-3 bg-black text-2xl hover:cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-gray-900"
            >
              {loading ? (
                <p className="gradient-text-ani">{"Generating ..."}</p>
              ) : (
                <div className="flex flex-row gap-3 items-center justify-center">
                  <FaMagic className="mt-1" />
                  <p className="gradient-text-ani">{"Generate Image"}</p>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
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
                src="./globe.svg"
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
