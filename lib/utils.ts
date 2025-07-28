import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const hg_api_key = process.env.HF_API_KEY;

if (!hg_api_key) {
  throw new Error("Missing Hugging Face API Key");
}

export const hfClient = new InferenceClient(hg_api_key);

export async function generateImage(prompt: string) {
  try {
    const response = await hfClient.textToImage({
      model: "stabilityai/stable-diffusion-2",
      inputs: prompt,
    });

    return response; // This returns a Blob
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
