import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType, JSX } from "react";
import { cn } from "@/lib/cn";

// 1. Definição do CVA
const typographyVariants = cva(
  "text-foreground antialiased scroll-m-20 tracking-tight",
  {
    variants: {
      variant: {
        h1: "",
        h2: "first:mt-0",
        h3: "",
        h4: "",
        p: "leading-7 [&:not(:first-child)]:mt-6",
        blockquote: "mt-6 border-l-2 pl-6",
        code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono",
        lead: "text-muted-foreground",
        small: "leading-none",
        span: "",
      },
      size: {
        default: "",
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "4xl": "text-4xl",
        "5xl": "text-5xl",
      },
      weight: {
        default: "",
        thin: "font-thin",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
      },
      italic: {
        true: "italic",
        false: "",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      },
    },
    defaultVariants: {
      variant: "p",
      size: "default",
      weight: "default",
      italic: false,
      align: "left",
    },
    compoundVariants: [
      {
        variant: "h1",
        size: "default",
        class: "text-4xl lg:text-5xl",
      },
      {
        variant: "h1",
        weight: "default",
        class: "font-extrabold",
      },
      {
        variant: "h2",
        size: "default",
        class: "text-3xl",
      },
      {
        variant: "h2",
        weight: "default",
        class: "font-semibold",
      },
      {
        variant: "h3",
        size: "default",
        class: "text-2xl",
      },
      {
        variant: "h3",
        weight: "default",
        class: "font-semibold",
      },
      {
        variant: "h4",
        size: "default",
        class: "text-xl",
      },
      {
        variant: "h4",
        weight: "default",
        class: "font-semibold",
      },
      {
        variant: "p",
        size: "default",
        class: "text-base",
      },
      {
        variant: "blockquote",
        italic: false,
        class: "italic",
      },
      {
        variant: "code",
        size: "default",
        class: "text-sm",
      },
      {
        variant: "code",
        weight: "default",
        class: "font-semibold",
      },
      {
        variant: "lead",
        size: "default",
        class: "text-xl",
      },
      {
        variant: "small",
        size: "default",
        class: "text-sm",
      },
      {
        variant: "small",
        weight: "default",
        class: "font-medium",
      },
      {
        variant: "span",
        size: "default",
        class: "text-base",
      },
    ],
  },
);

// 2. LISTA DE VARIANTES VÁLIDAS
// Isso é crucial para verificar se o 'as' pode ser usado como 'variant'
const validVariants = [
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "blockquote",
  "code",
  "lead",
  "small",
  "span",
] as const;

// 3. Tipos (Tags Excluídas e Permitidas)
type ExcludeTags =
  | "div"
  | "main"
  | "header"
  | "footer"
  | "section"
  | "article"
  | "aside"
  | "nav"
  | "figure"
  | "details"
  | "summary"
  | "hr"
  | "img"
  | "video"
  | "audio"
  | "iframe"
  | "embed"
  | "object"
  | "source"
  | "track"
  | "map"
  | "area"
  | "picture"
  | "svg"
  | "canvas"
  | "form"
  | "input"
  | "button"
  | "select"
  | "option"
  | "textarea"
  | "label"
  | "fieldset"
  | "legend"
  | "datalist"
  | "output"
  | "progress"
  | "meter"
  | "ul"
  | "ol"
  | "li"
  | "dl"
  | "dt"
  | "dd"
  | "table"
  | "thead"
  | "tbody"
  | "tfoot"
  | "tr"
  | "td"
  | "th"
  | "col"
  | "colgroup"
  | "caption"
  | "a"
  | "dialog"
  | "slot";

type AllowedTags = Exclude<keyof JSX.IntrinsicElements, ExcludeTags>;

type TypographyProps<T extends AllowedTags | ElementType> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as"> &
  VariantProps<typeof typographyVariants>;

// 4. Componente
export default function Typography<
  T extends AllowedTags | ElementType = "span",
>({
  as,
  variant,
  size,
  weight,
  italic,
  align,
  className,
  children,
  ...rest
}: TypographyProps<T>) {
  const Component = as || "span";

  // LÓGICA MÁGICA AQUI:
  // Se 'variant' foi passado, usa ele.
  // Se não foi, verifica se o 'as' é uma string E se está na lista de variantes válidas.
  // Se sim, usa o 'as' como variant.
  // Se não (ex: as="strong"), passa undefined e deixa o CVA usar o default ("p").

  let finalVariant = variant;

  if (!finalVariant && typeof as === "string") {
    // @ts-expect-error - Verificação segura em runtime
    if (validVariants.includes(as)) {
      finalVariant = as as any;
    }
  }

  return (
    <Component
      className={cn(
        typographyVariants({
          variant: finalVariant,
          size,
          weight,
          italic,
          align,
        }),
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
