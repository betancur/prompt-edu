import OpenAI from 'openai';
import { supabase } from './supabaseClient';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Nota: En producción, deberías hacer las llamadas desde el backend
});

export async function generateImage(prompt) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural"
    });

    const imageUrl = response.data[0].url;

    // Guardar el link en Supabase
    const { error } = await supabase
      .from('generated_images')
      .insert([
        { 
          url: imageUrl,
          prompt: prompt
        }
      ]);

    if (error) {
      console.error('Error saving image link:', error);
      // No lanzamos el error aquí para que no interrumpa el flujo principal
      // Solo lo registramos para debugging
    }

    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

export async function getGeneratedImages() {
  try {
    const { data, error } = await supabase
      .from('generated_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}