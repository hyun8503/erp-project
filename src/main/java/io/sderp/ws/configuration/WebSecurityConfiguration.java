package io.sderp.ws.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.session.jdbc.config.annotation.web.http.EnableJdbcHttpSession;
import org.springframework.session.web.http.HeaderHttpSessionIdResolver;
import org.springframework.session.web.http.HttpSessionIdResolver;


@Configuration
@EnableWebSecurity
@EnableJdbcHttpSession
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
    private AuthenticationProvider authenticationProvider;

    @Autowired
    public WebSecurityConfiguration(AuthenticationProvider authenticationProvider) {
        this.authenticationProvider = authenticationProvider;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER)

                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // To Do : 빠른 시일에 설정해야 함.
                .antMatchers("/", "/home", "/management/**", "/report/**", "/oauth2", "/api/v1/authentications/signin", "/api/v1/authentications/signUp",
                        "/api/v1/authentications/signout", "/api/v1/authentications/signcheck").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/api/v1/gapi/**", "/api/v1/permission/**", "/api/v1/platforms/**", "/api/v1/platforms-my",
                        "/api/v1/platform/**", "/api/v1/report/**", "/api/v1/reports/**", "/api/v1/role-with-permission",
                        "/api/v1/role/**", "/api/v1/roles/**", "/api/v1/user/**", "/api/v1/users/**")
                .authenticated()
                .antMatchers("/api/v1/**").authenticated();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authenticationProvider);
    }

    @Bean
    public HttpSessionIdResolver httpSessionIdResolver() {
        return new HeaderHttpSessionIdResolver("X-Auth-Token");
    }
}

