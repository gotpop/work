import "server-only"

import {
  withCardsData,
  withFormBuilderData,
  withHeaderData,
  withNavData,
  withNotFoundPageData,
  withPageData,
  withPopoverData,
} from "@gotpop/storyblok"
import {
  BaselineStatusBlock,
  Card,
  CardImage,
  CardsClientFilter,
  CardsServer,
  FooterDefault,
  FormBuilder,
  FormInputButtonSubmit,
  FormInputText,
  FormInputTextArea,
  HeaderDefault,
  HeroDefault,
  LinkList,
  LogoDefault,
  NavDefault,
  NavItemDefault,
  PageDefault,
  PageNotFound,
  Popover,
  RichTextBlock,
  RichTextCodeBlock,
  SnippetBlock,
} from "@gotpop/system"
import { apiPlugin, getStoryblokApi, storyblokInit } from "@storyblok/react/rsc"
import { submitFormAction } from "@/lib/form-actions"

let isInitialized = false

export function ensureStoryblokInitialised() {
  if (isInitialized) {
    return getStoryblokApi()
  }

  const accessToken = process.env.STORYBLOK_ACCESS_TOKEN

  if (!accessToken) {
    throw new Error("STORYBLOK_ACCESS_TOKEN environment variable is required")
  }

  const components = {
    baseline_status_block: BaselineStatusBlock,
    card: Card,
    cards_server: withCardsData(CardsServer),
    cards_client_filter: withCardsData(CardsClientFilter),
    card_image: CardImage,
    footer_default: FooterDefault,
    form_builder: withFormBuilderData(FormBuilder, submitFormAction),
    form_input_button_submit: FormInputButtonSubmit,
    form_input_text: FormInputText,
    form_input_textarea: FormInputTextArea,
    header_default: withHeaderData(HeaderDefault),
    hero_default: HeroDefault,
    link_list: LinkList,
    logo_default: LogoDefault,
    nav_default: withNavData(NavDefault),
    nav_item_default: NavItemDefault,
    not_found: withNotFoundPageData(PageNotFound),
    page_default: withPageData(PageDefault),
    popover: withPopoverData(Popover),
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
