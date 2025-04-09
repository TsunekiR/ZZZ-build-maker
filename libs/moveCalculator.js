function baseMoveValueCalc (moveData, skillLevel) {
    let baseMoveValues = {}
    baseMoveValues["dmgValue"] = (moveData.dmgValues[0] + (moveData.dmgValues[1]*(skillLevel-1)))/100
    baseMoveValues["dazeValue"] = (moveData.dazeValues[0] + (moveData.dazeValues[1]*(skillLevel-1)))/100
    baseMoveValues["anomBuildup"] = moveData.anomBuildupValues[0]
    return baseMoveValues;
}

function additionalDmgCalc(moveId,selectedChar,coreSkillLevel,mindscapeLevel) {
    let additionalDmg = 0;
    let buffList = selectedChar.charSelfBuffs.moves?.find((move) => move.id === moveId);
  
    if (buffList) {
      for (let index = 0; index < buffList.buffs.length; index++) {
        if(buffList.buffs[index].type === "additionalDmg"){
            if(buffList.buffs[index].origin[0] === "core"){
                additionalDmg += buffList.buffs[index].value[coreSkillLevel]/100;
            } else if(buffList.buffs[index].origin[0] === "mindscape" && mindscapeLevel >= buffList.buffs[index].bonusCondition[0]){
                additionalDmg += buffList.buffs[index].bonusValue[0]/100;
            } else {
                additionalDmg += buffList.buffs[index].value[0]/100;
            }
        }
      }
    }
    buffList = selectedChar.charSelfBuffs.moves?.find((move) => move.id === 0);

    if (buffList) {
        for (let index = 0; index < buffList.buffs.length; index++) {
            if(buffList.buffs[index].type === "additionalDmg"){
                if(buffList.buffs[index].origin[0] === "core"){
                    additionalDmg += buffList.buffs[index].value[coreSkillLevel]/100;
                } else {
                    additionalDmg += buffList.buffs[index].value[0]/100;
                }
            }
        }
    }

    return(additionalDmg);
}

function additionalElementalDmgCalc(moveId,selectedChar,coreSkillLevel,mindscapeLevel, stats) {
    let additionalElementalDmg = 0;
    let buffList = selectedChar.charSelfBuffs.moves?.find((move) => move.id === moveId);

    let moveElement = selectedChar.moveValues[moveId-1].element
    moveElement = String(moveElement).charAt(0).toUpperCase() + String(moveElement).slice(1)
  
    if (buffList) {
      for (let index = 0; index < buffList.buffs.length; index++) {
        if(buffList.buffs[index].type === "additional" + moveElement + "Dmg"){
            if(buffList.buffs[index].origin[0] === "core"){
                additionalElementalDmg += buffList.buffs[index].value[coreSkillLevel]/100;
            } else if(buffList.buffs[index].origin[0] === "mindscape" && mindscapeLevel >= buffList.buffs[index].bonusCondition[0]){
                additionalElementalDmg += buffList.buffs[index].bonusValue[0]/100;
            } else {
                additionalElementalDmg += buffList.buffs[index].value[0]/100;
            }
        }
      }
    }

    buffList = selectedChar.charSelfBuffs.moves?.find((move) => move.id === 0);

    if (buffList) {
        for (let index = 0; index < buffList.buffs.length; index++) {
            if(buffList.buffs[index].type === "additional" + moveElement + "Dmg"){
                if(buffList.buffs[index].origin[0] === "core"){
                    additionalElementalDmg += buffList.buffs[index].value[coreSkillLevel]/100;
                }else if(buffList.buffs[index].origin[0] === "additionalAbility"){
                    if (buffList.buffs[index].scalingStat){ // Case Lighter
                        additionalElementalDmg += buffList.buffs[index].value/1 + Math.min(Math.max(((stats[buffList.buffs[index].scalingStat[0]] - 170) * 0.5),0),50)
                        if (mindscapeLevel >= buffList.buffs[index].bonusValue[0]){
                            additionalElementalDmg = additionalElementalDmg * 1.2
                        }
                    } else {
                        additionalElementalDmg += buffList.buffs[index].value/100;
                    }
                }else {
                    additionalElementalDmg += buffList.buffs[index].value[0]/100;
                }
                console.log(additionalElementalDmg)
            }
        }
    }

    return(additionalElementalDmg);
}

