import { GetConcepts } from "@/domain/repositories/conceptRepository";

export const getConcepts: GetConcepts = () => {
  const concepts = [
    {
      id: "1",
      name: "shopping",
      icon: "shopping-cart",
    },
    {
      id: "1",
      name: "bills",
      icon: "payments",
    },
  ];

  return Promise.resolve(concepts);
};
