"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import TextType from "@/components/ui/TextType";
import { Wand } from "lucide-react";

interface aspectRatioType {
  label: string;
  width: number;
  height: number;
}

const modelOptions = [
  { label: "Stable Diffusion v2", value: "stabilityai/stable-diffusion-2" },
  { label: "Stable Diffusion v1.5", value: "runwayml/stable-diffusion-v1-5" },
  { label: "OpenJourney", value: "prompthero/openjourney" },
  {
    label: "Dreamlike Diffusion",
    value: "dreamlike-art/dreamlike-diffusion-1.0",
  },
];

const countOptions: number[] = [1, 2, 3, 4];
const aspectRatios: aspectRatioType[] = [
  { label: "Square (1:1)", width: 512, height: 512 },
  { label: "Portrait (3:4)", width: 768, height: 1024 },
  { label: "Landscape (4:3)", width: 1024, height: 768 },
];

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
  const [selectedModel, setSelectedModel] = useState(modelOptions[0].value);
  const [selectedCount, setSelectedCount] = useState<number>(1);
  const [selectedAspect, setSelectedAspect] = useState(aspectRatios[0]);
  const [prompt, setPrompt] = useState("");
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateAnImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const result = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
          model: selectedModel,
          count: selectedCount,
          width: selectedAspect.width,
          height: selectedAspect.height,
        }),
      });

      const data = await result.json();
      console.log("IMAGE DATA:", data);

      if (data.images && Array.isArray(data.images)) {
        const urls = data.images.map(
          (base64: string) => `data:image/png;base64,${base64}`
        );
        setImageURLs(urls);
      } else {
        throw new Error("No image data returned.");
      }
    } catch (error) {
      console.error("Image generation failed:", error);
      setImageURLs([]);
    } finally {
      setLoading(false);
    }
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
          <h1 className="gradient-text-ani text-7xl font-bold tracking-tight my-6 flex mx-auto justify-center">
            Saitama
          </h1>
          <p className="text-2xl font-bold mt-2 flex justify-center">
            AI image generation, simplified
          </p>
          <CardDescription className="mt-5">
            <TextType
              text={[
                "Say it and Saitama will draw it.",
                "Imagine it. Prompt it. See it.",
                "Bring your wildest ideas to life with a single prompt.",
                "Natural language. Unnatural results.",
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              textColors={["#00CBE6", "#9333ea"]}
              className="text-2xl font-bold"
            />
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 mt-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              generateAnImage();
            }}
            className="space-y-6"
          >
            {/* Prompt Input */}
            <div className="relative w-full">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your imagination in detail..."
                rows={3}
                className="w-full pr-12 h-40 mb-10 text-xl leading-relaxed tracking-wide"
              />
              <button
                type="button"
                onClick={handleRandomGenerate}
                className="absolute right-4 bottom-3 p-3 bg-gray-800 rounded-md shadow text-purple-200 hover:text-purple-800 hover:bg-amber-600 hover:cursor-pointer transition"
              >
                <Wand className="h-5 w-5" />
              </button>
            </div>

            {/* Dropdowns */}
            <div className="flex justify-center">
              <div className="px-5 gap-2 flex flex-row">
                <label
                  htmlFor="model-select"
                  className="block mb-1 text-sm font-medium"
                >
                  Choose a Model:
                </label>
                <Select
                  value={selectedModel}
                  onValueChange={(val) => setSelectedModel(val)}
                >
                  <SelectTrigger className="w-[180px] bg-amber-200">
                    <SelectValue placeholder="Select a Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Models</SelectLabel>
                      {modelOptions.map((model) => (
                        <SelectItem key={model.value} value={model.value}>
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select
                  value={selectedCount.toString()}
                  onValueChange={(val) => setSelectedCount(parseInt(val))}
                >
                  <SelectTrigger className="w-[180px] bg-amber-200">
                    <SelectValue placeholder="Image count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Image Count</SelectLabel>
                      {countOptions.map((item) => (
                        <SelectItem key={item} value={item.toString()}>
                          {item} Image{item > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select
                  value={selectedAspect.label}
                  onValueChange={(val) => {
                    const ratio = aspectRatios.find((r) => r.label === val);
                    if (ratio) setSelectedAspect(ratio);
                  }}
                >
                  <SelectTrigger className="w-[180px] bg-amber-200">
                    <SelectValue placeholder="Aspect Ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Aspect Ratio</SelectLabel>
                      {aspectRatios.map((ratio) => (
                        <SelectItem key={ratio.label} value={ratio.label}>
                          {ratio.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
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
          </form>
        </CardContent>
      </Card>

      {/* Output Section */}
      <div className="w-full max-w-4xl z-10 mt-8">
        <Separator className="my-6" />
        <Card className="w-full overflow-hidden rounded-xl border p-4 shadow">
          <CardHeader>
            <CardTitle>Output</CardTitle>
            <CardDescription>Preview of your generated images</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
            {loading ? (
              <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-center text-gray-600 text-sm">
                  🎨 Images coming right up… hang tight! This may take a few
                  moments.
                </p>
                {Array.from({ length: selectedCount || 1 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="w-full h-[256px] rounded-md mx-auto"
                  />
                ))}
              </div>
            ) : imageURLs.length > 0 ? (
              imageURLs.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt={`Generated Image ${index + 1}`}
                  width={512}
                  height={512}
                  className="rounded-md shadow object-contain w-full h-auto"
                  unoptimized
                />
              ))
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