function basicAttackCalc (char, coreSkillLevel, mindscapeLevel, skillLevel, stats){
    let basicAtk = [];
    for (const moveId of char.charInfo.moveList.basicAttack) {
        let moveData = char.moveValues?.find((move) => move.id === moveId);
        let baseMoveValues = baseMoveValueCalc(moveData, skillLevel)
        basicAtk.push ({
            "name" : moveData.name,
            "family" : moveData.family,
            "id" : moveId,
            "dazeValue" : stats["impact"] * baseMoveValues["dazeValue"],
            "anomBuildup" : (stats["anomalyMastery"]/100) * baseMoveValues["anomBuildup"],
            "dmgValue" :  stats["atk"] * baseMoveValues["dmgValue"] * (1 + additionalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel) + additionalElementalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel,stats))
        })
    }
    return basicAtk
}

function dodgeCalc (char, coreSkillLevel, mindscapeLevel, skillLevel, stats){
    let dashAtk = [];
    for (const moveId of char.charInfo.moveList.dashAttack) {
        let moveData = char.moveValues?.find((move) => move.id === moveId);
        let baseMoveValues = baseMoveValueCalc(moveData, skillLevel)
        dashAtk.push ({
            "name" : moveData.name,
            "family" : moveData.family,
            "id" : moveId,
            "dazeValue" : stats["impact"] * baseMoveValues["dazeValue"],
            "anomBuildup" : (stats["anomalyMastery"]/100) * baseMoveValues["anomBuildup"],
            "dmgValue" :  stats["atk"] * baseMoveValues["dmgValue"] * (1 + additionalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel) + additionalElementalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel,stats))
        })
    }
    for (const moveId of char.charInfo.moveList.dodgeCounter) {
        let moveData = char.moveValues?.find((move) => move.id === moveId);
        let baseMoveValues = baseMoveValueCalc(moveData, skillLevel)
        dashAtk.push ({
            "name" : moveData.name,
            "family" : moveData.family,
            "id" : moveId,
            "dazeValue" : stats["impact"] * baseMoveValues["dazeValue"],
            "anomBuildup" : (stats["anomalyMastery"]/100) * baseMoveValues["anomBuildup"],
            "dmgValue" :  stats["atk"] * baseMoveValues["dmgValue"] * (1 + additionalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel) + additionalElementalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel,stats))
        })
    }
    return dashAtk
}

function assistCalc (char, coreSkillLevel, mindscapeLevel, skillLevel, stats){
    let assist = [];
    for (const moveId of char.charInfo.moveList.quickAssist) {
        let moveData = char.moveValues?.find((move) => move.id === moveId);
        let baseMoveValues = baseMoveValueCalc(moveData, skillLevel)
        assist.push ({
            "name" : moveData.name,
            "family" : moveData.family,
            "id" : moveId,
            "dazeValue" : stats["impact"] * baseMoveValues["dazeValue"],
            "anomBuildup" : (stats["anomalyMastery"]/100) * baseMoveValues["anomBuildup"],
            "dmgValue" :  stats["atk"] * baseMoveValues["dmgValue"] * (1 + additionalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel) + additionalElementalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel,stats))
        })
    }
    for (const moveId of char.charInfo.moveList.assistFollowup) {
        let moveData = char.moveValues?.find((move) => move.id === moveId);
        let baseMoveValues = baseMoveValueCalc(moveData, skillLevel)
        assist.push ({
            "name" : moveData.name,
            "family" : moveData.family,
            "id" : moveId,
            "dazeValue" : stats["impact"] * baseMoveValues["dazeValue"],
            "anomBuildup" : (stats["anomalyMastery"]/100) * baseMoveValues["anomBuildup"],
            "dmgValue" :  stats["atk"] * baseMoveValues["dmgValue"] * (1 + additionalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel) + additionalElementalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel,stats))
        })
    }
    return assist
}

