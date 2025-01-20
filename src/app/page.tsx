'use client';

import { useState, useEffect } from 'react';

type Trait = {
  id: number;
  name: string;
  value: number;
  ancestry: string;
};

type Language = {
  id: number;
  name: string;
}

type Environment = {
  id: number;
  name: string;
  description: string;
  quickBuildSkill: number;
};

type Organization = {
  id: number;
  name: string;
  description: string;
  quickBuildSkill: string;
};

type Upbringing = {
  id: number;
  name: string;
  description: string;
  quickBuildSkill: string;
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
  ];

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
      return traitValueTotal < 3;
    }
    if (trait1 && trait2 && trait3) {
      return traitValueTotal <= 3;
    }
    return false;
  };

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
    if (num === 2) {
      return traits.filter((trait) => trait.name !== trait1?.name);
    }
    if (num === 3) {
      return traits.filter(
        (trait) => trait.name !== trait1?.name && trait.name !== trait2?.name
      );
    }
    return traits;
  };

  const handleTraitChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    traitNumber: number
  ) => {
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

  const [language, setLanguage] = useState<Language | null>(null);

  const languages = [
    { id: 1, name: 'Anjali' },
    { id: 2, name: 'Axiomatic' },
    // { id: 3, name: 'Caelian' },
    { id: 4, name: 'Filliaric' },
    { id: 5, name: 'High Kuric' },
  ];

  const [environment, setEnvironment] = useState<Environment | null>(null);

  const environments: Environment[] = [
    {
      id: 1,
      name: 'Nomadic',
      description:
        'A nomadic culture travels from place to place to survive. They might follow animal migrations or the weather, travel to sell their wares or services, or simply enjoy a restless lifestyle full of new experiences and peoples. Those who grow up in nomadic cultures learn to navigate the wilderness and interact with others.',
      quickBuildSkill: 45,
    },
    {
      id: 2,
      name: 'Rural',
      description:
        'A rural culture is one located in a town, village, or smaller settled enclave. People dwelling in such places often cultivate the land, trade goods or services with travelers passing through, harvest fish from the sea, or mine metals and gems from the earth. Living among a small population, most folks in a rural community learn a trade and are handed down bits of essential knowledge to help their community survive.',
      quickBuildSkill: 40,
    },
    {
      id: 3,
      name: 'Secluded',
      description:
        'A secluded culture is based in one relatively close-quarters structure—a building, a cavern, and so forth—and interacts with other cultures only rarely. Such places are often buildings or complexes such as monasteries, castles, or prisons. Folk in a secluded culture have little or no reason to leave their home or interact with other cultures on the outside, but might have an awareness of those cultures and of events happening outside their enclave.',
      quickBuildSkill: 37,
    },
    {
      id: 4,
      name: 'Urban',
      description:
        'An urban culture is always centered in a city. Such a culture might arise within the walls of a massive metropolis with a cosmopolitan population; within a network of caverns that hold an underground city; or in any other place where a large population lives relatively close together. The people of urban cultures often learn to effectively misdirect others in order to navigate the crowds and the political machinations that can come with city life.',
      quickBuildSkill: 13,
    },
    {
      id: 5,
      name: 'Wilderness',
      description:
        'A wilderness culture doesn’t attempt to tame the terrain in which its people live, whether desert, forest, swamp, tundra, ocean, or more exotic climes. Instead, the folk of such a culture thrive amid nature, taking their sustenance and shelter from the land itself. A wilderness culture might be a circle of druids protecting a great wode, a band of brigands hiding out in desert caves, or a camp of orc mercenaries who call the trackless mountains home.',
      quickBuildSkill: 40,
    },
  ];

  const [organization, setOrganization] = useState<Organization | null>(null);

  const organizations: Organization[] = [
    {
      id: 1,
      name: 'Anarchic',
      description: `In an anarchic culture, there are no rules and no one person leads the others. 
      This might sound like complete chaos—people taking what they want when they want it—and some 
      cultures that practice anarchy are. Other anarchic cultures are peaceful places where people mostly 
      work for themselves, their friends, or their family, but rely on the whole group when times get tough.`,
      quickBuildSkill: '18',
    },
    {
      id: 2,
      name: 'Bureaucratic',
      description: `Bureaucratic cultures are steeped in official leadership and formally recorded laws. 
      Members of such a culture are often ranked in power according to those laws, with a small group of 
      people holding the power to rule according to birthright, popular vote, or some other official and 
      measurable standard.`,
      quickBuildSkill: '9',
    },
    {
      id: 3,
      name: 'Communal',
      description: `A communal culture is a place where all members of the collective are considered equal. 
      The community works together to make important decisions that affect the majority of the culture. While 
      they elect leaders to carry out these decisions and organize their efforts, each person has a relatively 
      equal say in how the culture operates, and everyone contributes to help their people survive and thrive.`,
      quickBuildSkill: '36',
    },
  ];

  const [upbringing, setUpbringing] = useState<Upbringing | null>(null);

  const upbringings: Upbringing[] = [
    {
      id: 1,
      name: 'Academic',
      description: `Heroes with an academic upbringing were raised by people who collect, study, and share books and other records.
      Some academics focus on one area of study, such as a college for wizards dedicated to the study of magic, or a church that teaches
      the word of one deity. People in an academic culture learn how to wield the power that is knowledge.`,
      quickBuildSkill: '3',
    },
    {
      id: 2,
      name: 'Creative',
      description: `Heroes with a creative upbringing were raised among folk who create art or other works valuable enough to trade.
      A creative culture might produce fine art such as dance, music, or sculpture, or more practical wares such as wagons, weapons,
      tools, or buildings. People in such cultures learn the value of quality crafting and attention to detail.`,
      quickBuildSkill: '35',
    },
    {
      id: 3,
      name: 'Illegal',
      description: `Heroes with an illegal upbringing had caregivers who performed activities that other folk—whether within or outside their culture—
      considered unlawful. A band of pirates, a guild of assassins, or an organization of spies all commit unlawful acts for money.
      People with illegal upbringings typically don’t mind breaking the rules when it suits them—and are good at making sure no one finds out they did.`,
      quickBuildSkill: '23',
    },
    {
      id: 4,
      name: 'Labor',
      description: `People who labor for a living survive through cultivation, typically raising crops or livestock on a farm; by harvesting natural resources,
      whether by hunting, trapping, logging, or mining; or through manual labor tied to settlement and trade, such as construction, carting, loading cargo,
      and so forth. People with a labor upbringing know the value of hard work.`,
      quickBuildSkill: '44',
    },
    {
      id: 5,
      name: 'Martial',
      description: `Heroes who have a martial upbringing are raised by warriors. These might be the soldiers of an established army, a band of mercenaries,
      a guild of monster-slaying adventurers, or any other folk whose lives revolve around combat. Heroes with a martial upbringing are always ready
      for a fight—and they know how to finish that fight.`,
      quickBuildSkill: '31',
    },
    {
      id: 6,
      name: 'Noble',
      description: `Heroes with a noble upbringing were raised by leaders who rule over others and play the games of politics to maintain power.
      Many families are nobles by birthright, but some cultures have noble titles that are earned through deeds or popularity.
      Whatever the case, heroes with this background understand why the whispered words in the right ear can sometimes be more powerful than any army.`,
      quickBuildSkill: '32',
    },
  ];

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
            <option value="" disabled>
              Select ancestry
            </option>
            {ancestryList.map((ancestry) => (
              <option key={ancestry} value={ancestry}>
                {ancestry}
              </option>
            ))}
          </select>

          <div className='pt-2'>
            <div className="py-4 text-l font-medium">Traits</div>
            <select
              className="select select-bordered w-full max-w-xs"
              value={trait1?.name || ''}
              aria-label="Select trait 1"
              onChange={(e) => handleTraitChange(e, 1)}
            >
              <option value="" disabled>
                Select trait
              </option>
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
              <option value="" disabled>
                Select trait
              </option>
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
                display: showTrait3() ? 'block' : 'none',
              }}
            >
              <option value="" disabled>
                Select trait
              </option>
              {populateTraitOptions(traits, 3).map((trait) => (
                <option key={trait.id} value={trait.name}>
                  {trait.name} (Value: {trait.value})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Culture</div>
        <div className="collapse-content">
        <div className='pt-2'>
            <div className="py-4 text-l font-medium">Language</div>
            <select
              className="select select-bordered w-full max-w-xs"
              value={language?.name || ''}
              aria-label="Select language"
              onChange={(e) => {
                const selectedLanguage = languages.find(
                  (language) => language.name === e.target.value
                );
                setLanguage(selectedLanguage || null);
              }}
            >
              <option value="" disabled>
                Select language
              </option>
              {languages.map((language) => (
                <option key={language.id} value={language.name}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>

          <div className='pt-2'>
            <div className="py-4 text-l font-medium">Environment</div>
            <select
              className="select select-bordered w-full max-w-xs"
              value={environment?.name || ''}
              aria-label="Select environment"
              onChange={(e) => {
                const selectedEnvironment = environments.find(
                  (environment) => environment.name === e.target.value
                );
                setEnvironment(selectedEnvironment || null);
              }}
            >
              <option value="" disabled>
                Select environment
              </option>
              {environments.map((environment) => (
                <option key={environment.id} value={environment.name}>
                  {environment.name}
                </option>
              ))}
            </select>
            <p className='w-1/3 py-2'>
              {environment ? environment.description : ''}
            </p>
          </div>

          <div className='pt-2'>
            <div className="py-4 text-l font-medium">Organization</div>
            <select
              className="select select-bordered w-full max-w-xs"
              value={organization?.name || ''}
              aria-label="Select organization"
              onChange={(e) => {
                const selectedOrganization = organizations.find(
                  (organization) => organization.name === e.target.value
                );
                setOrganization(selectedOrganization || null);
              }}
            >
              <option value="" disabled>
                Select organization
              </option>
              {organizations.map((organization) => (
                <option key={organization.id} value={organization.name}>
                  {organization.name}
                </option>
              ))}
            </select>
            <p className='w-1/3 py-2'>
              {organization ? organization.description : ''}
            </p>
          </div>

          <div className='pt-2'>
            <div className="py-4 text-l font-medium">Upbringing</div>
            <select
              className="select select-bordered w-full max-w-xs"
              value={upbringing?.name || ''}
              aria-label="Select upbringing"
              onChange={(e) => {
                const selectedUpbringing = upbringings.find(
                  (upbringing) => upbringing.name === e.target.value
                );
                setUpbringing(selectedUpbringing || null);
              }}
            >
              <option value="" disabled>
                Select upbringing
              </option>
              {upbringings.map((upbringing) => (
                <option key={upbringing.id} value={upbringing.name}>
                  {upbringing.name}
                </option>
              ))}
            </select>
            <p className='w-1/3 py-2'>
              {upbringing ? upbringing.description : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}