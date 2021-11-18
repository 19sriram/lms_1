export const _leadStatus = ["Hot", "Warm", "Cold"];

export const _leadIndustries = [
  "Real Estate",
  "Hospitality ",
  "Education",
  "Manufacturing",
  "Health & Care",
  "Government",
  "Retail",
  "Automobile",
  "Insurance ",
  "Transport",
];

export const _links = [
  {
    to: "/dashboard",
    isAllowed: "ADMIN,CEO,Executive,Ghost",
    name:'Dashboard'
  },
  {
    to: "/users",
    isAllowed: "ADMIN,CEO,Ghost",
    name:'Users'
  },
  {
    to: "/roles",
    isAllowed: "ADMIN,CEO,Ghost",
    name:'Roles',
    
  },
  {
    to: "/leads",
    isAllowed: "ADMIN,CEO,Executive,Ghost",
    name:'Leads'
  },
];
