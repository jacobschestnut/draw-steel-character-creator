'use client'

import { useState, useEffect, FC } from 'react';
import TraitCard from '../trait_card';

type Trait = {
    id: number;
    name: string;
    description: string;
    value: number;
    ancestry: string;
};
  
type HumanPageProps = {
    traits: Trait[];
    handleTraitChange: (trait: Trait) => void;
    selectedTraits: Trait[];
    selectedTraitsValue: number;
}; 

const HumanPage: FC<HumanPageProps> = ({traits, handleTraitChange, selectedTraits, selectedTraitsValue }) => {
    const [remainingPoints, setRemainingPoints] = useState<number>(3);

    useEffect(() => {
        setRemainingPoints(3 - selectedTraitsValue);
    }, [selectedTraitsValue]);

    return (
        <div className='pt-4'>
            <div className='text-lg font-bold pb-0'>SIGNATURE TRAIT</div>
            <div className='divider h-0'></div>
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
            <div className='divider h-0'></div>
            <div>
                You have {remainingPoints} points left to spend.
                {traits.map((trait) => (
                    <TraitCard
                        key={trait.id}
                        trait={trait}
                        handleTraitChange={handleTraitChange}
                        selectedTraits={selectedTraits}
                    />
                ))}
            </div>
        </div>
  );
};

export default HumanPage;
