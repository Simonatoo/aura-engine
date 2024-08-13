import { Box, BoxConfig } from "./box";
import { Label, LabelConfig } from "./label";
import { Sprite, SpriteConfig } from "./sprite";

export class Nodes {
    box(config:BoxConfig): Box {
        return new Box(config);
    }
    label(config:LabelConfig): Label {
        return new Label(config);
    }
    sprite(config:SpriteConfig): Sprite {
        return new Sprite(config);
    }
}