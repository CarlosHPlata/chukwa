import { GetOrigins } from "@/domain/repositories/originRepository";

export const getOrigins: GetOrigins = () => {
  const origins = [
    {
      id: "1",
      name: "caixa",
      icon: "shopping",
    },
  ];

  return Promise.resolve(origins);
};
