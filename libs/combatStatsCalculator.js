function coreSkillStat(buffs,coreSkillLevel){
    let addedValue = 0;
    for(let index = 0; index < buffs.bonusValue.length; index++){
        if(coreSkillLevel >= buffs.bonusCondition[index]){
            addedValue = buffs.bonusValue[index];
        }
    }
    return addedValue;
}

export function combatStatsCalculator (stats, char, charContext) {
    let combatStats = Object.assign({}, stats);

    for (let stat in combatStats){
        let combatStatflat = 0;
        let combatStatPercent = 0;
        for (let index = 0; index < char.charSelfBuffs.combatStats.length; index++) {
            if (char.charSelfBuffs.combatStats[index].id === stat) {
                for (let j = 0; j < char.charSelfBuffs.combatStats[index].buffs.length; j++) {
                    let value = 0;
                    if(char.charSelfBuffs.combatStats[index].buffs[j].origin[0] === 'core'){
                        value = coreSkillStat(char.charSelfBuffs.combatStats[index].buffs[j],charContext.coreSkillLevel)
                    }
                    if(char.charSelfBuffs.combatStats[index].buffs[j].type == "flat"){
                        combatStatflat += value;
                    } else {
                        combatStatPercent += value;
                    }
                }
            }
        }
        combatStats[stat] = (combatStats[stat] + combatStatflat)*(1+combatStatPercent/100)
    }

    return(combatStats)
}