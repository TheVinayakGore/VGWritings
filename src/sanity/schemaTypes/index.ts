import { type SchemaTypeDefinition } from "sanity";
import about from "./about";
import learning from "./learning";
import { learningEngagement } from "./learningEngagement";
import general from "./general";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [about, learning, learningEngagement, general],
};
