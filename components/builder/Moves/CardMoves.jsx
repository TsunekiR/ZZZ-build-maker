import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import BuilderTable from '../BuilderTable';

const CardMoves = (props) => {
    const { selectedCharMove, title} = props;
    
    console.log(selectedCharMove)

    const moveValues = selectedCharMove.map((move, index) => ({label: move.id, value: move.dmgValue}));

    return (
        <Card>
            <CardHeader>
                {title}
            </CardHeader>
            <CardContent>
                <div className="flex flex-col justify-between md:flex-row">
                    <BuilderTable title="" data={moveValues} />
                </div>
            </CardContent>
        </Card>
    );
};

export default CardMoves;