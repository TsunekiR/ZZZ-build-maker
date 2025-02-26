import mongoose, {Schema} from "mongoose";

const buffSchema = new Schema(
    {
        type: String,
        value: [Number],
        origin: [String],
        bonusCondition: [Number],
        bonusValue: [Number]
    }
)

const moveSchema = new Schema(
    {
        id: Number,
        element: String,
        dmgValues : [Number],
        dazeValues : [Number],
        anomBuildupValues: [Number]
    }
)

const buffedMoveSchema = new Schema(
    {
        id: Number,
        buffs: [buffSchema]
    }
)

const buffedStatSchema = new Schema(
  {
      id: String,
      buffs: [buffSchema]
  }
)

const charSchema = new Schema(
    {
        charInfo: {
            charname: String,
            charType: String,
            charAttribute: String,
            charFaction: String,
            moveList: {
                basicAttack: [Number],
                dashAttack: [Number],
                dodgeCounter: [Number],
                specialAttack: [Number],
                exSpecialAttack: [Number],
                chainAttack: [Number],
                ultimate: [Number],
                quickAssist: [Number],
                defEvaAssist: [Number],
                assistFollowup: [Number],
            }
        },
        additionalAbilityConditions: [String],
        charBaseStats: {
            hp: Number,
            atk: Number,
            def: Number,
            impact: Number,
            critRate: Number,
            critDmg: Number,
            anomalyMastery: Number,
            anomalyProficiency: Number,
            penRatio: Number,
            energyRegen: Number
        },
            charSelfBuffs: {
            stdStats: [buffedStatSchema],
            combatStats: [buffedStatSchema],
            moves: [buffedMoveSchema]
        },
        moveValues: [moveSchema]
    }
);

const char =  mongoose.models.char || mongoose.model("char", charSchema);

export default char;