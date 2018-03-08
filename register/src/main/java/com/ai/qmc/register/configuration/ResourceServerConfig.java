package com.ai.qmc.register.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

/**
 * @ProjectName: springcloud
 * @Package: com.ai.qmc.register.configuration
 * @ClassName: ${TYPE_NAME}
 * @Description:
 * @Author: Renzq
 * @CreateDate: 2018/2/28 17:39
 * @UpdateUser: Renzq
 * @UpdateDate: 2018/2/28 17:39
 * @UpdateRemark:
 * @Version: 1.0
 * Copyright: Copyright (c) 2018
 **/
@Configuration
@EnableResourceServer
public class ResourceServerConfig  extends ResourceServerConfigurerAdapter {
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().headers().frameOptions().disable();
        http.authorizeRequests().antMatchers("/registry/**").permitAll();
        http.authorizeRequests().antMatchers("/eureka/**", "/oauth/token").permitAll();

        http.authorizeRequests().antMatchers("/fetch_user", "/template/**").authenticated();
        http.authorizeRequests().antMatchers("/**").permitAll();
    }
}
