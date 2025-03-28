import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import BuilderTable from '../BuilderTable';

const CardStats = (props) => {
    const { selectedCharStdStats } = props;

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
        { label: "HP", value: 100 },
        { label: "ATK", value: 100 },
        { label: "DEF", value: 100 },
        { label: "Impact", value: 100 },
        { label: "CRIT Rate", value: 100 },
        { label: "CRIT DMG", value: 100 },
        { label: "Anomaly Mastery", value: 100 },
        { label: "Anomaly Proficiency", value: 100 },
        { label: "Pen Ratio", value: 100 },
        { label: "Energy Regen", value: 100 },
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