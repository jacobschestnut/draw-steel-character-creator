type Trait = {
    id: number;
    name: string;
    description: string;
    value: number;
    ancestry: string;
};

type TraitCardProps = {
    trait: Trait;
    handleTraitChange: (trait: Trait) => void;
    selectedAncestryTraits: Trait[];
};

const TraitCard = ({ trait, handleTraitChange, selectedAncestryTraits }: TraitCardProps) => {
    const isSelected = selectedAncestryTraits.some(selectedAncestryTrait => selectedAncestryTrait.id === trait.id);

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
                        <div
                            className={`badge badge-lg ${
                                isSelected ? "bg-black text-white" : "badge-accent"
                            }`}
                        >
                            {trait.value}
                        </div>
                        <h2 className="card-title pl-4">{trait.name}</h2>
                    </div>
                    <div>{trait.description}</div>
                </div>
            </div>
        </div>
    );
};


export default TraitCard;

  