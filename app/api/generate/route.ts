// app/api/generate/route.ts
import { NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const hf_api_key = process.env.HF_API_KEY;

if (!hf_api_key) {
  throw new Error("Missing HF_API_KEY");
}

const client = new InferenceClient(hf_api_key);

export async function POST(req: Request) {
  const {
    prompt,
    model,
    count = 1,
    selectedWidth,
    selectedHeight,
  } = await req.json();

  try {
    const images: string[] = [];

    for (let i = 0; i < count; i++) {
      const response = await client.textToImage({
        model: model || "stabilityai/stable-diffusion-2",
        inputs: prompt,
        parameters: {
          width: selectedWidth,
          height: selectedHeight,
        },
      });

      // Convert to base64
      const blob = new Blob([response as any]);
      const buffer = await blob.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");

      images.push(base64);
    }

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Failed to generate images:", error);
    return NextResponse.json(
      { error: "Image generation failed. Try a different model." },
      { status: 500 }
    );
  }
}
