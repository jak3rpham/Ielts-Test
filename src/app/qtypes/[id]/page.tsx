import { notFound } from "next/navigation";
import { QTYPES } from "@/data/qtypes";
import QTypeView from "@/components/QTypeView";

export function generateStaticParams() {
  return QTYPES.map((q) => ({ id: q.id }));
}

export default async function QTypeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const qt = QTYPES.find((q) => q.id === id);
  if (!qt) notFound();
  return <QTypeView qt={qt} />;
}
