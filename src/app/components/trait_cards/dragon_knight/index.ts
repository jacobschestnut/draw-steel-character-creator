import DraconianGuardCard from "./draconianGuard";
import DefaultTraitCard from "../default";
import { Trait } from "@/types/Trait";
import PrismaticScalesTraitCard from "./prismaticScales";

const traitCardMap: Record<string, React.ComponentType<
  { //have to create a 'type card' object to represent what value the map is storing
    trait: Trait;
    handleTraitChange: (trait: Trait) => void;
    selectedAncestryTraits: Trait[];
  }
>> = {
  "default": DefaultTraitCard,
  "Draconian Guard": DefaultTraitCard,
  "Prismatic Scales": PrismaticScalesTraitCard
};

export default traitCardMap;
