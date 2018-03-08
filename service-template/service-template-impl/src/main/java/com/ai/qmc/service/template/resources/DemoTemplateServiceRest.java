package com.ai.qmc.service.template.resources;

import com.ai.qmc.service.template.dto.InfoEntityDTO;
import com.ai.qmc.service.template.service.IDemoTemplateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class DemoTemplateServiceRest implements IDemoTemplateService{

    @GetMapping("/hi")
    @Override
    public String sayHiFromClientOne(String name) {
        return "hello, " + name + "!";
    }

    @GetMapping("/info_entity")
    @Override
    public InfoEntityDTO fetchInfo() {
        try {
            Thread.sleep(2000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        InfoEntityDTO info = new InfoEntityDTO("Tempalte", "1.0");
        log.info(info.toString());
        return info;
    }
}
