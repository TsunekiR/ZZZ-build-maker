function baseMoveValueCalc (moveId, char, skillLevel) {
    let baseMoveValues = {}
    let move = char.moveValues?.find((move) => move.id === moveId);
    baseMoveValues["dmgValue"] = move.dmgValues[0] + (move.dmgValues[1]*skillLevel)
    baseMoveValues["dazeValue"] = move.dazeValues[0] + (move.dazeValues[1]*skillLevel)
    baseMoveValues["anomBuildup"] = move.anomBuildupValues[0]

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

function basicAttackCalc (char, coreSkillLevel, mindscapeLevel, skillLevel){
    let basicAtk = [];
    for (let index = 0; index < char.charInfo.moveList.basicAttack.length; index++) {
        basicAtk[index] = {
            "id" : index+1,
            "dmgValue" : baseMoveValueCalc(index+1, char, skillLevel)["dmgValue"] * (1 + additionalDmgCalc(index+1,char,coreSkillLevel,mindscapeLevel) + additionalElementalDmgCalc(index+1,char,coreSkillLevel,mindscapeLevel))
        }
    }
    return basicAtk

}

export function moveValueCalc (char, coreSkillLevel, mindscapeLevel,skillLevel){
    let moveValues = {}
    moveValues["basicAttack"] = basicAttackCalc(char, coreSkillLevel, mindscapeLevel, skillLevel)

    return moveValues
}