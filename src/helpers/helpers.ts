export const memberRandomizer = (members: { member: string }[]) => {
    return members[Math.floor(Math.random()*members.length)].member;
}