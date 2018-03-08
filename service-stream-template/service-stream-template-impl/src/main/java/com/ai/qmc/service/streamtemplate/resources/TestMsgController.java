package com.ai.qmc.service.streamtemplate.resources;

import com.ai.qmc.service.streamtemplate.service.KafkaSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @ProjectName: springcloud
 * @Package: com.ai.qmc.service.streamtemplate.resources
 * @ClassName: ${TYPE_NAME}
 * @Description:
 * @Author: Renzq
 * @CreateDate: 2018/3/3 22:53
 * @UpdateUser: Renzq
 * @UpdateDate: 2018/3/3 22:53
 * @UpdateRemark:
 * @Version: 1.0
 * Copyright: Copyright (c) 2018
 **/
@RestController
public class TestMsgController {

    @Autowired
    KafkaSender kafkaSender;

    @GetMapping("/send")
    public String send(String message){
        kafkaSender.sendMsg(message);
        return "ok";
    }
}
