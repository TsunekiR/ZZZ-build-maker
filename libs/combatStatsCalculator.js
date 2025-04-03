export function combatStatsCalculator (stats) {
    let stdStats = stats;
    let combatStats = stats;

    for (let stat in stdStats){
        combatStats[stat] = stdStats[stat];
    }
    console.log("combat: " + combatStats)
    return(combatStats)
}