package com.ai.qmc.register.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

/**
 * @ProjectName: springcloud
 * @Package: com.ai.qmc.register.security
 * @ClassName: ${TYPE_NAME}
 * @Description:
 * @Author: Renzq
 * @CreateDate: 2018/3/2 15:07
 * @UpdateUser: Renzq
 * @UpdateDate: 2018/3/2 15:07
 * @UpdateRemark:
 * @Version: 1.0
 * Copyright: Copyright (c) 2018
 **/
@Configuration
@ConfigurationProperties(prefix = "auth.resource.client")
public class ClientProperties {


    String client_id;
    String secret;
    int access_token_expire_seconds = 600;
    int refresh_token_expire_seconds = 12*60*60;
    String scope;

    public String getClient_id() {
        return client_id;
    }

    public void setClient_id(String client_id) {
        this.client_id = client_id;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public int getAccess_token_expire_seconds() {
        return access_token_expire_seconds;
    }

    public void setAccess_token_expire_seconds(int access_token_expire_seconds) {
        this.access_token_expire_seconds = access_token_expire_seconds;
    }

    public int getRefresh_token_expire_seconds() {
        return refresh_token_expire_seconds;
    }

    public void setRefresh_token_expire_seconds(int refresh_token_expire_seconds) {
        this.refresh_token_expire_seconds = refresh_token_expire_seconds;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }
}
