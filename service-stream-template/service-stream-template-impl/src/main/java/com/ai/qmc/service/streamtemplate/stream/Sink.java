package com.ai.qmc.service.streamtemplate.stream;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;

/**
 * @ProjectName: springcloud
 * @Package: com.ai.qmc.stream
 * @ClassName: ${TYPE_NAME}
 * @Description:
 * @Author: Renzq
 * @CreateDate: 2018/3/2 17:07
 * @UpdateUser: Renzq
 * @UpdateDate: 2018/3/2 17:07
 * @UpdateRemark:
 * @Version: 1.0
 * Copyright: Copyright (c) 2018
 **/
public interface Sink {
    String INPUT = "destineationa";

    @Input(Sink.INPUT)
    SubscribableChannel receiveMessage();
}
