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
    const imageBlob = await client.textToImage({
      model: model || "stabilityai/stable-diffusion-2",
      inputs: prompt,
    });

    if (typeof imageBlob === "string") {
      console.error("Hugging Face API error:", imageBlob);
      return NextResponse.json(
        { error: imageBlob || "Image generation failed." },
        { status: 500 }
      );
    }

    const buffer = await imageBlob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return new Response(JSON.stringify({ image: base64 }), { status: 200 });
  } catch (error) {
    console.error("Failed to generate image:", error);
    return NextResponse.json(
      { error: "Unexpected server error during image generation." },
      { status: 500 }
    );
  }
}
