'use client'

import { useState, useEffect, FC } from 'react';
import DefaultTraitCard from '@/app/components/trait_cards/default'
import { Trait } from '@/types/Trait';
import { Ancestry } from '@/types/Ancestry';
import traitCardMap from '../trait_cards/dragon_knight';
  
type DragonKnightPageProps = {
    traits: Trait[];
    handleTraitChange: (trait: Trait) => void;
    selectedAncestryTraits: Trait[];
    selectedAncestryTraitsValue: number;
    ancestry: Ancestry;
    clearTraits: () => void;
}; 

const DragonKnightPage: FC<DragonKnightPageProps> = ({traits, handleTraitChange, selectedAncestryTraits, selectedAncestryTraitsValue, clearTraits }) => {
    const [remainingPoints, setRemainingPoints] = useState<number>(3);
    const [wyrmplateImmunity, setWyrmplateImmunity] = useState<string>('');
    const immunities: string[] = [
        'Acid',
        'Cold',
        'Corruption',
        'Fire',
        'Lightning',
        'Poison'
    ];

    useEffect(() => {
        setRemainingPoints(3 - selectedAncestryTraitsValue);
    }, [selectedAncestryTraitsValue]);

    return (
        <div>
            <div className='text-lg font-bold pb-4'>SIGNATURE TRAIT</div>
            <div className="card bg-slate-500 text-primary-content mb-4">
                <div className="card-body">
                    <h2 className="card-title">WYRMPLATE</h2>
                    <div className='pb-4'>
                        Your hardened scales grant you immunity equal to your 
                        level to one of the following damage types: acid, cold, 
                        corruption, fire, lightning, or poison. You can change your 
                        damage immunity type when you finish a respite.
                    </div>
                    <select
                        className="select select-accent w-full max-w-xs text-white"
                        value={wyrmplateImmunity}
                        onChange={(e) => setWyrmplateImmunity(e.target.value)}
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
                </div>
            </div>
            <div className="text-lg font-bold pb-0">PURCHASED TRAITS</div>
            <div>
                You have {remainingPoints} points left to spend.
                <button 
                    className="btn ml-4"
                    onClick={() => clearTraits()}
                >
                    Clear
                </button>
                {
                    traits.map((trait) => {
                        const TraitComponent = traitCardMap[trait.name] || DefaultTraitCard
                        return (
                            <TraitComponent
                                key={trait.trait_id}
                                trait={trait}
                                handleTraitChange={handleTraitChange}
                                selectedAncestryTraits={selectedAncestryTraits}
                            />
                        )
                    })
                }
            </div>
        </div>
  );
};

export default DragonKnightPage;