import { auth } from "@/auth";
import { getBuildToEdit } from "@/lib/getMyBuilds";
import { redirect } from "next/navigation";
import { EditBuildForm } from "./components/edit-build-form";

type Props = {
  params: Promise<{ buildId: string }>;
};

export default async function EditBuildPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { buildId } = await params;
  // Получаю build из DB для редактирования по buildId из params.
  const build = await getBuildToEdit(buildId);
  if (!build) return;

  const buildComponents = build.components.map((bc) => ({
    id: bc.component.id,
    name: bc.component.name,
    price: bc.component.price,
    type: bc.component.type,
    socket: bc.component.socket,
  }));

  return (
    <div className="py-6">
      <EditBuildForm buildComponents={buildComponents} buildName={build.name} />
    </div>
  );
}
