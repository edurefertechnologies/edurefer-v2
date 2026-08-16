import VerifyEmailClient from "@/components/auth/verify-email-client";

interface Props {
    searchParams: Promise<{
        email?: string;
    }>;
}

export default async function VerifyEmailPage({
    searchParams,
}: Props) {
    const params = await searchParams;

    return (
        <VerifyEmailClient
            email={params.email ?? ""}
        />
    );
}