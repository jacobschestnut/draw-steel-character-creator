import { Trait } from "@/types/Trait";

type DraconianGuardCardProps = {
    trait: Trait;
    handleTraitChange: (trait: Trait) => void;
    selectedAncestryTraits: Trait[];
};

const DraconianGuardCard = ({ trait, handleTraitChange, selectedAncestryTraits }: DraconianGuardCardProps) => {
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
                    <div className="flex flex-col items-start">
                        <div className="flex flex-row">
                            {!isSelected && (
                                <div className="mr-4 badge badge-lg badge-accent">
                                    {trait.cost}
                                </div>
                            )}
                            <h2 className="card-title">{trait.name}</h2>
                        </div>
                        <div>
                            <strong>Type</strong> <span>Manuever</span>
                        </div>
                        <div>
                            <strong>Distance</strong> <span>Self</span>
                        </div>
                        <div>
                            <strong>Target</strong> <span>Self</span>
                        </div>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: trait.description }} />
                    </div>
            </div>
        </div>
    );
};

export default DraconianGuardCard;