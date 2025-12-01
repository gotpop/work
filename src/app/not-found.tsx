import {
  getAvailableStoriesForError,
  getConfig,
  getInitializedStoryblokApi,
  withNotFoundPageData,
} from "@gotpop/storyblok"
import type { NotFoundStoryblok } from "@gotpop/system"
import { PageNotFound } from "@gotpop/system"
import { ensureStoryblokInitialised } from "@/lib/storyblok-init"

/**  Wrap with the HOC outside of the component registration */
const PageNotFoundWithData = withNotFoundPageData(PageNotFound)

export default async function NotFound() {
  ensureStoryblokInitialised()

  const availableStories = await getAvailableStoriesForError()
  const config = await getConfig()

  const prefix = config?.root_name_space || "portfolio"
  const notFoundPath = `${prefix}/not-found`

  const storyblokApi = getInitializedStoryblokApi()

  try {
    const response = await storyblokApi.get(`cdn/stories/${notFoundPath}`)
    const story = response?.data?.story

    if (story?.content) {
      return (
        <PageNotFoundWithData
          blok={story.content as NotFoundStoryblok}
          config={config}
          availableStories={availableStories}
        />
      )
    }
  } catch (error) {
    console.error(`[NotFound] Failed to fetch story: ${notFoundPath}`, error)
  }

  return null
}
