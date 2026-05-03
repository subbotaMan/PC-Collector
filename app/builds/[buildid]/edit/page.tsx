import { auth } from "@/auth";
import { getBuildToEdit } from "@/lib/getMyBuilds";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ buildId: string }>;
};

export default async function EditBuildPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { buildId } = await params;
  // Получаю build для редактирования по buildId из params.
  const build = await getBuildToEdit(buildId);
  if (!build) return;

  const buildComponents = build.components.map((bc) => ({
    id: bc.component.id,
    name: bc.component.name,
    price: bc.component.price,
    type: bc.component.type,
    socket: bc.component.socket,
  }));
}
