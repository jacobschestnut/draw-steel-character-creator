type TraitCardProps = {
    trait: {
        id: number;
        name: string;
        description: string;
        value: number;
        ancestry: string;
    };
    handleTraitChange: (trait: { id: number; name: string; description: string; value: number; ancestry: string }) => void;
};

const TraitCard = ({ trait, handleTraitChange }: TraitCardProps) => {
    return (
      <div onClick={() => handleTraitChange(trait)}>
        <div className="card bg-slate-500 text-primary-content w-1/2">
          <div className="card-body">
            <div className="flex flex-row items-center">
                <h2 className="card-title pr-4">{trait.name}</h2>
                <div className="badge badge-accent badge-lg">{trait.value}</div>
            </div>
            <div>{trait.description}</div>
          </div>
        </div>
      </div>
    );
};

export default TraitCard;

  