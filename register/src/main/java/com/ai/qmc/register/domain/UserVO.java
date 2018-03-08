package com.ai.qmc.register.domain;

/**
 * @ProjectName: springcloud
 * @Package: com.ai.qmc.register.domain
 * @ClassName: ${TYPE_NAME}
 * @Description:
 * @Author: Renzq
 * @CreateDate: 2018/3/2 15:02
 * @UpdateUser: Renzq
 * @UpdateDate: 2018/3/2 15:02
 * @UpdateRemark:
 * @Version: 1.0
 * Copyright: Copyright (c) 2018
 **/
public class UserVO {
    String id;
    String username;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
