'use client'

import { useState, useEffect, FC } from 'react';

type Trait = {
    id: number;
    name: string;
    value: number;
    ancestry: string;
};

const HumanPage: FC<{ traits: Trait[] }> = ({ traits }) => {
  return (
    <div className='pt-4'>
        <div className='text-lg pb-4'>SIGNATURE TRAIT:</div>
        <div className="card bg-primary text-primary-content w-1/2">
            <div className="card-body">
                <h2 className="card-title">DETECT THE SUPERNATURAL</h2>
                <div>You open your awareness to detect supernatural creatures and phenomena.</div> 
                <div>
                    <strong>Type</strong> <span>Manuever</span>
                </div>
                <div>
                    <strong>Distance</strong> <span>Self</span>
                </div>
                <div>
                    <strong>Target</strong> <span>Self</span>
                </div>
                <div>Until the end of your next turn, you know the location of any supernatural object, undead, construct, or creature from another plane of existence within 5 squares of you, even if you don’t have line of effect to them. You know if you’re detecting an item or a creature, and you know if a creature is undead, a construct, or from another plane of existence.</div>
            </div>
        </div>
        <div className="text-lg py-4">PURCHASED TRAITS:</div>
        <div className="flex flex-col lg:flex-row">
            <div className="divider lg:divider-horizontal"></div>
            <div className="">
              {traits.map((trait: Trait) => (
                <div className='font-bold' key={trait.id}>
                    {trait.name}
                </div>
              ))}
            </div>
        </div>
    </div>
  );
};

export default HumanPage;
