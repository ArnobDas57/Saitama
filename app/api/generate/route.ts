// app/api/generate/route.ts
import { NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const hf_api_key = process.env.HF_API_KEY;

if (!hf_api_key) {
  throw new Error("Missing HF_API_KEY");
}

const client = new InferenceClient(hf_api_key);

export async function POST(req: Request) {
  const { prompt, model } = await req.json();

  try {
    const base64Image = await client.textToImage({
      model,
      inputs: prompt,
    });

    return NextResponse.json({ image: base64Image });
  } catch (error) {
    console.error("Failed to generate image:", error);
    return NextResponse.json(
      { error: "Image generation failed. Try a different model." },
      { status: 500 }
    );
  }
}
