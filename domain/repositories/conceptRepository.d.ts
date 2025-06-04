import { Concept } from "../entities/Concept";

export type GetConcepts = () => Promise<Concept[]>
