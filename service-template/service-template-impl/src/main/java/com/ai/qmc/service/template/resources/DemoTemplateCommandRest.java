package com.ai.qmc.service.template.resources;

import com.ai.qmc.service.template.service.TemplateCommandService;
import com.ai.qmc.service.template.service.dto.TemplateCommandDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoTemplateCommandRest {

    @Autowired
    TemplateCommandService templateCommandService;

    @GetMapping("/command")
    public TemplateCommandDTO getCommand(){
        return templateCommandService.getTemplateFirstCommand();
    }
}
