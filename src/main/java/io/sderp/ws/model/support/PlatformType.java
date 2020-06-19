package io.sderp.ws.model.support;

public enum PlatformType {
    UnKnown, None, Direct, NonDirect;

    public static PlatformType getInstance(String type) {
        PlatformType platformType = PlatformType.UnKnown;
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
