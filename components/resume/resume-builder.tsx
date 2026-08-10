"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Eye,
  Sparkles,
} from "lucide-react";

import { saveResume } from "@/actions/resume/save-resume";
import { ResumeEditor } from "./resume-editor";

import {
  PDFDownloadLink,
} from "@react-pdf/renderer";

import { ResumePDF } from "./resume-pdf";

interface ResumeData {
  id: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string | null;

  headline: string;
  bio: string;

  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;

  college: string;
  university: string;
  degree: string;
  branch: string;
  passingYear: string;

  currentCompany: string;
  designation: string;
  experience: string;

  linkedin: string;
  github: string;
  portfolio: string;
  website: string;

  resumeName: string | null;
  resumeUrl: string | null;
}

interface ResumeBuilderProps {
  data: ResumeData;
}

export function ResumeBuilder({
  data,
}: ResumeBuilderProps) {
  const [template, setTemplate] =
    useState("professional");

  const [resumeData, setResumeData] =
    useState<any>({
      ...data,

      education: data.degree ||
        data.college ||
        data.university
        ? [
          {
            id: "profile-education",
            degree: data.degree ?? "",
            college: data.college ?? "",
            branch: data.branch ?? "",
            passingYear:
              data.passingYear ?? "",
          },
        ]
        : [],

      experienceList:
        data.currentCompany ||
          data.designation
          ? [
            {
              id: "profile-experience",
              company:
                data.currentCompany ?? "",
              designation:
                data.designation ?? "",
              duration:
                data.experience
                  ? `${data.experience} years`
                  : "",
              description: "",
            },
          ]
          : [],

      projects: [],

      skills: [],
    });

  const [saving, setSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  async function handleSave() {
    try {
      setSaving(true);
      setSaved(false);

      await saveResume({
        title:
          `${resumeData.firstName} ${resumeData.lastName} Resume`.trim(),

        template,

        resumeData,
      });

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error(
        "SAVE_RESUME_ERROR:",
        error
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-4">

          <Link
            href="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div>

            <div className="flex items-center gap-2">

              <Sparkles className="h-5 w-5 text-cyan-300" />

              <h1 className="text-2xl font-bold text-white">
                Resume Builder
              </h1>

            </div>

            <p className="mt-1 text-sm text-slate-400">
              Create a professional resume from
              your Edurefer profile.
            </p>

          </div>

        </div>

        {/* Actions */}

        <div className="flex flex-wrap gap-3">

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : saved
                ? "Saved ✓"
                : "Save Resume"}
          </button>

          <PDFDownloadLink
            document={
              <ResumePDF
                data={resumeData}
                template={template}
              />
            }
            fileName={`${resumeData.firstName || "Edurefer"}-${resumeData.lastName || "Resume"}.pdf`}
          >
            {({ loading }) => (
              <span
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]"
              >
                <Download className="h-4 w-4" />

                {loading
                  ? "Preparing PDF..."
                  : "Download PDF"}
              </span>
            )}
          </PDFDownloadLink>

        </div>

      </div>

      {/* Main */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_800px]">

        {/* LEFT EDITOR */}

        <div className="min-w-0">

          <ResumeEditor
            data={resumeData}
            onChange={setResumeData}
          />

        </div>

        {/* RIGHT PREVIEW */}

        <div className="min-w-0 rounded-3xl border border-white/10 bg-slate-100 p-4 shadow-2xl">

          <div className="mx-auto min-h-[900px] max-w-[800px] bg-white p-10 text-slate-900 shadow-xl">

            {/* Header */}

            <div className="border-b-2 border-slate-900 pb-6">

              <h1 className="text-4xl font-bold">
                {resumeData.firstName}{" "}
                {resumeData.lastName}
              </h1>

              <p className="mt-2 text-lg text-slate-600">
                {resumeData.headline ||
                  "Professional"}
              </p>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">

                {resumeData.email && (
                  <span>
                    {resumeData.email}
                  </span>
                )}

                {resumeData.phone && (
                  <span>
                    {resumeData.phone}
                  </span>
                )}

                {resumeData.city && (
                  <span>
                    {resumeData.city}
                  </span>
                )}

              </div>

            </div>

            {/* Summary */}

            {resumeData.bio && (
              <section className="mt-7">

                <h2 className="border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest">
                  Professional Summary
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {resumeData.bio}
                </p>

              </section>
            )}

            {/* Education */}

            {resumeData.education?.length >
              0 && (
                <section className="mt-7">

                  <h2 className="border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest">
                    Education
                  </h2>

                  <div className="mt-4 space-y-4">

                    {resumeData.education.map(
                      (item: any) => (
                        <div
                          key={item.id}
                        >
                          <h3 className="font-semibold">
                            {item.degree}
                          </h3>

                          {item.branch && (
                            <p className="text-sm text-slate-600">
                              {item.branch}
                            </p>
                          )}

                          <p className="text-sm text-slate-600">
                            {item.college}
                          </p>

                          {item.passingYear && (
                            <p className="text-xs text-slate-500">
                              {item.passingYear}
                            </p>
                          )}
                        </div>
                      )
                    )}

                  </div>

                </section>
              )}

            {/* Experience */}

            {resumeData.experienceList
              ?.length > 0 && (
                <section className="mt-7">

                  <h2 className="border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest">
                    Experience
                  </h2>

                  <div className="mt-4 space-y-5">

                    {resumeData.experienceList.map(
                      (item: any) => (
                        <div
                          key={item.id}
                        >

                          <h3 className="font-semibold">
                            {item.designation}
                          </h3>

                          <p className="text-sm text-slate-600">
                            {item.company}
                          </p>

                          {item.duration && (
                            <p className="text-xs text-slate-500">
                              {item.duration}
                            </p>
                          )}

                          {item.description && (
                            <p className="mt-2 text-sm leading-6 text-slate-700">
                              {item.description}
                            </p>
                          )}

                        </div>
                      )
                    )}

                  </div>

                </section>
              )}

            {/* Skills */}

            {resumeData.skills?.length >
              0 && (
                <section className="mt-7">

                  <h2 className="border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest">
                    Skills
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-2">

                    {resumeData.skills.map(
                      (skill: string) => (
                        <span
                          key={skill}
                          className="rounded-md bg-slate-100 px-2 py-1 text-sm"
                        >
                          {skill}
                        </span>
                      )
                    )}

                  </div>

                </section>
              )}

            {/* Projects */}

            {resumeData.projects?.length >
              0 && (
                <section className="mt-7">

                  <h2 className="border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest">
                    Projects
                  </h2>

                  <div className="mt-4 space-y-5">

                    {resumeData.projects.map(
                      (item: any) => (
                        <div
                          key={item.id}
                        >

                          <h3 className="font-semibold">
                            {item.name}
                          </h3>

                          {item.technologies && (
                            <p className="text-xs text-slate-500">
                              {item.technologies}
                            </p>
                          )}

                          {item.description && (
                            <p className="mt-2 text-sm leading-6 text-slate-700">
                              {item.description}
                            </p>
                          )}

                        </div>
                      )
                    )}

                  </div>

                </section>
              )}

            {/* Links */}

            {(resumeData.linkedin ||
              resumeData.github ||
              resumeData.portfolio ||
              resumeData.website) && (
                <section className="mt-7">

                  <h2 className="border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest">
                    Professional Links
                  </h2>

                  <div className="mt-3 space-y-1 text-sm text-slate-600">

                    {resumeData.linkedin && (
                      <p>
                        LinkedIn:{" "}
                        {resumeData.linkedin}
                      </p>
                    )}

                    {resumeData.github && (
                      <p>
                        GitHub:{" "}
                        {resumeData.github}
                      </p>
                    )}

                    {resumeData.portfolio && (
                      <p>
                        Portfolio:{" "}
                        {resumeData.portfolio}
                      </p>
                    )}

                    {resumeData.website && (
                      <p>
                        Website:{" "}
                        {resumeData.website}
                      </p>
                    )}

                  </div>

                </section>
              )}

          </div>

        </div>

      </div>

    </div>
  );
}