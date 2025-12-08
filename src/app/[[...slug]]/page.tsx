import {
  generateAllStaticParams,
  getConfig,
  getInitializedStoryblokApi,
  handleStoryblokPathRedirect,
  normalizeStoryblokPath,
} from "@gotpop/storyblok"
import { StoryblokServerComponent } from "@storyblok/react/rsc"
import { notFound } from "next/navigation"
import { ensureStoryblokInitialised } from "@/lib/storyblok-init"

export const dynamicParams = true

export async function generateStaticParams() {
  ensureStoryblokInitialised()

  return await generateAllStaticParams()
}

interface PageParams {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params
  const config = await getConfig()

  handleStoryblokPathRedirect(slug, config)

  if (!config) {
    throw new Error("Config not found")
  }

  const fullPath = normalizeStoryblokPath(slug, config)

  const storyblokApi = getInitializedStoryblokApi()

  try {
    const response = await storyblokApi.get(`cdn/stories/${fullPath}`)
    const story = response?.data?.story

    if (!story) {
      notFound()
    }

    return <StoryblokServerComponent blok={story.content} story={story} />
  } catch (error) {
    console.error(`[Page] Failed to fetch story: ${fullPath}`, error)
    notFound()
  }
}
