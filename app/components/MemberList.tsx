import MemberListItem from "./MemberListItem";

// The default role is set to '<Team name> Officer', so don't need to set it in members.js

export default function MemberList ({ teams }) {
  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-20">
      {teams.map(team => (
        <div className="flex flex-col gap-5">
          <h5 className="text-xl text-text-secondary">{team.name}</h5>
          <div className="grid grid-cols-2 gap-2">
            {team.members.map(profile => <MemberListItem role={`${team.name} Officer`} {...profile} />)}
          </div>
        </div>
      ))}
    </div>
  )
}