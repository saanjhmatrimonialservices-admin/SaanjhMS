import SuccessContent from "@/app/components/success/SuccessContent";

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;

  return <SuccessContent uuid={uuid} />;
}
