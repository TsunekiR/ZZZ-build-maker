function baseMoveValueCalc (moveData, char, skillLevel) {
    let baseMoveValues = {}
    baseMoveValues["dmgValue"] = moveData.dmgValues[0] + (moveData.dmgValues[1]*skillLevel)
    baseMoveValues["dazeValue"] = moveData.dazeValues[0] + (moveData.dazeValues[1]*skillLevel)
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

function additionalElementalDmgCalc(moveId,selectedChar,coreSkillLevel,mindscapeLevel) {
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
                } else {
                    additionalElementalDmg += buffList.buffs[index].value[0]/100;
                }
            }
        }
    }

    return(additionalElementalDmg);
}

// TODO: 
// ADD ATK TO CALC
// ADD DAZE AND ANOMALY BUILDUP

function basicAttackCalc (char, coreSkillLevel, mindscapeLevel, skillLevel){
    let basicAtk = [];
    for (const moveId of char.charInfo.moveList.basicAttack) {
        let moveData = char.moveValues?.find((move) => move.id === moveId);
        basicAtk.push ({
            "name" : moveData.name,
            "family" : moveData.family,
            "id" : moveId,
            "dmgValue" : baseMoveValueCalc(moveData, char, skillLevel)["dmgValue"] * (1 + additionalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel) + additionalElementalDmgCalc(moveId,char,coreSkillLevel,mindscapeLevel))
        })
    }
    return basicAtk

}

export function moveValueCalc (char, coreSkillLevel, mindscapeLevel,skillLevel){
    let moveValues = {}
    moveValues["basicAttack"] = basicAttackCalc(char, coreSkillLevel, mindscapeLevel, skillLevel)

    return moveValues
}