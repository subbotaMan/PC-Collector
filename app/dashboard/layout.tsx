type Props = {
  children: React.ReactNode;
};

// Next автоматически применяет эту обёртку к page.tsx,
export default function DashboardLayout({ children }: Props) {
  return <div className="container mx-auto max-w-5xl mt-8">{children}</div>;
}
