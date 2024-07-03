export const allChapters = [
  { subject: "physics", paper: "first", chapters: ["kinematics", "dynamics", "thermodynamics"] },
  { subject: "physics", paper: "second", chapters: ["electromagnetism", "optics", "quantum mechanics"] },
  { subject: "chemistry", paper: "first", chapters: ["atomic structure", "periodic table", "chemical bonding"] },
  {
    subject: "chemistry",
    paper: "second",
    chapters: ["organic chemistry", "inorganic chemistry", "physical chemistry"],
  },
  { subject: "math", paper: "first", chapters: ["algebra", "calculus", "trigonometry"] },
  { subject: "math", paper: "second", chapters: ["statistics", "probability", "geometry"] },
];

export const subjectOption = ["physics", "chemistry", "math"].map((item) => ({
  label: <span className="capitalize">{item}</span>,
  value: item,
}));
export const institutionOption = ["DU", "RU", "BSMRSTU","CU"].map((item) => ({
  label: <span className="capitalize">{item}</span>,
  value: item,
}));
