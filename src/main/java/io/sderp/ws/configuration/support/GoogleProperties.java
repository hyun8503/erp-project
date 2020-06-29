package io.sderp.ws.configuration.support;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "sderp.google")
@Data
public class GoogleProperties {
    private String tempDownloadPath;
    private String oauth2RedirectionUri;
}
