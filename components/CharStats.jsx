
const getChars = async() => {
    try {
        const res = await fetch('http://localhost:3000/api/char');
        if(!res.ok) {
            throw new Error("Failed to fetch topics");
        }

        return res.json()
    } catch (error) {
        console.log("Error retrieving characters' info.", error);
    }
}

export default async function CharStats() {

    const {chars} = await getChars();

    return (
        <>
        {chars.map((char) => (
            <div>
                <h1>Name: {char.charName}</h1>
                <p>Type: {char.charType}</p>
                <p>Base ATK: {char.charBaseAttack}</p>
            </div>
        ))}
        </>
    )
}