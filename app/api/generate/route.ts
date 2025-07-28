import { NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const hf_api_key = process.env.HF_API_KEY;

if (!hf_api_key) {
  throw new Error("Missing Hugging Face API Key");
}

const client = new InferenceClient(hf_api_key);

export async function POST(req: Request) {
  const { prompt, model } = await req.json();

  const response = await client.textToImage({
    model,
    inputs: prompt,
  });

  return NextResponse.json(response);
}

export async function generateImage(prompt: string, model: string) {
  try {
    const response = await client.textToImage({
      provider: "nebius",
      model: model || "black-forest-labs/FLUX.1-dev",
      inputs: prompt,
      parameters: { num_inference_steps: 5 },
    });

    return response;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
