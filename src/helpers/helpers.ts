export const memberRandomizer = (members: string[]) => {
    return members[Math.floor(Math.random()*members.length)];
}