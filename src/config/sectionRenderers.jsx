import React from "react";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${month}, ${year}`;
};

export const sectionRenderers = {
  intro: (state) => (
    <div key="intro" style={{ textAlign: "center", paddingBottom: "1rem" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "4px" }}>
        {state.intro.name}
      </h1>
      <p style={{ fontSize: "12px", color: "#444" }}>
        {state.intro.phone} | {state.intro.email}
        {state.intro.linkedin && (
          <>
            {" | "}
            <a
              href={state.intro.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0000EE", textDecoration: "none" }}
            >
              LinkedIn
            </a>
          </>
        )}
        {state.intro.portfolio && (
          <>
            {" | "}
            <a
              href={state.intro.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0000EE", textDecoration: "none" }}
            >
              Portfolio
            </a>
          </>
        )}
      </p>
    </div>
  ),

  experience: (state) =>
    state.experience.length > 0 && (
      <section key="experience" style={{ marginTop: "1.5rem" }}>
        <h2
          style={{
            fontWeight: "600",
            borderBottom: "1px solid #ccc",
            paddingBottom: "4px",
          }}
        >
          Experience
        </h2>
        {state.experience.map((exp, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "0.5rem",
            }}
          >
            <div>
              <p>
                <strong>{exp.company_name}</strong> | {exp.position}
              </p>
              <ul style={{ listStyle: "disc", paddingLeft: "1.5rem" }}>
                {exp.pointers.map(
                  (pt, j) =>
                    pt.point && (
                      <li
                        key={j}
                        style={{
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {pt.point}
                      </li>
                    )
                )}
              </ul>
            </div>
            <span style={{ fontSize: "12px" }}>
              {formatDate(exp.from_date)} - {formatDate(exp.to_date)}
            </span>
          </div>
        ))}
      </section>
    ),

  education: (state) =>
    state.education.length > 0 && (
      <section key="education" style={{ marginTop: "1.5rem" }}>
        <h2
          style={{
            fontWeight: "600",
            borderBottom: "1px solid #ccc",
            paddingBottom: "4px",
          }}
        >
          Education
        </h2>
        {state.education.map((edu, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "0.5rem",
            }}
          >
            <div>
              <p>
                {edu.institute} | {edu.course} | {edu.gpa}
              </p>
              <p
                style={{ fontSize: "12px", color: "#555", paddingLeft: "4px" }}
              >
                {edu.institute}
              </p>
            </div>
            <span style={{ fontSize: "12px" }}>
              {" "}
              {formatDate(edu.from_date)} - {formatDate(edu.to_date)}
            </span>
          </div>
        ))}
      </section>
    ),

  skills: (state) =>
    state.skills.length > 0 && (
      <section key="skills" style={{ marginTop: "1.5rem" }}>
        <h2
          style={{
            fontWeight: "600",
            borderBottom: "1px solid #ccc",
            paddingBottom: "4px",
          }}
        >
          Skills
        </h2>
        {state.skills.map((skill, i) => (
          <div key={i} style={{ marginTop: "0.25rem" }}>
            <p style={{ fontWeight: "500", fontSize: "14px" }}>
              {skill.group_title}
            </p>
            <p style={{ paddingLeft: "1rem", fontSize: "12px", color: "#333" }}>
              {skill.content.join(", ")}
            </p>
          </div>
        ))}
      </section>
    ),

  projects: (state) =>
    state.projects.length > 0 && (
      <section key="projects" style={{ marginTop: "1.5rem" }}>
        <h2
          style={{
            fontWeight: "600",
            borderBottom: "1px solid #ccc",
            paddingBottom: "4px",
          }}
        >
          Projects
        </h2>
        {state.projects.map((proj, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "0.5rem",
            }}
          >
            <div>
              <p style={{ fontWeight: "500" }}>
                {proj.name}{" "}
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    | {proj.link}
                  </a>
                )}
              </p>
              <ul style={{ listStyle: "disc", paddingLeft: "1.5rem" }}>
                {proj.pointers.map(
                  (pt, j) =>
                    pt.point && (
                      <li
                        key={j}
                        style={{
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {pt.point}
                      </li>
                    )
                )}
              </ul>
            </div>
            <span style={{ fontSize: "12px" }}>
              {formatDate(proj.from_date)} - {formatDate(proj.to_date)}
            </span>
          </div>
        ))}
      </section>
    ),

  achievement: (state) =>
    state.achievement.some(
      (ach) => ach.name || ach.pointers?.some((p) => p.point)
    ) && (
      <section style={{ marginTop: "1.5rem" }} key="achievement">
        <h2
          style={{
            fontWeight: "600",
            borderBottom: "1px solid #ccc",
            paddingBottom: "4px",
          }}
        >
          Achievements
        </h2>
        {state.achievement.map((ach, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "0.5rem",
            }}
          >
            <div>
              <p style={{ fontWeight: "500" }}>{ach.name}</p>
              <ul style={{ listStyle: "disc", paddingLeft: "1.5rem" }}>
                {ach.pointers.map(
                  (pt, j) =>
                    pt.point && (
                      <li
                        key={j}
                        style={{
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {pt.point}
                      </li>
                    )
                )}
              </ul>
            </div>
            <span style={{ fontSize: "12px" }}>{formatDate(ach.date)}</span>
          </div>
        ))}
      </section>
    ),

  extra: (state) =>
    state.extra.some(
      (ext) => ext.name || ext.pointers?.some((p) => p.point)
    ) && (
      <section key="extra" style={{ marginTop: "1.5rem" }}>
        <h2
          style={{
            fontWeight: "600",
            borderBottom: "1px solid #ccc",
            paddingBottom: "4px",
          }}
        >
          Extra
        </h2>
        {state.extra.map((ext, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "0.5rem",
            }}
          >
            <div>
              <p style={{ fontWeight: "500" }}>{ext.name}</p>
              <ul style={{ listStyle: "disc", paddingLeft: "1.5rem" }}>
                {ext.pointers.map(
                  (pt, j) =>
                    pt.point && (
                      <li
                        key={j}
                        style={{
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {pt.point}
                      </li>
                    )
                )}
              </ul>
            </div>
            <span style={{ fontSize: "12px" }}>{formatDate(ext.date)}</span>
          </div>
        ))}
      </section>
    ),

  reference: (state) =>
    state.reference.length > 0 && (
      <section key="reference" style={{ marginTop: "1.5rem" }}>
        <h2
          style={{
            fontWeight: "600",
            borderBottom: "1px solid #ccc",
            paddingBottom: "4px",
          }}
        >
          Reference
        </h2>
        {state.reference.map((ref, i) => (
          <p key={i}>
            {ref.name} | {ref.position} | {ref.contact}
          </p>
        ))}
      </section>
    ),

  language: (state) =>
    state.language.length > 0 && (
      <section key="language" style={{ marginTop: "1.5rem" }}>
        <h2
          style={{
            fontWeight: "600",
            borderBottom: "1px solid #ccc",
            paddingBottom: "4px",
          }}
        >
          Language
        </h2>
        {state.language.map((lang, i) => (
          <div key={i}>
            <span>{lang.name} | </span>
            <span
              style={{ fontSize: "12px", color: "#560", paddingLeft: "4px" }}
            >
              Proficiency - {lang.proficiency}
            </span>
          </div>
        ))}
      </section>
    ),
};
