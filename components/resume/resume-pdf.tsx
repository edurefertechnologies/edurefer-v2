"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

interface ResumePDFProps {
  data: any;
  template: string;
}

const professional = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1f2937",
    backgroundColor: "#ffffff",
  },

  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#111827",
    paddingBottom: 14,
    marginBottom: 18,
  },

  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#111827",
  },

  headline: {
    fontSize: 12,
    marginTop: 5,
    color: "#4b5563",
  },

  contact: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
    color: "#6b7280",
    fontSize: 9,
  },

  section: {
    marginTop: 16,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#111827",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    paddingBottom: 5,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  text: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#374151",
  },

  item: {
    marginBottom: 10,
  },

  itemTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
  },

  itemSubTitle: {
    fontSize: 9,
    color: "#4b5563",
    marginTop: 2,
  },

  itemMeta: {
    fontSize: 8,
    color: "#6b7280",
    marginTop: 2,
  },

  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },

  skill: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderRadius: 3,
    fontSize: 9,
  },

  link: {
    fontSize: 9,
    color: "#2563eb",
    marginBottom: 3,
  },
});

const modern = StyleSheet.create({
  page: {
    padding: 0,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1e293b",
    backgroundColor: "#ffffff",
  },

  top: {
    backgroundColor: "#0f172a",
    padding: 30,
    paddingBottom: 24,
  },

  name: {
    color: "#ffffff",
    fontSize: 27,
    fontWeight: "bold",
  },

  headline: {
    color: "#67e8f9",
    fontSize: 12,
    marginTop: 6,
  },

  contact: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },

  contactText: {
    color: "#cbd5e1",
    fontSize: 9,
  },

  body: {
    padding: 30,
  },

  section: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#0891b2",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 7,
  },

  text: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#475569",
  },

  item: {
    marginBottom: 11,
  },

  itemTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0f172a",
  },

  itemSubTitle: {
    fontSize: 9,
    color: "#475569",
    marginTop: 2,
  },

  itemMeta: {
    fontSize: 8,
    color: "#64748b",
    marginTop: 2,
  },

  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },

  skill: {
    backgroundColor: "#ecfeff",
    color: "#0e7490",
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderRadius: 3,
    fontSize: 9,
  },

  link: {
    fontSize: 9,
    color: "#0891b2",
    marginBottom: 3,
  },
});

export function ResumePDF({
  data,
  template,
}: ResumePDFProps) {
  const isModern = template === "modern";

  return (
    <Document
      title={`${data.firstName ?? ""} ${
        data.lastName ?? ""
      } Resume`}
      author="Edurefer Technologies"
      subject="Professional Resume"
    >
      <Page
        size="A4"
        style={
          isModern
            ? modern.page
            : professional.page
        }
      >
        {isModern ? (
          <ModernResume data={data} />
        ) : (
          <ProfessionalResume data={data} />
        )}
      </Page>
    </Document>
  );
}

/* =====================================================
   PROFESSIONAL TEMPLATE
===================================================== */

function ProfessionalResume({
  data,
}: {
  data: any;
}) {
  return (
    <>
      <View style={professional.header}>
        <Text style={professional.name}>
          {data.firstName} {data.lastName}
        </Text>

        {data.headline && (
          <Text style={professional.headline}>
            {data.headline}
          </Text>
        )}

        <View style={professional.contact}>
          {data.email && (
            <Text>{data.email}</Text>
          )}

          {data.phone && (
            <Text>{data.phone}</Text>
          )}

          {data.city && (
            <Text>{data.city}</Text>
          )}

          {data.state && (
            <Text>{data.state}</Text>
          )}
        </View>
      </View>

      <ResumeSections
        data={data}
        styles={professional}
      />
    </>
  );
}

/* =====================================================
   MODERN TEMPLATE
===================================================== */

