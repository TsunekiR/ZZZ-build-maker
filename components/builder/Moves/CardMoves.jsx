import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import BuilderTable from '../BuilderTable';

function groupByFamily(selectedCharMove) {
    let groupedMoves = {};
    for (let index=0; index < selectedCharMove.length; index++) {
        let family = selectedCharMove[index].family;
        if(!groupedMoves[family]) {
            groupedMoves[family] = [];
        }
        groupedMoves[family].push(selectedCharMove[index]);
    }
    return groupedMoves;
}

const CardMoves = (props) => {
    const { selectedCharMove, title} = props;
    
    let groupedMoves = groupByFamily(selectedCharMove)

    // TODO: ADD DAZE AND ANOM VALUES
    for (let family in groupedMoves){
        groupedMoves[family] = groupedMoves[family].map((move) => ({label: move.name, value: move.dmgValue}));
    }

    return (
        <Card>
            <CardHeader>
                {title}
            </CardHeader>
            <CardContent>
                {Object.keys(groupedMoves).map((family) => (
                    <div key={family} className="flex flex-col justify-between md:flex-row">
                        <BuilderTable title={family} data={groupedMoves[family]} />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default CardMoves;