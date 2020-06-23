package io.sderp.ws.model.support;

public enum PlatformType {
    UNKNOWN, NONE, DIRECT, NON_DIRECT;

    public static PlatformType getInstance(String type) {
        PlatformType platformType = PlatformType.UNKNOWN;
        PlatformType[] values = PlatformType.values();
        for (PlatformType value : values) {
            if(type.equalsIgnoreCase(value.name())) {
                platformType = value;
                break;
            }
        }

        return platformType;
    }
}
