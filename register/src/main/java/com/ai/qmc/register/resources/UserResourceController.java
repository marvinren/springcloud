package com.ai.qmc.register.resources;

import com.ai.qmc.register.domain.UserVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @ProjectName: springcloud
 * @Package: com.ai.qmc.register.resources
 * @ClassName: ${TYPE_NAME}
 * @Description:
 * @Author: Renzq
 * @CreateDate: 2018/3/2 11:57
 * @UpdateUser: Renzq
 * @UpdateDate: 2018/3/2 11:57
 * @UpdateRemark:
 * @Version: 1.0
 * Copyright: Copyright (c) 2018
 **/
@RestController
public class UserResourceController {

    @PostMapping("/fetch_user")
    public UserVO getUser(){
        return new UserVO();
    }
}
