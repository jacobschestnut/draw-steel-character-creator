'use client'

import { useState, useEffect, FC } from 'react';
import TraitCard from '../trait_card';
import { Trait } from '@/types/Trait';
import { Ancestry } from '@/types/Ancestry';
import traitCardMap from '../trait_cards/dragon_knight';
import DefaultTraitCard from '../trait_cards/default';
  
type HumanPageProps = {
    traits: Trait[];
    handleTraitChange: (trait: Trait) => void;
    selectedAncestryTraits: Trait[];
    selectedAncestryTraitsValue: number;
    ancestry: Ancestry;
    clearTraits: () => void;
}; 

const HumanPage: FC<HumanPageProps> = ({traits, handleTraitChange, selectedAncestryTraits, selectedAncestryTraitsValue, clearTraits }) => {
    const [remainingPoints, setRemainingPoints] = useState<number>(3);

    useEffect(() => {
        setRemainingPoints(3 - selectedAncestryTraitsValue);
    }, [selectedAncestryTraitsValue]);

    return (
        <div>
            <div className='text-lg font-bold pb-4'>SIGNATURE TRAIT</div>
            {/* <div className='divider h-0'></div> */}
            <div className="card bg-slate-500 text-primary-content mb-4">
                <div className="card-body">
                    <h2 className="card-title">DETECT THE SUPERNATURAL</h2>
                    <div>
                        <strong>Type</strong> <span>Manuever</span>
                    </div>
                    <div>
                        <strong>Distance</strong> <span>Self</span>
                    </div>
                    <div>
                        <strong>Target</strong> <span>Self</span>
                    </div>
                    <div>You open your awareness to detect supernatural creatures and phenomena. Until the end of your next turn, you know the location of any supernatural object, undead, construct, or creature from another plane of existence within 5 squares of you, even if you don’t have line of effect to them. You know if you’re detecting an item or a creature, and you know if a creature is undead, a construct, or from another plane of existence.</div>
                </div>
            </div>
            <div className="text-lg font-bold pb-0">PURCHASED TRAITS</div>
            {/* <div className='divider h-0'></div> */}
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

export default HumanPage;
