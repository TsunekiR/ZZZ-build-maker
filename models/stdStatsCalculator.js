function coreSkillStat(buffs,coreSkillLevel){
    let addedValue = 0;
    for(let index = 0; index < buffs.bonusValue.length; index++){
        if(coreSkillLevel >= buffs.bonusCondition[index]){
            addedValue = buffs.bonusValue[index];
        }
    }
    return addedValue;
}

export function stdStatsCalculator (char, coreSkillLevel) {
    let stdStats = char.charBaseStats;

    for (let stat in stdStats){
        let stdStatflat = 0;
        let stdStatPercent = 0;
        for (let index = 0; index < char.charSelfBuffs.stdStats.length; index++) {
            if (char.charSelfBuffs.stdStats[index].id === stat) {
                for (let j = 0; j < char.charSelfBuffs.stdStats[index].buffs.length; j++) {
                    let value = 0;
                    if(char.charSelfBuffs.stdStats[index].buffs[j].origin[0] === 'core'){
                        value = coreSkillStat(char.charSelfBuffs.stdStats[index].buffs[j],coreSkillLevel)
                    }
                    if(char.charSelfBuffs.stdStats[index].buffs[j].type == "flat"){
                        stdStatflat += value;
                    } else {
                        stdStatPercent += value;
                    }
                }
            }
        }
        stdStats[stat] = (stdStats[stat] + stdStatflat)*(1+stdStatPercent/100)
    }

    return(stdStats)
}