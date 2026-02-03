import SignupForm from "@/app/components/signup/SignupForm";

export default async function SignupPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;

  return <SignupForm uuid={uuid} />;
}
