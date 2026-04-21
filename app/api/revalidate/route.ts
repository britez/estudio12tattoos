import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST() {
  revalidateTag("prismic", "max");
  
  // Revalidar rutas de seminarios para reflejar cambios de precio inmediatamente
  revalidatePath("/[lang]/seminarios", "page");
  revalidatePath("/[lang]/seminarios/[slug]", "page");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
