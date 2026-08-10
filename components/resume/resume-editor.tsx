"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  User,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  FolderGit2,
} from "lucide-react";

interface Education {
  id: string;
  degree: string;
  college: string;
  branch: string;
  passingYear: string;
}

interface Experience {
  id: string;
  company: string;
  designation: string;
  duration: string;
  description: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
}

interface ResumeEditorProps {
  data: any;
  onChange: (data: any) => void;
}

export function ResumeEditor({
  data,
  onChange,
}: ResumeEditorProps) {
  const [education, setEducation] =
    useState<Education[]>(
      data.education ?? []
    );

  const [experience, setExperience] =
    useState<Experience[]>(
      data.experienceList ?? []
    );

  const [projects, setProjects] =
    useState<Project[]>(
      data.projects ?? []
    );

  const [skills, setSkills] =
    useState<string[]>(
      data.skills ?? []
    );

  const [skillInput, setSkillInput] =
    useState("");

  function updateField(
    field: string,
    value: string
  ) {
    onChange({
      ...data,
      [field]: value,
    });
  }

  function addEducation() {
    const item: Education = {
      id: crypto.randomUUID(),
      degree: "",
      college: "",
      branch: "",
      passingYear: "",
    };

    const updated = [
      ...education,
      item,
    ];

    setEducation(updated);

    onChange({
      ...data,
      education: updated,
    });
  }

  function removeEducation(id: string) {
    const updated =
      education.filter(
        (item) => item.id !== id
      );

    setEducation(updated);

    onChange({
      ...data,
      education: updated,
    });
  }

  function updateEducation(
    id: string,
    field: keyof Education,
    value: string
  ) {
    const updated =
      education.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      );

    setEducation(updated);

    onChange({
      ...data,
      education: updated,
    });
  }

  function addExperience() {
    const item: Experience = {
      id: crypto.randomUUID(),
      company: "",
      designation: "",
      duration: "",
      description: "",
    };

    const updated = [
      ...experience,
      item,
    ];

    setExperience(updated);

    onChange({
      ...data,
      experienceList: updated,
    });
  }

  function removeExperience(id: string) {
    const updated =
      experience.filter(
        (item) => item.id !== id
      );

    setExperience(updated);

    onChange({
      ...data,
      experienceList: updated,
    });
  }

  function updateExperience(
    id: string,
    field: keyof Experience,
    value: string
  ) {
    const updated =
      experience.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      );

    setExperience(updated);

    onChange({
      ...data,
      experienceList: updated,
    });
  }

  function addProject() {
    const item: Project = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      technologies: "",
    };

    const updated = [
      ...projects,
      item,
    ];

    setProjects(updated);

    onChange({
      ...data,
      projects: updated,
    });
  }

  function removeProject(id: string) {
    const updated =
      projects.filter(
        (item) => item.id !== id
      );

    setProjects(updated);

    onChange({
      ...data,
      projects: updated,
    });
  }

  function updateProject(
    id: string,
    field: keyof Project,
    value: string
  ) {
    const updated =
      projects.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      );

    setProjects(updated);

    onChange({
      ...data,
      projects: updated,
    });
  }

  function addSkill() {
    const skill =
      skillInput.trim();

    if (!skill) return;

    if (
      skills.some(
        (item) =>
          item.toLowerCase() ===
          skill.toLowerCase()
      )
    ) {
      return;
    }

    const updated = [
      ...skills,
      skill,
    ];

    setSkills(updated);
    setSkillInput("");

    onChange({
      ...data,
      skills: updated,
    });
  }

  function removeSkill(skill: string) {
    const updated =
      skills.filter(
        (item) => item !== skill
      );

    setSkills(updated);

    onChange({
      ...data,
      skills: updated,
    });
  }

  return (
    <div className="space-y-6">

      {/* Personal Information */}

      <Section
        icon={<User className="h-5 w-5" />}
        title="Personal Information"
      >
        <div className="grid gap-4 md:grid-cols-2">

          <Input
            label="First Name"
            value={data.firstName}
            onChange={(value) =>
              updateField(
                "firstName",
                value
              )
            }
          />

          <Input
            label="Last Name"
            value={data.lastName}
            onChange={(value) =>
              updateField(
                "lastName",
                value
              )
            }
          />

          <Input
            label="Email"
            value={data.email}
            onChange={(value) =>
              updateField(
                "email",
                value
              )
            }
          />

          <Input
            label="Phone"
            value={data.phone}
            onChange={(value) =>
              updateField(
                "phone",
                value
              )
            }
          />

          <div className="md:col-span-2">
            <Input
              label="Professional Headline"
              value={data.headline}
              onChange={(value) =>
                updateField(
                  "headline",
                  value
                )
              }
            />
          </div>

        </div>
      </Section>

      {/* Summary */}

      <Section
        icon={<FileIcon />}
        title="Professional Summary"
      >
        <textarea
          rows={5}
          value={data.bio}
          onChange={(e) =>
            updateField(
              "bio",
              e.target.value
            )
          }
          placeholder="Write a short professional summary..."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
        />
      </Section>

      {/* Education */}

      <Section
        icon={
          <GraduationCap className="h-5 w-5" />
        }
        title="Education"
        action={
          <AddButton
            onClick={addEducation}
          />
        }
      >
        <div className="space-y-4">

          {education.length === 0 && (
            <Empty text="No education added yet." />
          )}

          {education.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="mb-4 flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    removeEducation(
                      item.id
                    )
                  }
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">

                <Input
                  label="Degree"
                  value={item.degree}
                  onChange={(value) =>
                    updateEducation(
                      item.id,
                      "degree",
                      value
                    )
                  }
                />

                <Input
                  label="Branch"
                  value={item.branch}
                  onChange={(value) =>
                    updateEducation(
                      item.id,
                      "branch",
                      value
                    )
                  }
                />

                <Input
                  label="College"
                  value={item.college}
                  onChange={(value) =>
                    updateEducation(
                      item.id,
                      "college",
                      value
                    )
                  }
                />

                <Input
                  label="Passing Year"
                  value={item.passingYear}
                  onChange={(value) =>
                    updateEducation(
                      item.id,
                      "passingYear",
                      value
                    )
                  }
                />

              </div>
            </div>
          ))}

        </div>
      </Section>

      {/* Experience */}

      <Section
        icon={
          <Briefcase className="h-5 w-5" />
        }
        title="Experience"
        action={
          <AddButton
            onClick={addExperience}
          />
        }
      >
        <div className="space-y-4">

          {experience.length === 0 && (
            <Empty text="No experience added yet." />
          )}

          {experience.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="mb-4 flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    removeExperience(
                      item.id
                    )
                  }
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">

                <Input
                  label="Company"
                  value={item.company}
                  onChange={(value) =>
                    updateExperience(
                      item.id,
                      "company",
                      value
                    )
                  }
                />

                <Input
                  label="Designation"
                  value={item.designation}
                  onChange={(value) =>
                    updateExperience(
                      item.id,
                      "designation",
                      value
                    )
                  }
                />

                <Input
                  label="Duration"
                  value={item.duration}
                  onChange={(value) =>
                    updateExperience(
                      item.id,
                      "duration",
                      value
                    )
                  }
                />

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-slate-400">
                    Description
                  </label>

                  <textarea
                    rows={4}
                    value={item.description}
                    onChange={(e) =>
                      updateExperience(
                        item.id,
                        "description",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                  />
                </div>

              </div>
            </div>
          ))}

        </div>
      </Section>

      {/* Skills */}

      <Section
        icon={<Code2 className="h-5 w-5" />}
        title="Skills"
      >
        <div className="flex gap-2">

          <input
            value={skillInput}
            onChange={(e) =>
              setSkillInput(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            placeholder="e.g. Python"
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
          />

          <button
            type="button"
            onClick={addSkill}
            className="rounded-xl bg-cyan-500/10 px-4 text-cyan-300 transition hover:bg-cyan-500/20"
          >
            <Plus className="h-5 w-5" />
          </button>

        </div>

        <div className="mt-4 flex flex-wrap gap-2">

          {skills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() =>
                removeSkill(skill)
              }
              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-sm text-cyan-200"
            >
              {skill}
              <span className="ml-2 text-cyan-400">
                ×
              </span>
            </button>
          ))}

        </div>
      </Section>

      {/* Projects */}

      <Section
        icon={
          <FolderGit2 className="h-5 w-5" />
        }
        title="Projects"
        action={
          <AddButton
            onClick={addProject}
          />
        }
      >
        <div className="space-y-4">

          {projects.length === 0 && (
            <Empty text="No projects added yet." />
          )}

          {projects.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="mb-4 flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    removeProject(
                      item.id
                    )
                  }
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">

                <Input
                  label="Project Name"
                  value={item.name}
                  onChange={(value) =>
                    updateProject(
                      item.id,
                      "name",
                      value
                    )
                  }
                />

                <Input
                  label="Technologies"
                  value={item.technologies}
                  onChange={(value) =>
                    updateProject(
                      item.id,
                      "technologies",
                      value
                    )
                  }
                />

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Description
                  </label>

                  <textarea
                    rows={4}
                    value={item.description}
                    onChange={(e) =>
                      updateProject(
                        item.id,
                        "description",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                  />
                </div>

              </div>
            </div>
          ))}

        </div>
      </Section>

      {/* Certifications */}

      <Section
        icon={
          <Award className="h-5 w-5" />
        }
        title="Certifications"
      >
        <p className="text-sm text-slate-400">
          Certification management will be
          connected to your Edurefer certificates
          in the next step.
        </p>
      </Section>

    </div>
  );
}

function Section({
  icon,
  title,
  action,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
            {icon}
          </div>

          <h2 className="font-bold text-white">
            {title}
          </h2>

        </div>

        {action}

      </div>

      {children}

    </section>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-400">
        {label}
      </label>

      <input
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
      />
    </div>
  );
}

function AddButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
    >
      <Plus className="h-4 w-4" />
      Add
    </button>
  );
}

function Empty({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-sm text-slate-500">
      {text}
    </div>
  );
}

function FileIcon() {
  return (
    <FileTextIcon className="h-5 w-5" />
  );
}

function FileTextIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </svg>
  );
}