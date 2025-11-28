import "server-only"

import {
  withCardsData,
  withCardsImageData,
  withHeaderData,
  withNavData,
  withNotFoundPageData,
  withPageData,
} from "@gotpop/storyblok"
import {
  BaselineStatusBlock,
  Card,
  CardImage,
  Cards,
  CardsImage,
  FooterDefault,
  HeaderDefault,
  HeroDefault,
  LinkList,
  LogoDefault,
  NavDefault,
  NavItemDefault,
  PageDefault,
  PageFilter,
  PageNotFound,
  PagePost,
  PagePostImage,
  RichTextBlock,
  RichTextCodeBlock,
  SnippetBlock,
} from "@gotpop/system"
import { apiPlugin, getStoryblokApi, storyblokInit } from "@storyblok/react/rsc"

let isInitialized = false

/** Ensures Storyblok is initialized with all registered components. */
export function ensureStoryblokInitialised() {
  if (isInitialized) {
    return getStoryblokApi()
  }

  const accessToken = process.env.STORYBLOK_ACCESS_TOKEN

  if (!accessToken) {
    throw new Error("STORYBLOK_ACCESS_TOKEN environment variable is required")
  }

  // TODO: Make pages more generic
  // TODO: Consolidate cards logic

  const components = {
    baseline_status_block: BaselineStatusBlock,
    card_image: CardImage,
    card: CardImage,
    // cards_image: withCardsImageData(CardsImage),
    cards_with_image: withCardsImageData(CardsImage),
    footer_default: FooterDefault,
    header_default: withHeaderData(HeaderDefault),
    hero_default: HeroDefault,
    link_list: LinkList,
    logo_default: LogoDefault,
    nav_default: withNavData(NavDefault),
    nav_item_default: NavItemDefault,
    not_found: withNotFoundPageData(PageNotFound),
    page_default: withPageData(PageDefault),
    page_filter: withPageData(PageFilter),
    page_post_image: withPageData(PagePostImage),
    page_post: withPageData(PagePost),
    rich_text_block: RichTextBlock,
    rich_text_code_block: RichTextCodeBlock,
    snippet_block: SnippetBlock,
  }

  storyblokInit({
    accessToken,
    use: [apiPlugin],
    components,
    apiOptions: {
      region: "eu",
    },
  })

  isInitialized = true

  return getStoryblokApi()
}

ensureStoryblokInitialised()