function specialAttackCalc (char, coreSkillLevel, mindscapeLevel, skillLevel, stats){
    let specialAttack = [];
    for (const moveId of char.charInfo.moveList.specialAttack) {
        let moveData = char.moveValues?.find((move) => move.id === moveId);
        let baseMoveValues = baseMoveValueCalc(moveData, skillLevel)
        specialAttack.push ({
            "name" : moveData.name,
            "family" : moveData.family,
            "id" : moveId,
            "dazeValue" : stats["impact"] * baseMoveValues["dazeValue"],
            "anomBuildup" : (stats["anomalyMastery"]/100) * baseMoveValues["anomBuildup"],
            "dmgValue" :  stats["atk"] * baseMoveValues["dmgValue"] * (1 + additionalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel) + additionalElementalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel,stats))
        })
    }
    for (const moveId of char.charInfo.moveList.exSpecialAttack) {
        let moveData = char.moveValues?.find((move) => move.id === moveId);
        let baseMoveValues = baseMoveValueCalc(moveData, skillLevel)
        specialAttack.push ({
            "name" : moveData.name,
            "family" : moveData.family,
            "id" : moveId,
            "dazeValue" : stats["impact"] * baseMoveValues["dazeValue"],
            "anomBuildup" : (stats["anomalyMastery"]/100) * baseMoveValues["anomBuildup"],
            "dmgValue" :  stats["atk"] * baseMoveValues["dmgValue"] * (1 + additionalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel) + additionalElementalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel,stats))
        })
    }
    return specialAttack
}

function chainAttackCalc (char, coreSkillLevel, mindscapeLevel, skillLevel, stats){
    let chainAttack = [];
    for (const moveId of char.charInfo.moveList.chainAttack) {
        let moveData = char.moveValues?.find((move) => move.id === moveId);
        let baseMoveValues = baseMoveValueCalc(moveData, skillLevel)
        chainAttack.push ({
            "name" : moveData.name,
            "family" : moveData.family,
            "id" : moveId,
            "dazeValue" : stats["impact"] * baseMoveValues["dazeValue"],
            "anomBuildup" : (stats["anomalyMastery"]/100) * baseMoveValues["anomBuildup"],
            "dmgValue" :  stats["atk"] * baseMoveValues["dmgValue"] * (1 + additionalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel) + additionalElementalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel,stats))
        })
    }
    for (const moveId of char.charInfo.moveList.ultimate) {
        let moveData = char.moveValues?.find((move) => move.id === moveId);
        let baseMoveValues = baseMoveValueCalc(moveData, skillLevel)
        chainAttack.push ({
            "name" : moveData.name,
            "family" : moveData.family,
            "id" : moveId,
            "dazeValue" : stats["impact"] * baseMoveValues["dazeValue"],
            "anomBuildup" : (stats["anomalyMastery"]/100) * baseMoveValues["anomBuildup"],
            "dmgValue" :  stats["atk"] * baseMoveValues["dmgValue"] * (1 + additionalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel) + additionalElementalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel,stats))
        })
    }
    return chainAttack
}

export function moveValueCalc (char, charContext, stats){
    let moveValues = {}
    moveValues["basicAttack"] = basicAttackCalc(char, charContext.coreSkillLevel, charContext.mindscapeLevel, charContext.skillLevels["basicAttackLevel"], stats);
    moveValues["dodge"] = dodgeCalc(char, charContext.coreSkillLevel, charContext.mindscapeLevel, charContext.skillLevels["dodgeLevel"], stats);
    moveValues["assist"] = assistCalc(char, charContext.coreSkillLevel, charContext.mindscapeLevel, charContext.skillLevels["assistLevel"], stats)
    moveValues["specialAttack"] = specialAttackCalc(char, charContext.coreSkillLevel, charContext.mindscapeLevel, charContext.skillLevels["specialAttackLevel"], stats)
    moveValues["chainAttack"] = chainAttackCalc(char, charContext.coreSkillLevel, charContext.mindscapeLevel, charContext.skillLevels["chainAttackLevel"], stats)

    return moveValues
}