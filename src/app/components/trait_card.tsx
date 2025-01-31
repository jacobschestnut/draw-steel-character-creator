import { Trait } from "@/types/Trait";

type TraitCardProps = {
    trait: Trait;
    handleTraitChange: (trait: Trait) => void;
    selectedAncestryTraits: Trait[];
};

const TraitCard = ({ trait, handleTraitChange, selectedAncestryTraits }: TraitCardProps) => {
    const isSelected = selectedAncestryTraits.some(selectedAncestryTrait => selectedAncestryTrait.trait_id === trait.trait_id);

    return (
        <div className="py-2">
            <div
                className={`card cursor-pointer ${
                    isSelected ? "bg-accent text-white" : "bg-slate-500 text-primary-content"
                }`}
                onClick={() => handleTraitChange(trait)}
            >
                <div className="card-body">
                <div className="flex flex-row items-center">
                    {!isSelected && (
                        <div className="mr-4 badge badge-lg badge-accent">
                            {trait.cost}
                        </div>
                    )}
                    <h2 className="card-title">{trait.name}</h2>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: trait.description }} />
                </div>
            </div>
        </div>
    );
};



export default TraitCard;

  