import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

interface SendPasswordResetEmailParams {
  email: string;
  name?: string | null;
  resetUrl: string;
}

export async function sendPasswordResetEmail({
  email,
  name,
  resetUrl,
}: SendPasswordResetEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is not configured."
    );
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL;

  if (!fromEmail) {
    throw new Error(
      "RESEND_FROM_EMAIL is not configured."
    );
  }

  const { data, error } = await resend.emails.send({
    from: `Edurefer <${fromEmail}>`,
    to: email,
    subject: "Reset your Edurefer password",

    html: `
    <div style="
      font-family: Arial, sans-serif;
      max-width: 560px;
      margin: 0 auto;
      padding: 32px;
    ">
      <h2>Reset your password</h2>

      <p>
        Hi ${escapeHtml(name || "there")},
      </p>

      <p>
        We received a request to reset
        your Edurefer account password.
      </p>

      <p style="margin: 32px 0;">
        <a
          href="${escapeHtml(resetUrl)}"
          style="
            background: #16a34a;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 6px;
            display: inline-block;
          "
        >
          Reset Password
        </a>
      </p>

      <p>
        This link will expire for security reasons.
      </p>

      <p>
        If you did not request a password reset,
        you can ignore this email.
      </p>

      <hr style="
        border: 0;
        border-top: 1px solid #e5e7eb;
        margin: 32px 0;
      " />

      <p style="
        color: #6b7280;
        font-size: 12px;
      ">
        Edurefer Technologies
      </p>
    </div>
  `,
  });

  if (error) {
    console.error("RESEND_EMAIL_ERROR:", error);

    throw new Error(
      `Failed to send password reset email: ${error.message}`
    );
  }

  console.log(
    "PASSWORD_RESET_EMAIL_SENT:",
    data?.id
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}