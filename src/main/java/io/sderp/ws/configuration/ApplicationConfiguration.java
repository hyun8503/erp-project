package io.sderp.ws.configuration;

import io.sderp.ws.configuration.support.TomcatProperties;
import io.sderp.ws.util.SystemEnvUtil;
import org.apache.catalina.connector.Connector;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.aop.interceptor.SimpleAsyncUncaughtExceptionHandler;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class ApplicationConfiguration implements AsyncConfigurer {
    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(200);
        executor.setQueueCapacity(20);
        executor.initialize();

        return executor;
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return new SimpleAsyncUncaughtExceptionHandler();
    }

    // Tomcat configuration
    @Bean
    public TomcatServletWebServerFactory servletContainer(TomcatProperties tomcatProperties) {
        return new TomcatServletWebServerFactory() {
            @Override
            protected void customizeConnector(Connector connector) {
                super.customizeConnector(connector);

                connector.setProperty("maxThreads", 			tomcatProperties.getMaxThreads());
                connector.setProperty("minSpareThreads", 		tomcatProperties.getMinSpareThreads());
                connector.setProperty("maxConnections",		    tomcatProperties.getMaxConnections());
                connector.setProperty("connectionLinger", 	    tomcatProperties.getConnectionLingers());
                connector.setProperty("connectionTimeout", 	    tomcatProperties.getConnectionTimeout());
                connector.setProperty("keepAliveTimeout", 	    tomcatProperties.getKeepAliveTimeout());
                connector.setProperty("maxKeepAliveRequests",   tomcatProperties.getMaxKeepAliveRequests());
                connector.setProperty("server", 				tomcatProperties.getServerInfo());
            }
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public SystemEnvUtil systemEnvUtil() {
        return new SystemEnvUtil();
    }
}