function ModernResume({
  data,
}: {
  data: any;
}) {
  return (
    <>
      <View style={modern.top}>
        <Text style={modern.name}>
          {data.firstName} {data.lastName}
        </Text>

        {data.headline && (
          <Text style={modern.headline}>
            {data.headline}
          </Text>
        )}

        <View style={modern.contact}>
          {data.email && (
            <Text style={modern.contactText}>
              {data.email}
            </Text>
          )}

          {data.phone && (
            <Text style={modern.contactText}>
              {data.phone}
            </Text>
          )}

          {data.city && (
            <Text style={modern.contactText}>
              {data.city}
            </Text>
          )}

          {data.state && (
            <Text style={modern.contactText}>
              {data.state}
            </Text>
          )}
        </View>
      </View>

      <View style={modern.body}>
        <ResumeSections
          data={data}
          styles={modern}
        />
      </View>
    </>
  );
}

/* =====================================================
   COMMON SECTIONS
===================================================== */

function ResumeSections({
  data,
  styles,
}: {
  data: any;
  styles: any;
}) {
  return (
    <>
      {/* SUMMARY */}

      {data.bio && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Professional Summary
          </Text>

          <Text style={styles.text}>
            {data.bio}
          </Text>
        </View>
      )}

      {/* EXPERIENCE */}

      {data.experienceList?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Experience
          </Text>

          {data.experienceList.map(
            (item: any) => (
              <View
                key={item.id}
                style={styles.item}
              >
                {item.designation && (
                  <Text style={styles.itemTitle}>
                    {item.designation}
                  </Text>
                )}

                {item.company && (
                  <Text style={styles.itemSubTitle}>
                    {item.company}
                  </Text>
                )}

                {item.duration && (
                  <Text style={styles.itemMeta}>
                    {item.duration}
                  </Text>
                )}

                {item.description && (
                  <Text
                    style={[
                      styles.text,
                      { marginTop: 4 },
                    ]}
                  >
                    {item.description}
                  </Text>
                )}
              </View>
            )
          )}
        </View>
      )}

      {/* EDUCATION */}

      {data.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Education
          </Text>

          {data.education.map(
            (item: any) => (
              <View
                key={item.id}
                style={styles.item}
              >
                {item.degree && (
                  <Text style={styles.itemTitle}>
                    {item.degree}
                  </Text>
                )}

                {item.branch && (
                  <Text style={styles.itemSubTitle}>
                    {item.branch}
                  </Text>
                )}

                {item.college && (
                  <Text style={styles.itemSubTitle}>
                    {item.college}
                  </Text>
                )}

                {item.passingYear && (
                  <Text style={styles.itemMeta}>
                    {item.passingYear}
                  </Text>
                )}
              </View>
            )
          )}
        </View>
      )}

      {/* SKILLS */}

      {data.skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Skills
          </Text>

          <View style={styles.skillContainer}>
            {data.skills.map(
              (skill: string) => (
                <Text
                  key={skill}
                  style={styles.skill}
                >
                  {skill}
                </Text>
              )
            )}
          </View>
        </View>
      )}

      {/* PROJECTS */}

      {data.projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Projects
          </Text>

          {data.projects.map(
            (item: any) => (
              <View
                key={item.id}
                style={styles.item}
              >
                {item.name && (
                  <Text style={styles.itemTitle}>
                    {item.name}
                  </Text>
                )}

                {item.technologies && (
                  <Text style={styles.itemMeta}>
                    {item.technologies}
                  </Text>
                )}

                {item.description && (
                  <Text
                    style={[
                      styles.text,
                      { marginTop: 3 },
                    ]}
                  >
                    {item.description}
                  </Text>
                )}
              </View>
            )
          )}
        </View>
      )}

      {/* LINKS */}

      {(data.linkedin ||
        data.github ||
        data.portfolio ||
        data.website) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Professional Links
          </Text>

          {data.linkedin && (
            <Link
              src={data.linkedin}
              style={styles.link}
            >
              LinkedIn: {data.linkedin}
            </Link>
          )}

          {data.github && (
            <Link
              src={data.github}
              style={styles.link}
            >
              GitHub: {data.github}
            </Link>
          )}

          {data.portfolio && (
            <Link
              src={data.portfolio}
              style={styles.link}
            >
              Portfolio: {data.portfolio}
            </Link>
          )}

          {data.website && (
            <Link
              src={data.website}
              style={styles.link}
            >
              Website: {data.website}
            </Link>
          )}
        </View>
      )}
    </>
  );
}