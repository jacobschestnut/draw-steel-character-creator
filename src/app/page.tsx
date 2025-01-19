'use client'

import { useState, useEffect } from 'react';

type Trait = {
  id: number;
  name: string;
  value: number;
  ancestry: string;
};

export default function Home() {
  const ancestryList = ['Human', 'Devil', 'Elf', 'Orc'];

  const importedTraits = [
    { id: 1, name: 'Detect The Supernatural', value: 2, ancestry: 'Human' },
    { id: 2, name: 'Perseverance', value: 1, ancestry: 'Human' },
    { id: 9, name: 'Leadership', value: 2, ancestry: 'Human' },
    { id: 10, name: 'Enhanced Vision', value: 1, ancestry: 'Human' },
    { id: 3, name: 'Barbed Tail', value: 2, ancestry: 'Devil' },
    { id: 4, name: 'Silver Tongue', value: 1, ancestry: 'Devil' },
    { id: 11, name: 'Infernal Charm', value: 2, ancestry: 'Devil' },
    { id: 12, name: 'Night Vision', value: 1, ancestry: 'Devil' },
    { id: 5, name: 'Forest Lore', value: 2, ancestry: 'Elf' },
    { id: 6, name: 'Elven Agility', value: 1, ancestry: 'Elf' },
    { id: 13, name: 'Nature’s Embrace', value: 2, ancestry: 'Elf' },
    { id: 14, name: 'Arcane Knowledge', value: 1, ancestry: 'Elf' },
    { id: 7, name: 'Savage Strength', value: 2, ancestry: 'Orc' },
    { id: 8, name: 'Battle Fury', value: 1, ancestry: 'Orc' },
    { id: 15, name: 'Ferocity', value: 2, ancestry: 'Orc' },
    { id: 16, name: 'Toughness', value: 1, ancestry: 'Orc' },
  ]

  const sortTraits = (arr: Trait[]) => {
    const groupedTraits: { [key: string]: Trait[] } = {};
    arr.forEach((trait) => {
      if (!groupedTraits[trait.ancestry]) groupedTraits[trait.ancestry] = [];
      groupedTraits[trait.ancestry].push(trait);
    });
    return groupedTraits;
  };

  const traitOptions: { [key: string]: Trait[] } = sortTraits(importedTraits);

  const [selectedAncestry, setSelectedAncestry] = useState('');
  const [trait1, setTrait1] = useState<Trait | null>(null);
  const [trait2, setTrait2] = useState<Trait | null>(null);
  const [trait3, setTrait3] = useState<Trait | null>(null);
  const [traits, setTraits] = useState<Trait[]>([]);

  const showTrait3 = () => {
    if (trait1 && trait2 && !trait3) {
      if (traitValueTotal < 3) {
        return true
      }
    }

    if (trait1 && trait2 && trait3) {
      if (traitValueTotal <= 3) {
        return true
      }
    }

    return false
  }

  const [selectedTraits, setSelectedTraits] = useState<Trait[]>([]);
  const [traitValueTotal, setTraitValueTotal] = useState(0);

  const handleAncestryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ancestry = e.target.value;
    setSelectedAncestry(ancestry);
    setTraits(traitOptions[ancestry] || []);
    setTrait1(null);
    setTrait2(null);
    setTrait3(null);
  };

  const populateTraitOptions = (traits: Trait[], num: number) => {
    if (num == 2) {
      return traits.filter((trait) => (
        (trait.name !== trait1?.name)
      ));
    }

    if (num == 3) {
      return traits.filter((trait) => (
        (trait.name !== trait1?.name) && (trait.name !== trait2?.name)
      ));
    }

    return traits
  };

  const handleTraitChange = (e: React.ChangeEvent<HTMLSelectElement>, traitNumber: number) => {
    const selectedTraitName = e.target.value;
    const selectedTrait = traitOptions[selectedAncestry].find(
      (trait) => trait.name === selectedTraitName
    );
    
    if (selectedTrait) {
      if (traitNumber === 1) {
        setTrait1(selectedTrait);
      } else if (traitNumber === 2) {
        setTrait2(selectedTrait);
      } else if (traitNumber === 3) {
        setTrait3(selectedTrait);
      }
    }
  };

  useEffect(() => {
    let updatedTraits = [trait1, trait2, trait3].filter(Boolean) as Trait[];
    let value = 0;
  
    updatedTraits = updatedTraits.filter((trait, index) => {
      value += trait.value;
      if (value > 3) {
        if (index === 1) setTrait2(null);
        if (index === 2) setTrait3(null);
        value -= trait.value;
        return false; 
      }
      return true;
    });
  
    setSelectedTraits(updatedTraits);
    setTraitValueTotal(value);
  }, [trait1, trait2, trait3]);
  

  return (
    <div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium">Ancestry</div>
        <div className="collapse-content">
          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedAncestry}
            onChange={handleAncestryChange}
            aria-label="Select ancestry"
          >
            <option value="" disabled>Select ancestry</option>
            {ancestryList.map((ancestry) => (
              <option key={ancestry} value={ancestry}>
                {ancestry}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Traits</div>
        <div className="collapse-content">
          <select
            className="select select-bordered w-full max-w-xs"
            value={trait1?.name || ''}
            aria-label="Select trait 1"
            onChange={(e) => handleTraitChange(e, 1)}
          >
            <option value="" disabled>Select trait</option>
            {populateTraitOptions(traits, 1).map((trait) => (
              <option key={trait.id} value={trait.name}>
                {trait.name} (Value: {trait.value})
              </option>
            ))}
          </select>
          
          <select
            className="select select-bordered w-full max-w-xs"
            value={trait2?.name || ''}
            aria-label="Select trait 2"
            onChange={(e) => handleTraitChange(e, 2)}
            style={{ display: trait1 ? 'block' : 'none' }}
          >
            <option value="" disabled>Select trait</option>
            {populateTraitOptions(traits, 2).map((trait) => (
              <option key={trait.id} value={trait.name}>
                {trait.name} (Value: {trait.value})
              </option>
            ))}
          </select>
          
          <select
            className="select select-bordered w-full max-w-xs"
            value={trait3?.name || ''}
            aria-label="Select trait 3"
            onChange={(e) => handleTraitChange(e, 3)}
            style={{
              display: showTrait3() ? 'block' : 'none'
            }}
          >
            <option value="" disabled>Select trait</option>
            {populateTraitOptions(traits, 3).map((trait) => (
              <option key={trait.id} value={trait.name}>
                {trait.name} (Value: {trait.value})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
