'use client'

import { useState, useEffect, FC } from 'react';
import { Trait } from '@/types/Trait';
import { Skill } from '@/types/Skill';
import TraitCard from "@/app/components/trait_card"
import { Ancestry } from '@/types/Ancestry';
import traitCardMap from '../trait_cards/dragon_knight';
import DefaultTraitCard from '../trait_cards/default';

type DevilPageProps = {
    ancestry: Ancestry;
    devilSkill: Skill | null;
    traits: Trait[];
    handleTraitChange: (trait: Trait) => void;
    selectedAncestryTraits: Trait[];
    selectedAncestryTraitsValue: number;
    handleDevilSkillSelection: (skill: Skill) => void;
    clearTraits: () => void;
};

const DevilPage: FC<DevilPageProps> = ({
    traits,
    handleTraitChange,
    selectedAncestryTraits,
    selectedAncestryTraitsValue,
    handleDevilSkillSelection,
    devilSkill,
    clearTraits
}) => {
    const [remainingPoints, setRemainingPoints] = useState<number>(3);
    const [skills, setSkills] = useState<Skill[]>([]);

    const handleSelectionChange = (skillName: string) => {
        const selectedSkill = skills.find((skill) => skill.name === skillName);
        if (selectedSkill) {
            handleDevilSkillSelection(selectedSkill);
        }
    };

    useEffect(() => {
        setRemainingPoints(3 - selectedAncestryTraitsValue);
    }, [selectedAncestryTraitsValue]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/skillgroup/3/skills/`
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setSkills(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSkills();
    }, []);

    const sortTraits = (traits: Trait[]) => {
        const sortedTraits = traits.sort((a, b) => {
            if (a.cost !== b.cost) {
                return a.cost - b.cost;
            }
        
            return a.name.localeCompare(b.name);
        });

        return sortedTraits
    }

    return (
        <div>
            <div className='text-lg font-bold pb-4'>SIGNATURE TRAIT</div>
            <div className="card bg-slate-500 text-primary-content mb-4">
                <div className="card-body">
                    <h2 className="card-title">SILVER TONGUE</h2>
                    <div className='pb-4'>
                        Your innate magic allows you to twist how your words are
                        perceived to get a better read on people and convince them to
                        see things your way. You gain an interpersonal skill of your
                        choice, and you have an edge when attempting to discover an
                        NPC’s motivations and pitfalls during negotiations.
                    </div>
                    <select
                        className="select select-accent w-full max-w-xs text-white"
                        value={devilSkill?.name || ''}
                        onChange={(e) => handleSelectionChange(e.target.value)}
                    >
                        <option value="" disabled>
                            Select interpersonal skill
                        </option>
                        {skills.map((skill) => (
                            <option key={skill.skill_id} value={skill.name}>
                                {skill.name}
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

export default DevilPage;
