package com.ai.qmc.service.streamtemplate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * @ProjectName: springcloud
 * @Package: com.ai.qmc.service.streamtemplate
 * @ClassName: ${TYPE_NAME}
 * @Description:
 * @Author: Renzq
 * @CreateDate: 2018/3/2 17:18
 * @UpdateUser: Renzq
 * @UpdateDate: 2018/3/2 17:18
 * @UpdateRemark:
 * @Version: 1.0
 * Copyright: Copyright (c) 2018
 **/
@SpringBootApplication
@EnableDiscoveryClient
public class StreamTemplateServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(StreamTemplateServiceApplication.class, args);
    }
}
