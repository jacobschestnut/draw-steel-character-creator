import { Trait } from "@/types/Trait";

type DefaultTraitCardProps = {
    trait: Trait;
    handleTraitChange: (trait: Trait) => void;
    selectedAncestryTraits: Trait[];
};

const DefaultTraitCard = ({ trait, handleTraitChange, selectedAncestryTraits }: DefaultTraitCardProps) => {
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
                    <h2 className="card-title uppercase">{trait.name}</h2>
                    {!isSelected && (
                        <div className="ml-4 badge badge-lg badge-accent">
                            {trait.cost}
                        </div>
                    )}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: trait.description }} />
                </div>
            </div>
        </div>
    );
};

export default DefaultTraitCard;