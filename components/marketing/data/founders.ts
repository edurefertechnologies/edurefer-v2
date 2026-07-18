export interface Founder {
  name: string;
  role: string;
  designation: string;
  image: string;
  bio: string;
  expertise: string[];
  linkedin?: string;
  instagram?: string;
}

export const founders: Founder[] = [
  {
    name: "Pranav Sunil Gawade",
    role: "Founder",
    designation: "Business Strategy & Operations",
    image: "/images/founders/pranav.jpg",
    bio: "Pranav leads the strategic direction of Edurefer with a focus on business growth, operational excellence, partnerships, and creating impactful educational experiences.",
    expertise: [
      "Leadership",
      "Business Strategy",
      "Operations",
      "Education"
    ],
    instagram: "www.instagram.com/_pranavgawade_",
  },
  {
    name: "Pushkar Sambhaji Bhegade",
    role: "Founder",
    designation: "Technology & Product Innovation",
    image: "/images/founders/pushkar.jpg",
    bio: "Pushkar drives technology, software engineering, AI initiatives, and product innovation, ensuring Edurefer delivers modern, industry-ready learning experiences.",
    expertise: [
      "Technology",
      "Software Development",
      "Artificial Intelligence",
      "Innovation"
    ],
    linkedin: "www.linkedin.com/in/pushkar-bhegade-164623290",
    instagram: "www.instagram.com/niranjanbhegade"
  }
];