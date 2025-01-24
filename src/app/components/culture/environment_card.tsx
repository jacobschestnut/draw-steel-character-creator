type Environment = {
    id: number;
    name: string;
    description: string;
    quickBuildSkill: number;
};

type EnvironmentCardProps = {
    selectedEnvironment: Environment | null;
    env: Environment;
    setEnvironment: (environment: Environment) => void;
};

const EnvironmentCard = ({
    selectedEnvironment,
    env,
    setEnvironment,
}: EnvironmentCardProps) => {
    return (
        <div
            className={`card cursor-pointer ${
                selectedEnvironment?.id === env.id ? "bg-accent text-white" : "bg-slate-500 text-primary-content"
            }`}
            onClick={() => setEnvironment(env)}
        >
            <div className="card-body">
                <div className="card-title">{env.name}</div>
                <div className="text-sm">{env.description}</div>
            </div>
        </div>
    );
};

export default EnvironmentCard;
