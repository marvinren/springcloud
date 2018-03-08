package com.ai.qmc.service.streamtemplate.stream;

import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;

/**
 * @ProjectName: springcloud
 * @Package: com.ai.qmc.service.streamtemplate.stream
 * @ClassName: ${TYPE_NAME}
 * @Description:
 * @Author: Renzq
 * @CreateDate: 2018/3/2 21:35
 * @UpdateUser: Renzq
 * @UpdateDate: 2018/3/2 21:35
 * @UpdateRemark:
 * @Version: 1.0
 * Copyright: Copyright (c) 2018
 **/
public interface Source {
    String OUTPUT = "sourcea";

    @Output(Source.OUTPUT)
    MessageChannel writeMessage();
}
