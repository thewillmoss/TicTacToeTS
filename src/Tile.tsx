import * as React from 'react';
import './Tile.css';

type TileProps = {
    label: string
    highlight: boolean
}

export const Tile = ({ label,highlight }: TileProps) =>
        <div className={!highlight ? "tile_wrapper" : "tile_wrapper highlight"}>
            <div className="tile_label noselect">
                {label}
            </div>
        </div>