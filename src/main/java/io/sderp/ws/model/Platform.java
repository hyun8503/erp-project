package io.sderp.ws.model;

import io.sderp.ws.model.support.PlatformType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Platform {
    private String platformId;
    private String platformName;
    private PlatformType typeCode;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
}
