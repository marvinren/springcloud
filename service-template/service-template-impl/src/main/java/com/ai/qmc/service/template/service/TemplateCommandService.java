package com.ai.qmc.service.template.service;

import com.ai.qmc.service.template.entity.TemplateCommand;
import com.ai.qmc.service.template.repository.TemplateCommandRepository;
import com.ai.qmc.service.template.service.dto.TemplateCommandDTO;
import com.ai.qmc.service.template.service.mapper.TemplateCommandMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TemplateCommandService {

    @Autowired
    TemplateCommandMapper templateCommandMapper;

    @Autowired
    TemplateCommandRepository templateCommandRepository;

    public TemplateCommandDTO getTemplateFirstCommand(){

        List<TemplateCommand> all = templateCommandRepository.findAll();
        if(all.size() > 0 ){
            return templateCommandMapper.toDTO(all.get(1));
        }else{
            return templateCommandMapper.toDTO(new TemplateCommand());
        }
    }
}
