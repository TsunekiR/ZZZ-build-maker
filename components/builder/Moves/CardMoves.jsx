import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import BuilderTable from '../BuilderTable';
import LevelSelectSlider from "@/components/builder/Moves/LevelSelectSlider"

function groupByFamily(selectedCharMove) {
    let groupedMoves = {};
    for (let index=0; index < selectedCharMove.length; index++) {
        let family = selectedCharMove[index].family;
        if(!groupedMoves[family]) {
            groupedMoves[family] = [];
        }
        groupedMoves[family].push({label: selectedCharMove[index].name + " Dmg", value: selectedCharMove[index].dmgValue});
        groupedMoves[family].push({label: selectedCharMove[index].name + " Daze", value: selectedCharMove[index].dazeValue});
        groupedMoves[family].push({label: selectedCharMove[index].name + " Anomaly Buildup", value: selectedCharMove[index].anomBuildup});
    }
    return groupedMoves;
}

const renderSlider = (skill) => {
    return(
        <LevelSelectSlider skill={skill}/>
    )
}

const CardMoves = (props) => {
    const { selectedCharMove, title } = props;
    
    let groupedMoves = groupByFamily(selectedCharMove)

    return (
        <Card>
            <CardHeader extracomponents={renderSlider("Basic Attack")}>
                {title}
            </CardHeader>
            <CardContent>
                {Object.keys(groupedMoves).map((family) => (
                    <div key={family} className="flex flex-col justify-between md:flex-row">
                        <BuilderTable title={family} data={groupedMoves[family]} rowsPerLine={3} />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default CardMoves;