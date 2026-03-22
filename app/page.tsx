import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography-h1";
import { TypographyH3 } from "@/components/ui/typography-h3";

export default function Home() {
  return (
    <div>
      <main>
        <TypographyH1>Hello World</TypographyH1>
        <TypographyH3>Hello World H3</TypographyH3>
        <div>
          <Button variant="default">Button</Button>
        </div>
      </main>
    </div>
  );
}
