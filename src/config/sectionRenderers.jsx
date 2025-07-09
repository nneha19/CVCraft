import React from "react";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${month}, ${year}`;
};

const formatURL = (url) =>
  url?.startsWith("http://") || url?.startsWith("https://")
    ? url
    : `https://${url}`;

const sectionStyles = {
  heading: {
    fontSize: "15px",
    fontWeight: "600",
    borderBottom: "1px solid #ccc",
    paddingBottom: "4px",
    marginBottom: "4px",
  },
  subheading: {
    fontSize: "13px",
    fontWeight: "500",
  },
  body: {
    fontSize: "12.5px",
    color: "#333",
    lineHeight: 1.6,
  },
  date: {
    fontSize: "12px",
    color: "#666",
  },
  list: {
    paddingLeft: "1.25rem",
    margin: 0,
  },
  listItem: {
    position: "relative",
    marginTop: "0.25rem",
    paddingLeft: "1rem",
    fontSize: "12.5px",
    lineHeight: 1.6,
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  },
  bullet: {
    position: "absolute",
    left: 0,
    top: 0,
    fontWeight: "bold",
  },
};

export const sectionRenderers = {
  intro: (state) => (
    <div key="intro" style={{ textAlign: "center", paddingBottom: "1rem" }}>
      <h1 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "4px" }}>{state.intro.name}</h1>
      <p style={sectionStyles.body}>
        {state.intro.phone} | {state.intro.email}
        {state.intro.linkedin && (
          <> | <a href={formatURL(state.intro.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>LinkedIn</a></>
        )}
        {state.intro.portfolio && (
          <> | <a href={formatURL(state.intro.portfolio)} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>Portfolio</a></>
        )}
      </p>
    </div>
  ),

  experience: (state) => state.experience.length > 0 && (
    <section key="experience" style={{ marginTop: "1.5rem" }}>
      <h2 style={sectionStyles.heading}>Experience</h2>
      {state.experience.map((exp, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
          <div>
            <p style={sectionStyles.subheading}><strong>{exp.company_name}</strong> | {exp.position}</p>
            <ul style={sectionStyles.list}>
              {exp.pointers.map((pt, j) => pt.point && (
                <li key={j} style={sectionStyles.listItem}>
                  <span style={sectionStyles.bullet}>•</span>{pt.point}
                </li>
              ))}
            </ul>
          </div>
          <span style={sectionStyles.date}>{formatDate(exp.from_date)} - {formatDate(exp.to_date)}</span>
        </div>
      ))}
    </section>
  ),

  education: (state) => state.education.length > 0 && (
    <section key="education" style={{ marginTop: "1.5rem" }}>
      <h2 style={sectionStyles.heading}>Education</h2>
      {state.education.map((edu, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
          <div>
            <p style={sectionStyles.subheading}>{edu.institute} | {edu.course} | GPA - {edu.gpa}</p>
          </div>
          <span style={sectionStyles.date}>{formatDate(edu.from_date)} - {formatDate(edu.to_date)}</span>
        </div>
      ))}
    </section>
  ),

skills: (state) => state.skills.length > 0 && (
  <section key="skills" style={{ marginTop: "1.5rem" }}>
    <h2 style={sectionStyles.heading}>Skills</h2>
    {state.skills.map((skill, i) => (
      <div key={i} style={{ marginTop: "0.5rem" }}>
        <p style={sectionStyles.subheading}>{skill.group_title}</p>
        <p style={{ ...sectionStyles.body, paddingLeft: "1rem" }}>
          - {skill.content.join(", ")}
        </p>
      </div>
    ))}
  </section>
),


  projects: (state) => state.projects.length > 0 && (
    <section key="projects" style={{ marginTop: "1.5rem" }}>
      <h2 style={sectionStyles.heading}>Projects</h2>
      {state.projects.map((proj, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
          <div>
            <p style={sectionStyles.subheading}>{proj.name} | {proj.link && <a href={formatURL(proj.link)} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>Link</a>}</p>
            <ul style={sectionStyles.list}>
              {proj.pointers.map((pt, j) => pt.point && (
                <li key={j} style={sectionStyles.listItem}>
                  <span style={sectionStyles.bullet}>•</span>{pt.point}
                </li>
              ))}
            </ul>
          </div>
          <span style={sectionStyles.date}>{formatDate(proj.from_date)} - {formatDate(proj.to_date)}</span>
        </div>
      ))}
    </section>
  ),

  achievement: (state) => state.achievement.some((a) => a.name || a.pointers?.some(p => p.point)) && (
    <section key="achievement" style={{ marginTop: "1.5rem" }}>
      <h2 style={sectionStyles.heading}>Achievements</h2>
      {state.achievement.map((ach, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
          <div>
            <p style={sectionStyles.subheading}>{ach.name}</p>
            <ul style={sectionStyles.list}>
              {ach.pointers.map((pt, j) => pt.point && (
                <li key={j} style={sectionStyles.listItem}>
                  <span style={sectionStyles.bullet}>•</span>{pt.point}
                </li>
              ))}
            </ul>
          </div>
          <span style={sectionStyles.date}>{formatDate(ach.date)}</span>
        </div>
      ))}
    </section>
  ),

  extra: (state) => state.extra.some((ext) => ext.name || ext.pointers?.some(p => p.point)) && (
    <section key="extra" style={{ marginTop: "1.5rem" }}>
      <h2 style={sectionStyles.heading}>Extra</h2>
      {state.extra.map((ext, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
          <div>
            <p style={sectionStyles.subheading}>{ext.name}</p>
            <ul style={sectionStyles.list}>
              {ext.pointers.map((pt, j) => pt.point && (
                <li key={j} style={sectionStyles.listItem}>
                  <span style={sectionStyles.bullet}>•</span>{pt.point}
                </li>
              ))}
            </ul>
          </div>
          <span style={sectionStyles.date}>{formatDate(ext.date)}</span>
        </div>
      ))}
    </section>
  ),

  reference: (state) => state.reference.length > 0 && (
    <section key="reference" style={{ marginTop: "1.5rem" }}>
      <h2 style={sectionStyles.heading}>Reference</h2>
      {state.reference.map((ref, i) => (
        <p key={i} style={sectionStyles.body}>{ref.name} | {ref.profession} | {ref.contact}</p>
      ))}
    </section>
  ),

  language: (state) => state.language.length > 0 && (
    <section key="language" style={{ marginTop: "1.5rem" }}>
      <h2 style={sectionStyles.heading}>Language</h2>
      {state.language.map((lang, i) => (
        <div key={i}>
          <span style={sectionStyles.subheading}>{lang.name} | </span>
          <span style={{ ...sectionStyles.date, paddingLeft: "6px" }}>Proficiency - {lang.proficiency}</span>
        </div>
      ))}
    </section>
  ),
};
