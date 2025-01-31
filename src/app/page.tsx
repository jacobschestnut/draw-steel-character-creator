'use client';

import { useState, useEffect } from 'react';
import HumanPage from './components/ancestry_forms/human';
import EnvironmentCard from './components/culture/environment_card';
import OrganizationCard from './components/culture/organization_card';
import { Ancestry } from '@/types/Ancestry';
import { Trait } from '@/types/Trait';
import DevilPage from './components/ancestry_forms/devil';
import { Skill } from '@/types/Skill';

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
  quickBuildSkill: number;
};

type Upbringing = {
  id: number;
  name: string;
  description: string;
  quickBuildSkill: string;
};

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('ancestry'); 

  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  
  const [ancestryList, setAncestryList] = useState<Ancestry[]>([]);

  useEffect(() => {
    const fetchAncestries = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/ancestries/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setAncestryList(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAncestries();
  }, []);
  
  const [selectedAncestry, setSelectedAncestry] = useState<Ancestry | null>();

  useEffect(() => {
    const fetchTraits = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/ancestries/${selectedAncestry?.ancestry_id}/traits/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setTraits(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTraits();
  }, [selectedAncestry]);

  const [traits, setTraits] = useState<Trait[]>([]);

  const [selectedAncestryTraits, setSelectedAncestryTraits] = useState<Trait[]>([]);

  const [selectedAncestryTraitsValue, setSelectedAncestryTraitsValue] = useState<number>(0);

  const handleAncestryChange = (ancestry: Ancestry) => {
    setSelectedAncestry(ancestry);
  };  

  const handleTraitChange = (trait: Trait) => {
    setSelectedAncestryTraits((prevTraits) => {
      const isTraitSelected = prevTraits.some((t) => t.trait_id === trait.trait_id);
  
      let newSelectedAncestryTraits;
      let newSelectedAncestryTraitsValue;
  
      if (isTraitSelected) {
        newSelectedAncestryTraits = prevTraits.filter((t) => t.trait_id !== trait.trait_id);
        newSelectedAncestryTraitsValue = newSelectedAncestryTraits.reduce(
          (total, selectedTrait) => total + selectedTrait.cost,
          0
        );
      } else {
        if (selectedAncestryTraitsValue + trait.cost > 3) {
          return prevTraits;
        }
  
        newSelectedAncestryTraits = [...prevTraits, trait];
        newSelectedAncestryTraitsValue = newSelectedAncestryTraits.reduce(
          (total, selectedTrait) => total + selectedTrait.cost,
          0
        );
      }
  
      setSelectedAncestryTraitsValue(newSelectedAncestryTraitsValue); // Update the selectedAncestryTraitsValue
  
      return newSelectedAncestryTraits;
    });
  };

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

  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);

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

  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
  };

  const handleAncestryTabSkillSelection = (skills: Skill[]) => {
    const updatedSkills = [...selectedSkills];
    for (const newSkill of skills) {
        let isSkillAlreadySelected = false;

        for (const selectedSkill of updatedSkills) {
            if (selectedSkill.skill_id === newSkill.skill_id) {
                isSkillAlreadySelected = true;
                break;
            }
        }

        if (!isSkillAlreadySelected) {
            updatedSkills.push(newSkill);
        }
    }

    setSelectedSkills(updatedSkills);
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Outer Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 w-full h-screen"> */}
      <div className='w-full h-full'>
        {/* Left Column: Tabs */}
        <div className="flex flex-col gap-6 w-full h-full overflow-y-auto p-4 bg-base-200">
          {/* Tabs Navigation */}
          <div role="tablist" className="tabs tabs-bordered mb-4">
            <button
              role="tab"
              className={`tab ${selectedTab === 'ancestry' ? 'tab-active' : ''}`}
              onClick={() => handleTabChange('ancestry')}
            >
              Ancestry
            </button>
            <button
              role="tab"
              className={`tab ${selectedTab === 'culture' ? 'tab-active' : ''}`}
              onClick={() => handleTabChange('culture')}
            >
              Culture
            </button>
          </div>
  
          {/* Tab Content */}
          <div>
            {/* Ancestry Tab */}
            {selectedTab === 'ancestry' && (
              <div role="tabpanel" className="p-4 bg-slate-800 rounded-md shadow">
                <div className="flex gap-3 pt-4 flex-wrap">
                  {ancestryList.map((ancestry) => {
                    const key = ancestry.ancestry_id ?? ancestry.name;
                    return (
                      <button
                        key={key}
                        className={`btn ${selectedAncestry?.ancestry_id === ancestry.ancestry_id ? 'btn-neutral' : ''}`}
                        onClick={() => handleAncestryChange(ancestry)}
                      >
                        {ancestry.name}
                      </button>
                    );
                  })}
                </div>
                {selectedAncestry?.ancestry_id === 2 && (
                  <div className="mt-4">
                    <HumanPage
                      ancestry={selectedAncestry}
                      traits={traits}
                      handleTraitChange={handleTraitChange}
                      selectedAncestryTraits={selectedAncestryTraits}
                      selectedAncestryTraitsValue={selectedAncestryTraitsValue}
                    />
                  </div>
                )}
                {selectedAncestry?.ancestry_id === 1 && (
                  <div className="mt-4">
                    <DevilPage
                      ancestry={selectedAncestry}
                      traits={traits}
                      handleTraitChange={handleTraitChange}
                      selectedAncestryTraits={selectedAncestryTraits}
                      selectedAncestryTraitsValue={selectedAncestryTraitsValue}
                      handleSkillSelection={handleAncestryTabSkillSelection}
                    />
                  </div>
                )}
              </div>
            )}
  
            {/* Culture Tab */}
            {selectedTab === 'culture' && (
              <div role="tabpanel" className="p-4 bg-slate-800 rounded-md shadow">
                {/* Language Section */}
                <div className="text-lg font-bold pb-4">LANGUAGE</div>
                <select
                  className="select select-bordered w-full mb-4"
                  value={language?.name || ''}
                  onChange={(e) => {
                    const selectedLanguage = languages.find(
                      (lang) => lang.name === e.target.value
                    );
                    setLanguage(selectedLanguage || null);
                  }}
                >
                  <option value="" disabled>
                    Select language
                  </option>
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.name}>
                      {lang.name}
                    </option>
                  ))}
                </select>
  
                {/* Environment Section */}
                <div className='mb-4'>
                  <div className='text-lg font-bold pb-4'>ENVIRONMENT</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {environments.map((env) => (
                          <EnvironmentCard
                              key={env.id}
                              selectedEnvironment={environment}
                              env={env}
                              setEnvironment={setEnvironment}
                          />
                      ))}
                  </div>
                </div>
  
                {/* Organization Section */}
                <div className='mb-4'>
                  <div className='text-lg font-bold pb-4'>ORGANIZATION</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {organizations.map((org) => (
                          <OrganizationCard
                              key={org.id}
                              selectedOrganization={selectedOrganization}
                              org={org}
                              setSelectedOrganization={setSelectedOrganization}
                          />
                      ))}
                  </div>
                </div>
  
                {/* Upbringing Section */}
                {/* <div className="mb-4">
                  <h3 className="text-lg font-semibold">Upbringing</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <select
                      className="select select-bordered w-full"
                      value={upbringing?.name || ''}
                      onChange={(e) => {
                        const selectedUpbringing = upbringings.find(
                          (up) => up.name === e.target.value
                        );
                        setUpbringing(selectedUpbringing || null);
                      }}
                    >
                      <option value="" disabled>
                        Select upbringing
                      </option>
                      {upbringings.map((up) => (
                        <option key={up.id} value={up.name}>
                          {up.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-sm">
                      {upbringing ? upbringing.description : ''}
                    </p>
                  </div>
                </div> */}
              </div>
            )}
          </div>
        </div>
  
        {/* Right Column */}
        {/* <div className="flex flex-col w-full h-full p-4 bg-base-200">
          <div className="card bg-slate-500 shadow-md p-6 my-2">
            <div>
                <strong>Ancestry</strong> <span>{selectedAncestry}</span>
            </div>
            <div className='flex flex-row'>
                <strong>Traits</strong>
                &nbsp;
                <span className="flex">
                  {selectedAncestryTraits.map((trait) => trait.name).join(', ')}
                </span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
  
