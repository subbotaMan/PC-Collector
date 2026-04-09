import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  href: string;
  title: string;
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

export const Btn = ({ href, variant, title, size }: Props) => {
  return (
    <Button variant={variant} size={size}>
      <Link href={href}>{title}</Link>
    </Button>
  );
};
