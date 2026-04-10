import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  title: string;
  href?: string;
  className?: string;
  onClick?: () => void;
  variant?:
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | null
    | undefined;

  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg"
    | null
    | undefined;
};

export const Btn = ({
  href,
  variant,
  title,
  size,
  className,
  onClick,
}: Props) => {
  // Если есть ссылка, то передаю кнопку как Link.
  if (href) {
    return (
      <Button className={className} variant={variant} size={size} asChild>
        <Link href={href}>{title}</Link>
      </Button>
    );
  }

  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};
