type Trait = {
    id: number;
    name: string;
    description: string;
    value: number;
    ancestry: string;
};

type TraitCardProps = {
    trait: {
        id: number;
        name: string;
        description: string;
        value: number;
        ancestry: string;
    };
    handleTraitChange: (trait: { id: number; name: string; description: string; value: number; ancestry: string }) => void;
    selectedTraits: Trait[];
};

const TraitCard = ({ trait, handleTraitChange, selectedTraits }: TraitCardProps) => {
    const isSelected = selectedTraits.some(selectedTrait => selectedTrait.id === trait.id);

    return (
      <div className='py-2'>
        {/* <div className={"card bg-slate-500 text-primary-content w-1/2"}> */}
            <div
                className={`card cursor-pointer ${
                    isSelected ? "bg-accent text-white" : "bg-slate-500 text-primary-content"
                }`}
            >
            <div className="card-body" onClick={() => handleTraitChange(trait)}>
                <div className="flex flex-row items-center">
                    <div className="badge badge-accent badge-lg">{trait.value}</div>
                    <h2 className="card-title pl-4">{trait.name}</h2>
                </div>
            <div>{trait.description}</div>
          </div>
        </div>
      </div>
    );
};

export default TraitCard;

  