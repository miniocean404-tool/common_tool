import React, { type PropsWithChildren } from "react"

import {
  codeToHtml,
  type BundledLanguage,
  type BundledTheme,
  type SpecialLanguage,
  type StringLiteralUnion,
  type ThemeRegistrationAny,
} from "shiki"

interface CodeProps {
  className?: string
  code: string
  theme?: ThemeRegistrationAny | StringLiteralUnion<BundledTheme>
  lang?: StringLiteralUnion<BundledLanguage | SpecialLanguage>
}

export default async function Code(props: PropsWithChildren<CodeProps>) {
  const { code, lang = "ts", theme = "one-dark-pro" } = props

  const __html = await codeToHtml(code, {
    lang,
    theme,
    transformers: [
      // transformerCopyButton({
      //   visibility: 'always',
      //   feedbackDuration: 3_000,
      // }),
    ],
  })

  return <code className={props.className} dangerouslySetInnerHTML={{ __html }} />
}
