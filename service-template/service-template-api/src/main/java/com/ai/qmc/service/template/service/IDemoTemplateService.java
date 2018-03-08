package com.ai.qmc.service.template.service;

import com.ai.qmc.service.template.dto.InfoEntityDTO;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "service-template")
public interface IDemoTemplateService {

    @RequestMapping(value = "/hi", method = RequestMethod.GET)
    String sayHiFromClientOne(@RequestParam(value = "name") String name);

    @RequestMapping(value = "/info_entity", method = RequestMethod.GET)
    InfoEntityDTO fetchInfo();
}
