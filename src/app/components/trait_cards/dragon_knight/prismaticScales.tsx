import { useState } from 'react';
import { Trait } from "@/types/Trait";

type PrismaticScalesTraitCardProps = {
    trait: Trait;
    handleTraitChange: (trait: Trait) => void;
    selectedAncestryTraits: Trait[];
};

const PrismaticScalesTraitCard = ({ trait, handleTraitChange, selectedAncestryTraits }: PrismaticScalesTraitCardProps) => {
    const isSelected = selectedAncestryTraits.some(selectedAncestryTrait => selectedAncestryTrait.trait_id === trait.trait_id);
    const [wyrmplateImmunity, setWyrmplateImmunity] = useState<string>('');
    const immunities: string[] = [
        'Acid',
        'Cold',
        'Corruption',
        'Fire',
        'Lightning',
        'Poison'
    ];

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setWyrmplateImmunity(e.target.value);
    };

    return (
        <div className="py-2">
            <div
                className={`card cursor-pointer ${
                    isSelected ? "bg-accent text-white" : "bg-slate-500 text-primary-content"
                }`}
                onClick={() => !isSelected && handleTraitChange(trait)} 
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

                    {isSelected && (
                        <select
                            className="select select-accent w-full max-w-xs text-white"
                            value={wyrmplateImmunity}
                            onChange={handleSelectChange}
                        >
                            <option value="" disabled>
                                Select immunity
                            </option>
                            {immunities.map((i) => (
                                <option key={i} value={i}>
                                    {`${i} immunity (+1 per level)`}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrismaticScalesTraitCard;