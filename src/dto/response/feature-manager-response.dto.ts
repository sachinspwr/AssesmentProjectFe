import { FeatureKey } from "@utils/enums/feature-key.enum";
import { TargetLayer } from "@utils/enums/target-layer.enum";

export class FeatureManagerResponseDto {
    public id?: string;
    public featureKey?: FeatureKey;
    public description?: string;
    public targetLayer?: TargetLayer;
    public isEnabled?: boolean;
}