import RegisterForm from "@/components/auth/register-form";

interface RegisterPageProps {
  searchParams: Promise<{
    ref?: string;
  }>;
}

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const params = await searchParams;

  return (
    <RegisterForm
      referralCode={params.ref ?? null}
    />
  );
}