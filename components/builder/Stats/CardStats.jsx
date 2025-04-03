import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import BuilderTable from '../BuilderTable';

const CardStats = (props) => {
    const { selectedCharStdStats, selectedCharCombatStats } = props;

    const statsDataBase = [
        { label: "HP", value: selectedCharStdStats["hp"] },
        { label: "ATK", value: selectedCharStdStats["atk"] },
        { label: "DEF", value: selectedCharStdStats["def"] },
        { label: "Impact", value: selectedCharStdStats["impact"] },
        { label: "CRIT Rate", value: selectedCharStdStats["critRate"] },
        { label: "CRIT DMG", value: selectedCharStdStats["critDmg"] },
        { label: "Anomaly Mastery", value: selectedCharStdStats["anomalyMastery"] },
        { label: "Anomaly Proficiency", value: selectedCharStdStats["anomalyProficiency"] },
        { label: "Pen Ratio", value: selectedCharStdStats["penRatio"] },
        { label: "Energy Regen", value: selectedCharStdStats["energyRegen"] },
    ];

    const statsDataCombat = [
        { label: "HP", value: selectedCharCombatStats["hp"] },
        { label: "ATK", value: selectedCharCombatStats["atk"] },
        { label: "DEF", value: selectedCharCombatStats["def"] },
        { label: "Impact", value: selectedCharCombatStats["impact"] },
        { label: "CRIT Rate", value: selectedCharCombatStats["critRate"] },
        { label: "CRIT DMG", value: selectedCharCombatStats["critDmg"] },
        { label: "Anomaly Mastery", value: selectedCharCombatStats["anomalyMastery"] },
        { label: "Anomaly Proficiency", value: selectedCharCombatStats["anomalyProficiency"] },
        { label: "Pen Ratio", value: selectedCharCombatStats["penRatio"] },
        { label: "Energy Regen", value: selectedCharCombatStats["energyRegen"] },
    ];

    return (
        <Card>
            <CardHeader>
                Stats
            </CardHeader>
            <CardContent>
                <div className="flex flex-col justify-between md:flex-row">
                    <BuilderTable title="Base Stats" data={statsDataBase} rowsPerLine={2}/>
                    <BuilderTable title="Combat Stats" data={statsDataCombat} rowsPerLine={2}/>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardStats;