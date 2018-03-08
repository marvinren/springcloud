package com.ai.qmc.service.streamtemplate.service;

import com.ai.qmc.service.streamtemplate.stream.Source;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.messaging.support.MessageBuilder;

/**
 * @ProjectName: springcloud
 * @Package: com.ai.qmc.service.streamtemplate.service
 * @ClassName: ${TYPE_NAME}
 * @Description:
 * @Author: Renzq
 * @CreateDate: 2018/3/3 22:50
 * @UpdateUser: Renzq
 * @UpdateDate: 2018/3/3 22:50
 * @UpdateRemark:
 * @Version: 1.0
 * Copyright: Copyright (c) 2018
 **/
@EnableBinding(Source.class)
@Slf4j
public class KafkaSender {

    @Autowired
    private Source source;

    public void sendMsg(String message){
        source.writeMessage().send(MessageBuilder.withPayload("message:" + message).build());
    }
}
