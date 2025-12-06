import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType, JSX } from "react";
import { cn } from "@/lib/cn";

// 1. Definição do CVA
const typographyVariants = cva(
  "text-foreground antialiased scroll-m-20 tracking-tight",
  {
    variants: {
      variant: {
        h1: "text-4xl font-extrabold lg:text-5xl",
        h2: "text-3xl font-semibold first:mt-0",
        h3: "text-2xl font-semibold",
        h4: "text-xl font-semibold",
        p: "text-base leading-7 [&:not(:first-child)]:mt-6",
        blockquote: "mt-6 border-l-2 pl-6 italic",
        code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        lead: "text-xl text-muted-foreground",
        small: "text-sm font-medium leading-none",
        span: "text-base",
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
    // @ts-ignore - Verificação segura em runtime
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
