package com.ai.qmc.service.streamtemplate.service;

import com.ai.qmc.service.streamtemplate.stream.Sink;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;

/**
 * @ProjectName: springcloud
 * @Package: com.ai.qmc.service.streamtemplate.service
 * @ClassName: ${TYPE_NAME}
 * @Description:
 * @Author: Renzq
 * @CreateDate: 2018/3/3 22:55
 * @UpdateUser: Renzq
 * @UpdateDate: 2018/3/3 22:55
 * @UpdateRemark:
 * @Version: 1.0
 * Copyright: Copyright (c) 2018
 **/
@EnableBinding(Sink.class)
@Slf4j
public class KafkaReceiver {

    @StreamListener(Sink.INPUT)
    private void receive(String message){
        log.info("receive: {}", message);
    }

}
