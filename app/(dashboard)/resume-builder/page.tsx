import { getResumeData } from "@/actions/resume/get-resume-data";
import { ResumeBuilder } from "@/components/resume/resume-builder";

export default async function ResumeBuilderPage() {
  const data = await getResumeData();

  return (
    <div className="space-y-6">
      <ResumeBuilder data={data} />
    </div>
  );
}