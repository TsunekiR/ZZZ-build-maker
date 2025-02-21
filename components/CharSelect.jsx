
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
    // const specificChar = chars.filter(char => char.charName == "Harumasa")

    return (
        <select name="charSelect" id="charSelect">
            <option value="">--Please select a character--</option>
        {chars.map((char) => (
            <option value={char.charName}>{char.charName}
                {/* <h1>Name: {char.charName}</h1>
                <p>Type: {char.charType}</p>
                <p>Base ATK: {char.charBaseAttack}</p> */}
            </option>
        ))}
        </select>
    )
}