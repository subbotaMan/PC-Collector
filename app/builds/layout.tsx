"use client";

type Props = {
  children: React.ReactNode;
};

export default function BuildsLayout({ children }: Props) {
  return <div className="container mx-auto max-w-5xl">{children}</div>;
}
