type Organization = {
    id: number;
    name: string;
    description: string;
    quickBuildSkill: number;
};

type OrganizationCardProps = {
    selectedOrganization: Organization | null;
    setSelectedOrganization: (organization: Organization) => void;
    org: Organization;
};

const OrganizationCard = ({
    selectedOrganization,
    setSelectedOrganization,
    org
}: OrganizationCardProps) => {
    return (
        <div
            className={`card cursor-pointer ${
                selectedOrganization?.id === org.id ? "bg-accent text-white" : "bg-slate-500 text-primary-content"
            }`}
            onClick={() => setSelectedOrganization(org)}
        >
            <div className="card-body">
                <div className="card-title">{org.name}</div>
                <div className="text-sm">{org.description}</div>
            </div>
        </div>
    );
};

export default OrganizationCard;
